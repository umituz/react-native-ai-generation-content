/**
 * Text-to-Voice Executor
 * Provider-agnostic text-to-voice execution using active AI provider
 */

import { providerRegistry } from "../../../../infrastructure/services";
import type {
  TextToVoiceRequest,
  TextToVoiceResult,
  TextToVoiceExecuteOptions,
} from "../../domain/types";

declare const __DEV__: boolean;

function defaultExtractResult(
  result: unknown,
): { audioUrl?: string; duration?: number } | undefined {
  if (typeof result !== "object" || result === null) return undefined;

  const r = result as Record<string, unknown>;

  if (typeof r.audio === "string") {
    return { audioUrl: r.audio };
  }

  if (typeof r.audio_url === "string") {
    return { audioUrl: r.audio_url };
  }

  if (r.audio && typeof r.audio === "object") {
    const audio = r.audio as Record<string, unknown>;
    if (typeof audio.url === "string") {
      return {
        audioUrl: audio.url,
        duration: typeof audio.duration === "number" ? audio.duration : undefined,
      };
    }
  }

  return undefined;
}

export async function executeTextToVoice(
  request: TextToVoiceRequest,
  options: TextToVoiceExecuteOptions,
): Promise<TextToVoiceResult> {
  const provider = providerRegistry.getActiveProvider();

  if (!provider) {
    return { success: false, error: "No AI provider configured" };
  }

  if (!provider.isInitialized()) {
    return { success: false, error: "AI provider not initialized" };
  }

  if (!request.text) {
    return { success: false, error: "Text is required" };
  }

  const { model, buildInput, extractResult, onProgress } = options;

  if (__DEV__) {
     
    console.log(`[TextToVoice] Provider: ${provider.providerId}, Model: ${model}`);
  }

  try {
    onProgress?.(10);

    const input = buildInput(request.text, request.options);
    onProgress?.(20);

    const result = await provider.run(model, input);
    onProgress?.(90);

    const extractor = extractResult || defaultExtractResult;
    const extracted = extractor(result);
    onProgress?.(100);

    if (!extracted?.audioUrl) {
      return { success: false, error: "No audio in response" };
    }

    return {
      success: true,
      audioUrl: extracted.audioUrl,
      duration: extracted.duration,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (__DEV__) {
       
      console.error("[TextToVoice] Error:", message);
    }
    return { success: false, error: message };
  }
}

export function hasTextToVoiceSupport(): boolean {
  const provider = providerRegistry.getActiveProvider();
  return provider !== null && provider.isInitialized();
}
