/**
 * Video Generation Executor
 * Handles the actual video generation execution.
 * Model-agnostic: uses VideoModelConfig.buildInput() for model-specific parameters.
 * Fallback: generic input builder when no modelConfig is provided.
 */

import type { WizardVideoInput } from "./video-generation.types";
import type { VideoModelConfig } from "../../../../../domain/interfaces/video-model-config.types";
import { GENERATION_TIMEOUT_MS, BASE64_IMAGE_PREFIX } from "./wizard-strategy.constants";
import { createGenerationError, GenerationErrorType } from "../../../../../infrastructure/utils/error-factory";


interface ExecutionResult {
  success: boolean;
  videoUrl?: string;
  requestId?: string;
  error?: string;
}

interface SubmissionResult {
  success: boolean;
  requestId?: string;
  model?: string;
  error?: string;
}

function formatBase64(base64: string | undefined): string | undefined {
  if (!base64) return undefined;
  return base64.startsWith("data:") ? base64 : `${BASE64_IMAGE_PREFIX}${base64}`;
}

/**
 * Generic input builder - used when no modelConfig is provided.
 * Sends standard parameters without model-specific logic.
 */
function buildGenericInput(input: WizardVideoInput): Record<string, unknown> {
  const modelInput: Record<string, unknown> = { prompt: input.prompt };
  const sourceImage = formatBase64(input.sourceImageBase64);

  if (sourceImage && sourceImage.length > 0) {
    modelInput.image_url = sourceImage;
  }
  if (input.duration) {
    modelInput.duration = input.duration;
  }
  if (input.aspectRatio) {
    modelInput.aspect_ratio = input.aspectRatio;
  }
  if (input.resolution) {
    modelInput.resolution = input.resolution;
  }

  return modelInput;
}

/**
 * Execute video generation using direct provider call
 */
export async function executeVideoGeneration(
  input: WizardVideoInput,
  model: string,
  onProgress?: (status: string) => void,
  modelConfig?: VideoModelConfig,
): Promise<ExecutionResult> {
  const { providerRegistry } = await import("../../../../../infrastructure/services/provider-registry.service");

  const provider = providerRegistry.getActiveProvider();
  if (!provider?.isInitialized()) {
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
      timeoutMs: GENERATION_TIMEOUT_MS,
      onQueueUpdate: (status) => {
        if (status.status !== lastStatus) {
          lastStatus = status.status;
          onProgress?.(status.status);
        }
      },
    });

    const rawResult = result as Record<string, unknown>;
    const data = (rawResult?.data ?? rawResult) as { video?: { url: string }; video_url?: string };
    const videoUrl = data?.video?.url ?? data?.video_url;

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

/**
 * Submit video generation to queue
 * For background processing of video generation
 */
export async function submitVideoGenerationToQueue(
  input: WizardVideoInput,
  model: string,
  modelConfig?: VideoModelConfig,
): Promise<SubmissionResult> {
  const { providerRegistry } = await import("../../../../../infrastructure/services/provider-registry.service");

  const provider = providerRegistry.getActiveProvider();
  if (!provider?.isInitialized()) {
    const error = createGenerationError(
      GenerationErrorType.VALIDATION,
      "AI provider is not initialized. Please check your configuration."
    );
    return { success: false, error: error.message };
  }

  try {
    // Use modelConfig.buildInput() if available, otherwise generic fallback
    const modelInput = modelConfig
      ? modelConfig.buildInput(input)
      : buildGenericInput(input);

    const submission = await provider.submitJob(model, modelInput);

    return { success: true, requestId: submission.requestId, model };
  } catch (error) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.error("[VideoExecutor] Queue submission error:", error);
    }

    let errorMessage = "Failed to submit video generation to queue. Please try again.";

    if (error instanceof Error) {
      const message = error.message.toLowerCase();

      if (message.includes("network") || message.includes("connection")) {
        errorMessage = "Network error. Please check your internet connection and try again.";
      } else {
        errorMessage = `Queue submission failed: ${error.message}`;
      }
    }

    return { success: false, error: errorMessage };
  }
}
