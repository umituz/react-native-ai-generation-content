/**
 * Text-to-Image Generation Hook
 * Uses centralized orchestrator for auth, credits, and error handling
 */

import { useCallback, useMemo } from "react";
import {
  useGenerationOrchestrator,
  type GenerationStrategy,
  type AlertMessages,
} from "../../../../presentation/hooks/generation";
import type {
  TextToImageFormState,
  TextToImageCallbacks,
  TextToImageGenerationResult,
  TextToImageGenerationRequest,
} from "../../domain/types";

declare const __DEV__: boolean;

export interface UseGenerationOptions {
  formState: TextToImageFormState;
  callbacks: TextToImageCallbacks;
  userId?: string;
  onPromptCleared?: () => void;
}

export interface TextToImageGenerationState {
  isGenerating: boolean;
  progress: number;
  error: string | null;
}

export interface UseGenerationReturn {
  generationState: TextToImageGenerationState;
  totalCost: number;
  handleGenerate: () => Promise<TextToImageGenerationResult | null>;
}

const DEFAULT_ALERT_MESSAGES: AlertMessages = {
  networkError: "No internet connection. Please check your network.",
  policyViolation: "Content not allowed. Please try again.",
  saveFailed: "Failed to save. Please try again.",
  creditFailed: "Credit operation failed. Please try again.",
  unknown: "An error occurred. Please try again.",
};

export function useGeneration(options: UseGenerationOptions): UseGenerationReturn {
  const { formState, callbacks, userId, onPromptCleared } = options;

  const totalCost = callbacks.calculateCost(formState.numImages, formState.selectedModel);

  // Build strategy for orchestrator
  const strategy: GenerationStrategy<TextToImageGenerationRequest, string[]> = useMemo(
    () => ({
      execute: async (request) => {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[TextToImage] Executing generation:", JSON.stringify(request, null, 2));
        }
        const result = await callbacks.executeGeneration(request);
        if (result.success === false) {
          throw new Error(result.error);
        }
        return result.imageUrls;
      },
      getCreditCost: () => totalCost,
    }),
    [callbacks, totalCost],
  );

  // Use orchestrator
  const { generate, isGenerating, progress, error } = useGenerationOrchestrator(strategy, {
    userId,
    alertMessages: DEFAULT_ALERT_MESSAGES,
    onCreditsExhausted: () => callbacks.onCreditsRequired?.(totalCost),
    onSuccess: (result) => {
      const imageUrls = result as string[];
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[TextToImage] Success! Generated", imageUrls.length, "image(s)");
      }
      callbacks.onSuccess?.(imageUrls);
      onPromptCleared?.();
    },
    onError: (err) => {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[TextToImage] Error:", err.message);
      }
      callbacks.onError?.(err.message);
    },
  });

  const handleGenerate = useCallback(async (): Promise<TextToImageGenerationResult | null> => {
    const trimmedPrompt = formState.prompt.trim();

    if (!trimmedPrompt) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[TextToImage] No prompt provided");
      }
      callbacks.onError?.("Prompt is required");
      return { success: false, error: "Prompt is required" };
    }

    const request: TextToImageGenerationRequest = {
      prompt: trimmedPrompt,
      model: formState.selectedModel ?? undefined,
      aspectRatio: formState.aspectRatio,
      size: formState.size,
      negativePrompt: formState.negativePrompt.trim() || undefined,
      guidanceScale: formState.guidanceScale,
      numImages: formState.numImages,
      style: formState.selectedStyle,
      outputFormat: formState.outputFormat,
    };

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[TextToImage] Starting generation...");
    }

    await generate(request);

    // Return result based on orchestrator state
    return null; // Result handled via callbacks
  }, [formState, generate, callbacks]);

  return {
    generationState: {
      isGenerating,
      progress,
      error: error?.message || null,
    },
    totalCost,
    handleGenerate,
  };
}
