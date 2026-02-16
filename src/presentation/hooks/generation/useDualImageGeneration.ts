/**
 * useDualImageGeneration Hook
 * Generic hook for dual-image AI generation workflows
 */

import { useState, useCallback, useMemo } from "react";
import { useAlert, saveImageToGallery } from "@umituz/react-native-design-system";
import { useGenerationOrchestrator } from "./orchestrator";
import { useImagePicker } from "./useImagePicker";
import { executeMultiImageGeneration } from "../../../infrastructure/services/multi-image-generation.executor";
import type { GenerationStrategy } from "./types";
import type {
  DualImageGenerationConfig,
  DualImageGenerationReturn,
  GenerationInput,
} from "./useDualImageGeneration.types";

export type { DualImageGenerationConfig, DualImageGenerationReturn } from "./useDualImageGeneration.types";

export const useDualImageGeneration = (
  config: DualImageGenerationConfig,
): DualImageGenerationReturn => {
  const {
    model,
    getPrompt,
    userId,
    creditCost,
    alertMessages,
    imageAspect = [1, 1],
    onCreditsExhausted,
    onSuccess,
    onError,
  } = config;

  const { showError, showSuccess } = useAlert();
  const [progress, setProgress] = useState(0);

  // Image pickers
  const sourceImage = useImagePicker({
    aspect: imageAspect,
    onError: () => showError("Error", "Failed to select image"),
  });

  const targetImage = useImagePicker({
    aspect: imageAspect,
    onError: () => showError("Error", "Failed to select image"),
  });

  // Generation strategy for orchestrator
  const strategy: GenerationStrategy<GenerationInput, string> = useMemo(
    () => ({
      execute: async (input) => {
        // Don't use fake progress - let UI show indeterminate loading
        const result = await executeMultiImageGeneration({
          photos: [input.sourceBase64, input.targetBase64],
          prompt: getPrompt(),
          model,
        });

        if (!result.success || !result.imageUrl) {
          throw new Error(result.error || "Generation failed");
        }

        return result.imageUrl;
      },
    }),
    [model, getPrompt, creditCost],
  );

  // Use orchestrator for credit/error handling
  const orchestrator = useGenerationOrchestrator(strategy, {
    userId,
    alertMessages,
    onSuccess: (result) => onSuccess?.(result as string),
    onError: (error) => onError?.(error.message),
  });

  // Process handler
  const process = useCallback(async () => {
    if (!sourceImage.base64 || !targetImage.base64) {
      showError("Missing Photos", "Please upload both photos");
      return;
    }

    // Progress will be indeterminate - no fake percentages
    setProgress(-1); // -1 indicates indeterminate/unknown progress
    try {
      await orchestrator.generate({
        sourceBase64: sourceImage.base64,
        targetBase64: targetImage.base64,
      });
      setProgress(100); // Only set to 100 when actually complete
    } catch {
      setProgress(0);
    }
  }, [sourceImage.base64, targetImage.base64, orchestrator, showError]);

  // Save handler
  const save = useCallback(async () => {
    if (!orchestrator.result) return;

    const result = await saveImageToGallery(orchestrator.result);
    if (result.success) {
      showSuccess("Success", "Image saved to gallery");
    } else {
      showError("Error", result.error ?? "Failed to save");
    }
  }, [orchestrator.result, showSuccess, showError]);

  // Reset handler
  const reset = useCallback(() => {
    sourceImage.reset();
    targetImage.reset();
    setProgress(0);
    orchestrator.reset();
  }, [sourceImage, targetImage, orchestrator]);

  return {
    sourceImageUri: sourceImage.uri,
    targetImageUri: targetImage.uri,
    processedUrl: orchestrator.result,
    isProcessing: orchestrator.isGenerating,
    progress,
    selectSourceImage: sourceImage.pick,
    selectTargetImage: targetImage.pick,
    process,
    save,
    reset,
  };
};
