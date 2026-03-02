/**
 * Photo Extraction Utilities
 * Shared photo extraction logic for wizard strategies
 *
 * Resize strategy:
 * - Small images (<300px):  scale UP to 300px minimum (AI provider requirement)
 * - Large images (>1536px): scale DOWN to 1536px maximum (reduces upload size ~10x)
 * - Normal images:          pass through unchanged
 */

import { readFileAsBase64 } from "@umituz/react-native-design-system/filesystem";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { Image } from "react-native";
import { PHOTO_KEY_PREFIX } from "../wizard-strategy.constants";


const MIN_IMAGE_DIMENSION = 300;
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
 * - Too small (<300px): scale up (AI providers require minimum dimensions)
 * - Too large (>1536px): scale down (reduces upload size, prevents timeouts)
 * - Within range: return as-is
 */
async function ensureOptimalSize(uri: string): Promise<string> {
  try {
    const { width, height } = await getImageSize(uri);
    const maxDim = Math.max(width, height);

    // Already within optimal range
    if (width >= MIN_IMAGE_DIMENSION && height >= MIN_IMAGE_DIMENSION && maxDim <= MAX_IMAGE_DIMENSION) {
      return uri;
    }

    let newWidth: number;
    let newHeight: number;

    if (maxDim > MAX_IMAGE_DIMENSION) {
      // Scale DOWN — largest dimension becomes MAX_IMAGE_DIMENSION
      const scale = MAX_IMAGE_DIMENSION / maxDim;
      newWidth = Math.round(width * scale);
      newHeight = Math.round(height * scale);
    } else {
      // Scale UP — smallest dimension becomes MIN_IMAGE_DIMENSION
      const scale = Math.max(MIN_IMAGE_DIMENSION / width, MIN_IMAGE_DIMENSION / height);
      newWidth = Math.ceil(width * scale);
      newHeight = Math.ceil(height * scale);
    }

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      const direction = maxDim > MAX_IMAGE_DIMENSION ? "down" : "up";
      console.log(`[PhotoExtraction] Resizing ${direction}`, {
        from: `${width}x${height}`,
        to: `${newWidth}x${newHeight}`,
      });
    }

    const result = await manipulateAsync(uri, [{ resize: { width: newWidth, height: newHeight } }], {
      format: SaveFormat.JPEG,
      compress: maxDim > MAX_IMAGE_DIMENSION ? 0.8 : 0.9,
    });

    return result.uri;
  } catch {
    return uri;
  }
}

/**
 * Extracts photo URIs from wizard data
 */
function extractPhotoUris(wizardData: Record<string, unknown>): string[] {
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
    console.log("[PhotoExtraction] Starting extraction", {
      wizardDataKeys: Object.keys(wizardData),
    });
  }

  const photoUris = extractPhotoUris(wizardData);

  if (enableDebugLogs && typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[PhotoExtraction] Found photo URIs", { count: photoUris.length });
  }

  if (photoUris.length === 0) {
    return [];
  }

  // Use Promise.allSettled to handle individual failures gracefully
  const results = await Promise.allSettled(
    photoUris.map(async (uri, index) => {
      try {
        const optimizedUri = await ensureOptimalSize(uri);
        return await readFileAsBase64(optimizedUri);
      } catch (error) {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.error(`[PhotoExtraction] Failed to read photo ${index}:`, error);
        }
        return null;
      }
    })
  );

  // Extract successful results only
  const validPhotos = results
    .map((result) => (result.status === "fulfilled" ? result.value : null))
    .filter((photo): photo is string => typeof photo === "string" && photo.length > 0);

  if (enableDebugLogs && typeof __DEV__ !== "undefined" && __DEV__) {
    const failedCount = results.filter((r) => r.status === "rejected").length;
    console.log("[PhotoExtraction] Converted photos", {
      total: photoUris.length,
      valid: validPhotos.length,
      failed: failedCount,
      sizes: validPhotos.map((p) => `${(p.length / 1024).toFixed(1)}KB`),
    });
  }

  return validPhotos;
}
