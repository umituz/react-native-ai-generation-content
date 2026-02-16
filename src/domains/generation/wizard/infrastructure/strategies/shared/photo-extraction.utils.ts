/**
 * Photo Extraction Utilities
 * Shared photo extraction logic for wizard strategies
 */

import { readFileAsBase64 } from "@umituz/react-native-design-system";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { Image } from "react-native";
import { PHOTO_KEY_PREFIX } from "../wizard-strategy.constants";

declare const __DEV__: boolean;

const MIN_IMAGE_DIMENSION = 300;

/**
 * Get image dimensions from URI
 */
function getImageSize(uri: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    Image.getSize(uri, (width, height) => resolve({ width, height }), reject);
  });
}

/**
 * Ensure image meets minimum dimensions (300x300) required by AI providers.
 * Returns the original URI if already large enough, or a resized URI.
 */
async function ensureMinimumSize(uri: string): Promise<string> {
  try {
    const { width, height } = await getImageSize(uri);

    if (width >= MIN_IMAGE_DIMENSION && height >= MIN_IMAGE_DIMENSION) {
      return uri;
    }

    const scale = Math.max(MIN_IMAGE_DIMENSION / width, MIN_IMAGE_DIMENSION / height);
    const newWidth = Math.ceil(width * scale);
    const newHeight = Math.ceil(height * scale);

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[PhotoExtraction] Resizing small image", {
        from: `${width}x${height}`,
        to: `${newWidth}x${newHeight}`,
      });
    }

    const result = await manipulateAsync(uri, [{ resize: { width: newWidth, height: newHeight } }], {
      format: SaveFormat.JPEG,
      compress: 0.9,
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
        const resizedUri = await ensureMinimumSize(uri);
        return await readFileAsBase64(resizedUri);
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
