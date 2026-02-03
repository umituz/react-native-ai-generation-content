/**
 * useDualImageGeneration Hook
 * Generic hook for dual-image AI generation (e.g., baby prediction, couple futures)
 * Sends image_urls array as required by FAL AI multi-image models
 */

import { useState, useCallback, useMemo } from "react";
import {
  MediaPickerService,
  MediaQuality,
  useAlert,
  saveImageToGallery,
} from "@umituz/react-native-design-system";
import { useGenerationOrchestrator } from "./orchestrator";
import { executeMultiImageGeneration } from "../../../infrastructure/services/multi-image-generation.executor";
import { prepareImage } from "../../../infrastructure/utils/feature-utils";
import type { GenerationStrategy, AlertMessages } from "./types";

declare const __DEV__: boolean;

export interface DualImageGenerationConfig {
  /** AI model to use */
  readonly model: string;
  /** Function that returns the prompt (can depend on external state) */
  readonly getPrompt: () => string;
  /** User ID for credit operations */
  readonly userId: string | undefined;
  /** Credit cost per generation */
  readonly creditCost: number;
  /** Alert messages */
  readonly alertMessages: AlertMessages;
  /** Image aspect ratio for picker */
  readonly imageAspect?: [number, number];
  /** Callbacks */
  readonly onCreditsExhausted?: () => void;
  readonly onSuccess?: (imageUrl: string) => void;
  readonly onError?: (error: string) => void;
}

export interface DualImageGenerationReturn {
  readonly sourceImageUri: string | null;
  readonly targetImageUri: string | null;
  readonly processedUrl: string | null;
  readonly isProcessing: boolean;
  readonly progress: number;
  selectSourceImage(): Promise<void>;
  selectTargetImage(): Promise<void>;
  process(): Promise<void>;
  save(): Promise<void>;
  reset(): void;
}

interface GenerationInput {
  sourceBase64: string;
  targetBase64: string;
}

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

  // Image state
  const [sourceImageUri, setSourceImageUri] = useState<string | null>(null);
  const [targetImageUri, setTargetImageUri] = useState<string | null>(null);
  const [sourceBase64, setSourceBase64] = useState<string | null>(null);
  const [targetBase64, setTargetBase64] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  // Generation strategy for orchestrator
  const strategy: GenerationStrategy<GenerationInput, string> = useMemo(
    () => ({
      execute: async (input) => {
        setProgress(30);
        const result = await executeMultiImageGeneration({
          photos: [input.sourceBase64, input.targetBase64],
          prompt: getPrompt(),
          model,
        });
        setProgress(90);

        if (!result.success || !result.imageUrl) {
          throw new Error(result.error || "Generation failed");
        }

        setProgress(100);
        return result.imageUrl;
      },
      getCreditCost: () => creditCost,
    }),
    [model, getPrompt, creditCost],
  );

  // Use orchestrator for credit/error handling
  const orchestrator = useGenerationOrchestrator(strategy, {
    userId,
    alertMessages,
    onCreditsExhausted,
    onSuccess: (result) => onSuccess?.(result as string),
    onError: (error) => onError?.(error.message),
  });

  // Image selection handlers
  const selectSourceImage = useCallback(async () => {
    try {
      const result = await MediaPickerService.pickSingleImage({
        allowsEditing: true,
        quality: MediaQuality.HIGH,
        aspect: imageAspect,
      });

      if (!result.canceled && result.assets?.[0]) {
        const asset = result.assets[0];
        setSourceImageUri(asset.uri);
        const base64 = await prepareImage(asset.uri);
        setSourceBase64(base64);
      }
    } catch (error) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.error("[DualImageGeneration] Source image error:", error);
      }
      showError("Error", "Failed to select image");
    }
  }, [imageAspect, showError]);

  const selectTargetImage = useCallback(async () => {
    try {
      const result = await MediaPickerService.pickSingleImage({
        allowsEditing: true,
        quality: MediaQuality.HIGH,
        aspect: imageAspect,
      });

      if (!result.canceled && result.assets?.[0]) {
        const asset = result.assets[0];
        setTargetImageUri(asset.uri);
        const base64 = await prepareImage(asset.uri);
        setTargetBase64(base64);
      }
    } catch (error) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.error("[DualImageGeneration] Target image error:", error);
      }
      showError("Error", "Failed to select image");
    }
  }, [imageAspect, showError]);

  // Process handler
  const process = useCallback(async () => {
    if (!sourceBase64 || !targetBase64) {
      showError("Missing Photos", "Please upload both photos");
      return;
    }

    setProgress(10);
    try {
      await orchestrator.generate({ sourceBase64, targetBase64 });
    } catch {
      setProgress(0);
    }
  }, [sourceBase64, targetBase64, orchestrator, showError]);

  // Save handler - uses design-system saveImageToGallery
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
    setSourceImageUri(null);
    setTargetImageUri(null);
    setSourceBase64(null);
    setTargetBase64(null);
    setProgress(0);
    orchestrator.reset();
  }, [orchestrator]);

  return {
    sourceImageUri,
    targetImageUri,
    processedUrl: orchestrator.result,
    isProcessing: orchestrator.isGenerating,
    progress,
    selectSourceImage,
    selectTargetImage,
    process,
    save,
    reset,
  };
};
