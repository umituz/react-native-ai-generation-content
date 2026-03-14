/**
 * Photo Extraction Utilities
 * Shared photo extraction logic for wizard strategies
 *
 * Resize strategy:
 * - Small images (<768px):  scale UP to 768px minimum (good face preservation)
 * - Large images (>1536px): scale DOWN to 1536px maximum (reduces upload size ~10x)
 * - Normal images:          pass through unchanged
 *
 * IMPORTANT: 768px minimum ensures AI models have enough detail for face preservation
 */

import { readFileAsBase64 } from "@umituz/react-native-design-system/filesystem";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { Image } from "react-native";
import { PHOTO_KEY_PREFIX } from "../wizard-strategy.constants";


const MIN_IMAGE_DIMENSION = 768;  // Minimum for good face preservation
const MAX_IMAGE_DIMENSION = 1536;

/**
 * Get image dimensions from URI
 */
function getImageSize(uri: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    Image.getSize(uri, (width, height) => resolve({ width, height }), reject);
  });
}

/**
 * Ensure image is within optimal dimensions for AI generation.
 * - Too small (<768px): scale up (good face preservation)
 * - Too large (>1536px): scale down (reduces upload size, prevents timeouts)
 * - Within range: return as-is
 */
async function ensureOptimalSize(uri: string): Promise<string> {
  try {
    const { width, height } = await getImageSize(uri);
    const maxDim = Math.max(width, height);

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[PhotoExtraction] Analyzing image", {
        originalDimensions: `${width}x${height}`,
        maxDim,
        minDim: Math.min(width, height),
        isTooSmall: width < MIN_IMAGE_DIMENSION || height < MIN_IMAGE_DIMENSION,
        isTooLarge: maxDim > MAX_IMAGE_DIMENSION,
      });
    }

    // Already within optimal range
    if (width >= MIN_IMAGE_DIMENSION && height >= MIN_IMAGE_DIMENSION && maxDim <= MAX_IMAGE_DIMENSION) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[PhotoExtraction] Image already optimal, skipping resize", {
          dimensions: `${width}x${height}`,
          minRequired: MIN_IMAGE_DIMENSION,
          maxAllowed: MAX_IMAGE_DIMENSION,
        });
      }
      return uri;
    }

    let newWidth: number;
    let newHeight: number;
    let direction: string;

    if (maxDim > MAX_IMAGE_DIMENSION) {
      // Scale DOWN — largest dimension becomes MAX_IMAGE_DIMENSION
      const scale = MAX_IMAGE_DIMENSION / maxDim;
      newWidth = Math.round(width * scale);
      newHeight = Math.round(height * scale);
      direction = "down";
    } else {
      // Scale UP — smallest dimension becomes MIN_IMAGE_DIMENSION
      const scale = Math.max(MIN_IMAGE_DIMENSION / width, MIN_IMAGE_DIMENSION / height);
      newWidth = Math.ceil(width * scale);
      newHeight = Math.ceil(height * scale);
      direction = "up";
    }

    const compressQuality = maxDim > MAX_IMAGE_DIMENSION ? 0.8 : 1.0;  // Lossless for scale-up

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log(`[PhotoExtraction] Resizing ${direction}`, {
        from: `${width}x${height}`,
        to: `${newWidth}x${newHeight}`,
        scaleChange: `${((Math.max(newWidth, newHeight) / maxDim - 1) * 100).toFixed(0)}%`,
        compressQuality,
      });
    }

    const result = await manipulateAsync(uri, [{ resize: { width: newWidth, height: newHeight } }], {
      format: SaveFormat.JPEG,
      compress: compressQuality,
    });

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[PhotoExtraction] Resize complete", {
        original: `${width}x${height}`,
        resized: `${newWidth}x${newHeight}`,
        action: direction,
        quality: compressQuality === 1.0 ? "lossless" : `${compressQuality * 100}%`,
      });
    }

    return result.uri;
  } catch (error) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.error("[PhotoExtraction] Resize failed, using original", error);
    }
    return uri;
  }
}

