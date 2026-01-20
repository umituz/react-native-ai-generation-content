/**
 * Photo Extraction Utilities
 * Shared photo extraction logic for wizard strategies
 */

import { readFileAsBase64 } from "@umituz/react-native-design-system";
import { PHOTO_KEY_PREFIX } from "../wizard-strategy.constants";

declare const __DEV__: boolean;

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

  const photosBase64 = await Promise.all(photoUris.map((uri) => readFileAsBase64(uri)));
  const validPhotos = photosBase64.filter(Boolean) as string[];

  if (enableDebugLogs && typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[PhotoExtraction] Converted photos", {
      total: photoUris.length,
      valid: validPhotos.length,
      sizes: validPhotos.map((p) => `${(p.length / 1024).toFixed(1)}KB`),
    });
  }

  return validPhotos;
}
