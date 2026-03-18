/**
 * Video Generation Executor - Queue Submission
 */

import type { WizardVideoInput } from "./video-generation.types";
import type { VideoModelConfig } from "../../../../../domain/interfaces/video-model-config.types";
import { createGenerationError, GenerationErrorType } from "../../../../../infrastructure/utils/error-factory";
import type { SubmissionResult } from "./video-generation.types";
import { buildGenericInput } from "./video-generation-input-builder";

/**
 * Submit video generation to queue
 * For background processing of video generation
 */
export async function submitVideoGenerationToQueue(
  input: WizardVideoInput,
  model: string,
  modelConfig?: VideoModelConfig,
  providerId?: string,
): Promise<SubmissionResult> {
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
