/**
 * Video Generation Strategy - Audio Extractor
 * Extracts audio from wizard data for video generation
 */

import { readFileAsBase64 } from "@umituz/react-native-design-system/filesystem";

/**
 * Extract audio from wizardData and read as base64.
 * Audio step stores data as { uri: "file:///..." }.
 */
export async function extractAudioAsBase64(wizardData: Record<string, unknown>): Promise<string | undefined> {
  const audioData = wizardData.background_audio as { uri?: string } | undefined;
  if (!audioData?.uri) return undefined;

  try {
    const base64 = await readFileAsBase64(audioData.uri);
    if (!base64) return undefined;
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[VideoStrategy] Audio extracted as base64", { length: base64.length });
    }
    return base64;
  } catch (error) {
    console.warn("[VideoStrategy] Failed to read audio file:", error);
    return undefined;
  }
}