/**
 * Extracts photo URIs from wizard data
 * Exported for use in other strategies (e.g., couple refinement)
 */
export function extractPhotoUris(wizardData: Record<string, unknown>): string[] {
  const photoKeys = Object.keys(wizardData)
    .filter((k) => k.includes(PHOTO_KEY_PREFIX))
    .sort();

  if (photoKeys.length === 0) {
    return [];
  }

  const photoUris: string[] = [];
  for (const key of photoKeys) {
    const photo = wizardData[key] as { uri?: string };
    if (photo?.uri) {
      photoUris.push(photo.uri);
    }
  }

  return photoUris;
}

/**
 * Extracts and converts photos to base64 from wizard data
 * Used by both image and video strategies
 */
export async function extractPhotosAsBase64(
  wizardData: Record<string, unknown>,
  enableDebugLogs = false,
): Promise<string[]> {
  if (enableDebugLogs && typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[PhotoExtraction] >>> extractPhotosAsBase64 START", {
      wizardDataKeys: Object.keys(wizardData),
      photoKeyPrefix: PHOTO_KEY_PREFIX,
      minDimension: MIN_IMAGE_DIMENSION,
      maxDimension: MAX_IMAGE_DIMENSION,
    });
  }

  const photoUris = extractPhotoUris(wizardData);

  if (enableDebugLogs && typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[PhotoExtraction] Photo URIs extracted", {
      count: photoUris.length,
      keys: Object.keys(wizardData).filter(k => k.includes(PHOTO_KEY_PREFIX)),
    });
  }

  if (photoUris.length === 0) {
    if (enableDebugLogs && typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[PhotoExtraction] No photos found, returning empty array");
    }
    return [];
  }

  // Use Promise.allSettled to handle individual failures gracefully
  const results = await Promise.allSettled(
    photoUris.map(async (uri, index) => {
      try {
        if (enableDebugLogs && typeof __DEV__ !== "undefined" && __DEV__) {
          console.log(`[PhotoExtraction] Processing photo ${index + 1}/${photoUris.length}`, {
            uri: uri.substring(0, 50) + "...",
          });
        }

        const optimizedUri = await ensureOptimalSize(uri);
        const base64 = await readFileAsBase64(optimizedUri);

        if (enableDebugLogs && typeof __DEV__ !== "undefined" && __DEV__) {
          console.log(`[PhotoExtraction] Photo ${index + 1} processed`, {
            sizeKB: (base64.length / 1024).toFixed(1),
            originalUri: uri.substring(0, 30) + "...",
          });
        }

        return base64;
      } catch (error) {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.error(`[PhotoExtraction] ❌ Failed to process photo ${index + 1}:`, {
            uri: uri.substring(0, 50) + "...",
            error: error instanceof Error ? error.message : String(error),
          });
        }
        return null;
      }
    })
  );

  // Extract successful results only
  const validPhotos = results
    .map((result) => (result.status === "fulfilled" ? result.value : null))
    .filter((photo): photo is string => typeof photo === "string" && photo.length > 0);

  const failedCount = results.filter((r) => r.status === "rejected").length;

  if (enableDebugLogs && typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[PhotoExtraction] <<< extractPhotosAsBase64 COMPLETE", {
      total: photoUris.length,
      successful: validPhotos.length,
      failed: failedCount,
      sizes: validPhotos.map((p, i) => `Photo ${i + 1}: ${(p.length / 1024).toFixed(1)}KB`),
      totalSizeMB: ((validPhotos.reduce((sum, p) => sum + p.length, 0) / 1024 / 1024).toFixed(2)),
    });
  }

  if (failedCount > 0 && typeof __DEV__ !== "undefined" && __DEV__) {
    console.warn(`[PhotoExtraction] ⚠️ ${failedCount} photo(s) failed to process`);
  }

  return validPhotos;
}
