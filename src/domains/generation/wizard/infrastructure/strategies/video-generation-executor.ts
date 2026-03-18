/**
 * Video Generation Executor - Execution Functions
 */

import type { WizardVideoInput } from "./video-generation.types";
import type { VideoModelConfig } from "../../../../../domain/interfaces/video-model-config.types";
import { VIDEO_GENERATION_TIMEOUT_MS } from "./wizard-strategy.constants";
import { createGenerationError, GenerationErrorType } from "../../../../../infrastructure/utils/error-factory";
import type { ExecutionResult } from "./video-generation.types";
import { buildGenericInput } from "./video-generation-input-builder";

/**
 * Execute video generation using direct provider call
 */
export async function executeVideoGeneration(
  input: WizardVideoInput,
  model: string,
  onProgress?: (status: string) => void,
  modelConfig?: VideoModelConfig,
  providerId?: string,
): Promise<ExecutionResult> {
  const { resolveProvider } = await import("../../../../../infrastructure/services/provider-resolver");

  let provider;
  try {
    provider = resolveProvider(providerId);
  } catch {
    const error = createGenerationError(
      GenerationErrorType.VALIDATION,
      "AI provider is not initialized. Please check your configuration."
    );
    return { success: false, error: error.message };
  }

  try {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[VideoExecutor] Generation starting", {
        model,
        hasModelConfig: !!modelConfig,
        duration: input.duration,
        resolution: input.resolution,
      });
    }

    // Use modelConfig.buildInput() if available, otherwise generic fallback
    const modelInput = modelConfig
      ? modelConfig.buildInput(input)
      : buildGenericInput(input);

    let lastStatus = "";
    const result = await provider.subscribe(model, modelInput, {
      timeoutMs: VIDEO_GENERATION_TIMEOUT_MS,
      onQueueUpdate: (status) => {
        if (status.status !== lastStatus) {
          lastStatus = status.status;
          onProgress?.(status.status);
        }
      },
    });

    const rawResult = result as Record<string, unknown>;
    const data = (rawResult?.data ?? rawResult) as { video?: { url: string }; video_url?: string; url?: string };
    // FAL returns { video: { url } }, Pruna returns { url }, some return { video_url }
    const videoUrl = data?.video?.url ?? data?.video_url ?? data?.url;

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[VideoExecutor] Generation completed", { success: !!videoUrl });
    }

    return videoUrl
      ? { success: true, videoUrl, requestId: (rawResult as { requestId?: string })?.requestId }
      : { success: false, error: "No video generated" };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Generation failed" };
  }
}
