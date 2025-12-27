/**
 * Text-to-Image Generation Hook
 * Orchestrates generation with app-provided callbacks
 */

import { useState, useCallback } from "react";
import type {
  TextToImageFormState,
  TextToImageCallbacks,
  TextToImageGenerationResult,
  TextToImageGenerationRequest,
} from "../../domain/types";

export interface GenerationState {
  isGenerating: boolean;
  progress: number;
  error: string | null;
}

export interface UseGenerationOptions {
  formState: TextToImageFormState;
  callbacks: TextToImageCallbacks;
  onPromptCleared?: () => void;
}

export interface UseGenerationReturn {
  generationState: GenerationState;
  totalCost: number;
  handleGenerate: () => Promise<TextToImageGenerationResult | null>;
}

const initialState: GenerationState = {
  isGenerating: false,
  progress: 0,
  error: null,
};

export function useGeneration(options: UseGenerationOptions): UseGenerationReturn {
  const { formState, callbacks, onPromptCleared } = options;
  const [generationState, setGenerationState] = useState<GenerationState>(initialState);

  const totalCost = callbacks.calculateCost(formState.numImages, formState.selectedModel);

  const handleGenerate = useCallback(async (): Promise<TextToImageGenerationResult | null> => {
    const trimmedPrompt = formState.prompt.trim();

    if (!trimmedPrompt) {
      setGenerationState((prev) => ({ ...prev, error: "Prompt is required" }));
      return null;
    }

    if (!callbacks.isAuthenticated()) {
      callbacks.onAuthRequired?.();
      return null;
    }

    if (!callbacks.canAfford(totalCost)) {
      callbacks.onCreditsRequired?.(totalCost);
      return null;
    }

    setGenerationState({ isGenerating: true, progress: 0, error: null });

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

    try {
      const result = await callbacks.executeGeneration(request);

      if (result.success === true) {
        callbacks.onSuccess?.(result.imageUrls);
        onPromptCleared?.();
        setGenerationState({ isGenerating: false, progress: 100, error: null });
      } else {
        setGenerationState({ isGenerating: false, progress: 0, error: result.error });
        callbacks.onError?.(result.error);
      }

      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setGenerationState({ isGenerating: false, progress: 0, error: message });
      callbacks.onError?.(message);
      return null;
    }
  }, [formState, callbacks, totalCost, onPromptCleared]);

  return { generationState, totalCost, handleGenerate };
}
