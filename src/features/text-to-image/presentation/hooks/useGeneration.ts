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

declare const __DEV__: boolean;

export function useGeneration(options: UseGenerationOptions): UseGenerationReturn {
  const { formState, callbacks, onPromptCleared } = options;
  const [generationState, setGenerationState] = useState<GenerationState>(initialState);

  const totalCost = callbacks.calculateCost(formState.numImages, formState.selectedModel);

  const handleGenerate = useCallback(async (): Promise<TextToImageGenerationResult | null> => {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
       
      console.log("[TextToImage] handleGenerate called");
    }

    const trimmedPrompt = formState.prompt.trim();

    if (!trimmedPrompt) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
         
        console.log("[TextToImage] No prompt provided");
      }
      setGenerationState((prev) => ({ ...prev, error: "Prompt is required" }));
      return null;
    }

    const isAuth = callbacks.isAuthenticated();
    if (typeof __DEV__ !== "undefined" && __DEV__) {
       
      console.log("[TextToImage] isAuthenticated:", isAuth);
    }

    if (!isAuth) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
         
        console.log("[TextToImage] Auth required - calling onAuthRequired");
      }
      callbacks.onAuthRequired?.();
      return null;
    }

    const affordable = callbacks.canAfford(totalCost);
    if (typeof __DEV__ !== "undefined" && __DEV__) {
       
      console.log("[TextToImage] canAfford:", affordable, "totalCost:", totalCost);
    }

    if (!affordable) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
         
        console.log("[TextToImage] Credits required - calling onCreditsRequired");
      }
      callbacks.onCreditsRequired?.(totalCost);
      return null;
    }

    if (typeof __DEV__ !== "undefined" && __DEV__) {
       
      console.log("[TextToImage] Starting generation...");
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

    if (typeof __DEV__ !== "undefined" && __DEV__) {
       
      console.log("[TextToImage] Request:", JSON.stringify(request, null, 2));
    }

    try {
      const result = await callbacks.executeGeneration(request);
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        const logResult = {
          success: result.success,
          imageCount: result.success ? result.imageUrls?.length : 0,
          error: result.success === false ? result.error : undefined,
        };
         
        console.log("[TextToImage] Result:", JSON.stringify(logResult));
      }

      if (result.success === true) {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
           
          console.log("[TextToImage] Success! Generated", result.imageUrls?.length, "image(s)");
        }
        callbacks.onSuccess?.(result.imageUrls);
        onPromptCleared?.();
        setGenerationState({ isGenerating: false, progress: 100, error: null });
      } else {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
           
          console.log("[TextToImage] Generation failed:", result.error);
        }
        setGenerationState({ isGenerating: false, progress: 0, error: result.error });
        callbacks.onError?.(result.error);
      }

      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (typeof __DEV__ !== "undefined" && __DEV__) {
         
        console.error("[TextToImage] Exception:", message);
      }
      setGenerationState({ isGenerating: false, progress: 0, error: message });
      callbacks.onError?.(message);
      return null;
    }
  }, [formState, callbacks, totalCost, onPromptCleared]);

  return { generationState, totalCost, handleGenerate };
}
