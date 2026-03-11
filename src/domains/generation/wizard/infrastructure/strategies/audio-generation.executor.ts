/**
 * Audio Generation Executor
 * Handles TTS generation via the AI provider (model-agnostic).
 * The model endpoint (e.g., Chatterbox) is configured in the main app.
 */

import type { WizardAudioInput } from "./audio-generation.types";
import { addGenerationLogs, addGenerationLog, startGenerationLogSession } from "../../../../../infrastructure/services/generation-log-store";

/** Audio generation timeout — TTS is typically fast (10-30s) */
const AUDIO_GENERATION_TIMEOUT_MS = 60_000;

interface AudioExecutionResult {
  success: boolean;
  audioUrl?: string;
  error?: string;
  logSessionId?: string;
}

export async function executeAudioGeneration(
  input: WizardAudioInput,
  model: string,
  onProgress?: (progress: number) => void,
  providerId?: string,
): Promise<AudioExecutionResult> {
  const TAG = "AudioExecutor";
  const startTime = Date.now();
  const sid = startGenerationLogSession();
  const { resolveProvider } = await import("../../../../../infrastructure/services/provider-resolver");

  let provider;
  try {
    provider = resolveProvider(providerId);
  } catch {
    addGenerationLog(sid, TAG, "Provider not initialized!", "error");
    return { success: false, error: "AI provider not initialized", logSessionId: sid };
  }

  try {
    addGenerationLog(sid, TAG, "TTS generation starting", "info", {
      model,
      textLength: input.text.length,
      voice: input.voice,
      language: input.language,
      timeout: AUDIO_GENERATION_TIMEOUT_MS,
    });

    // Build model input — generic structure, model-specific params come from app config
    const modelInput: Record<string, unknown> = {
      text: input.text,
    };

    if (input.voice) {
      modelInput.voice = input.voice;
    }
    if (input.language) {
      modelInput.language = input.language;
    }
    if (input.exaggeration !== undefined) {
      modelInput.exaggeration = input.exaggeration;
    }
    if (input.cfgWeight !== undefined) {
      modelInput.cfg_weight = input.cfgWeight;
    }

    addGenerationLog(sid, TAG, "Calling provider.subscribe()...");
    const result = await provider.subscribe(model, modelInput, {
      timeoutMs: AUDIO_GENERATION_TIMEOUT_MS,
      onQueueUpdate: (status) => {
        addGenerationLog(sid, TAG, `Queue: ${status.status}`);
      },
    });

    // Collect provider logs
    const providerSessionId = (result as { __providerSessionId?: string })?.__providerSessionId;
    const providerLogs = provider.endLogSession?.(providerSessionId) ?? provider.getSessionLogs?.(providerSessionId) ?? [];
    addGenerationLogs(sid, providerLogs);

    // Extract audio URL from response
    // FAL TTS models return: { audio: { url } } or { audio_url } or { url }
    const rawResult = result as Record<string, unknown>;
    const data = (rawResult?.data ?? rawResult) as {
      audio?: { url: string };
      audio_url?: string;
      url?: string;
    };

    const audioUrl = data?.audio?.url ?? data?.audio_url ?? data?.url;

    const elapsed = Date.now() - startTime;
    onProgress?.(100);

    if (audioUrl) {
      addGenerationLog(sid, TAG, `TTS SUCCESS in ${elapsed}ms`, "info", { audioUrl, elapsed });
      return { success: true, audioUrl, logSessionId: sid };
    }

    addGenerationLog(sid, TAG, `No audio in response after ${elapsed}ms`, "error", {
      responseKeys: Object.keys(data || {}),
      elapsed,
    });
    return { success: false, error: "No audio generated", logSessionId: sid };
  } catch (error) {
    // Collect provider logs even on failure
    const providerLogs = provider.endLogSession?.() ?? [];
    addGenerationLogs(sid, providerLogs);

    const elapsed = Date.now() - startTime;
    const errorMsg = error instanceof Error ? error.message : "Audio generation failed";
    addGenerationLog(sid, TAG, `TTS FAILED after ${elapsed}ms: ${errorMsg}`, "error", { elapsed });
    return { success: false, error: errorMsg, logSessionId: sid };
  }
}
