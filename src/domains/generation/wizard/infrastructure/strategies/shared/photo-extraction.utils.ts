/**
 * Photo Extraction Utilities
 * Shared photo extraction logic for wizard strategies
 *
 * Extraction strategy:
 * - Extract photo URIs from wizard data
 * - Convert to base64 for AI generation
 * - No resize or modification (original quality preserved)
 *
 * IMPORTANT: Uses original image quality. Users should provide high-quality images (512px+) for best results.
 */

import { readFileAsBase64 } from "@umituz/react-native-design-system/filesystem";
import { PHOTO_KEY_PREFIX } from "../wizard-strategy.constants";

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
 *
 * Note: This function preserves original image quality. No resize or modification is applied.
 * For best AI generation results, users should provide high-quality images (512px+ recommended).
 */
export async function extractPhotosAsBase64(
  wizardData: Record<string, unknown>,
  enableDebugLogs = false,
): Promise<string[]> {
  if (enableDebugLogs && typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[PhotoExtraction] >>> extractPhotosAsBase64 START", {
      wizardDataKeys: Object.keys(wizardData),
      photoKeyPrefix: PHOTO_KEY_PREFIX,
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

        // ✅ Direct base64 conversion - no resize or modification
        const base64 = await readFileAsBase64(uri);

        // Check if base64 conversion succeeded
        if (!base64) {
          throw new Error(`Failed to convert photo to base64: ${uri}`);
        }

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
