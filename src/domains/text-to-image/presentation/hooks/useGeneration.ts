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


export interface UseGenerationOptions {
  formState: TextToImageFormState;
  callbacks: TextToImageCallbacks;
  userId?: string;
  onPromptCleared?: () => void;
}

export interface TextToImageGenerationState {
  isGenerating: boolean;
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
  const { formState, callbacks, onPromptCleared } = options;

  // Get userId from callbacks (from app layer via useAIFeatureCallbacks)
  const userId = callbacks.userId;

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
    }),
    [callbacks, totalCost],
  );

  // Use orchestrator
  const { generate, isGenerating, error } = useGenerationOrchestrator(strategy, {
    userId: userId ?? undefined,
    alertMessages: DEFAULT_ALERT_MESSAGES,
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

    // Auth and credit checks should be handled by useFeatureGate before calling this
    // Only keeping prompt validation here

    const trimmedNegativePrompt = formState.negativePrompt.trim();

    const request: TextToImageGenerationRequest = {
      prompt: trimmedPrompt,
      model: formState.selectedModel === null ? undefined : formState.selectedModel,
      aspectRatio: formState.aspectRatio,
      size: formState.size,
      negativePrompt: trimmedNegativePrompt === "" ? undefined : trimmedNegativePrompt,
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
      error: error?.message ?? null,
    },
    totalCost,
    handleGenerate,
  };
}
