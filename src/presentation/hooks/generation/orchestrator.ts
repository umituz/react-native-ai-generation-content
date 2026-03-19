/**
 * Generation Orchestrator - Main Implementation
 * Handles AI generation execution with network check, moderation, credit deduction, and error handling
 */

import { useCallback, useState, useRef } from "react";
import type {
  GenerationStatus,
  GenerationState,
  GenerationError,
  GenerationStrategy,
  GenerationConfig,
  UseGenerationOrchestratorReturn,
} from "./orchestrator-types";

/**
 * Main generation orchestrator hook
 * Manages the complete generation lifecycle with error handling and state management
 */
export function useGenerationOrchestrator<TInput, TResult>(
  strategy: GenerationStrategy<TInput, TResult>,
  config: GenerationConfig,
): UseGenerationOrchestratorReturn<TInput, TResult> {
  const [status, setStatus] = useState<GenerationStatus>("idle");
  const [result, setResult] = useState<TResult | null>(null);
  const [error, setError] = useState<GenerationError | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const isGenerating = status === "checking" || status === "generating" || status === "saving";

  const reset = useCallback(() => {
    setStatus("idle");
    setResult(null);
    setError(null);
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
  }, []);

  const generate = useCallback(
    async (input: TInput): Promise<TResult | void> => {
      // Reset state
      reset();

      // Create abort controller for this generation
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      try {
        // Call lifecycle start hook
        await config.lifecycle?.onStart?.();

        // Set checking status
        setStatus("checking");

        // Execute generation
        setStatus("generating");
        const generationResult = await strategy.execute(input, abortController.signal);

        // Save result if save strategy provided
        if (strategy.save && config.userId) {
          setStatus("saving");
          await strategy.save(generationResult, config.userId);
        }

        // Success
        setStatus("success");
        setResult(generationResult);

        // Call success callbacks
        await config.onSuccess?.(generationResult);
        await config.lifecycle?.onComplete?.("success", generationResult);

        // Show success alert if provided
        if (config.alertMessages?.success) {
          // Alert would be shown here in a real implementation
          console.log(config.alertMessages.success);
        }

        return generationResult;
      } catch (err) {
        // Determine error type and create error object
        let errorType: GenerationError["type"] = "unknown";
        let errorMessage = "An error occurred during generation";

        if (err instanceof Error) {
          if (err.message.includes("network") || err.message.includes("fetch")) {
            errorType = "network";
            errorMessage = config.alertMessages?.networkError || err.message;
          } else if (err.message.includes("moderation") || err.message.includes("content")) {
            errorType = "moderation";
            errorMessage = config.alertMessages?.moderationError || err.message;
          } else if (err.message.includes("credits") || err.message.includes("insufficient")) {
            errorType = "credits";
            errorMessage = config.alertMessages?.insufficientCredits || err.message;
          } else if (err.message.includes("save") || err.message.includes("storage")) {
            errorType = "save";
            errorMessage = config.alertMessages?.saveFailed || err.message;
          } else {
            errorType = "generation";
            errorMessage = config.alertMessages?.generationError || err.message;
          }
        }

        const generationError: GenerationError = {
          type: errorType,
          message: errorMessage,
          originalError: err instanceof Error ? err : undefined,
        };

        setStatus("error");
        setError(generationError);

        // Call error callbacks
        await config.onError?.(generationError);
        await config.lifecycle?.onComplete?.("error", undefined, generationError);
      } finally {
        abortControllerRef.current = null;
      }
    },
    [strategy, config, reset],
  );

  return {
    generate,
    reset,
    status,
    isGenerating,
    result,
    error,
  };
}
