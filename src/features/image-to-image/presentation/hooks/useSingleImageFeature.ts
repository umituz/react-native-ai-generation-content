/**
 * useSingleImageFeature Hook Factory
 * Base hook for single image processing features
 * Uses centralized orchestrator for credit/error handling
 */

import { useState, useCallback, useRef, useMemo } from "react";
import { generateUUID } from "@umituz/react-native-design-system";
import { executeImageFeature } from "../../../../infrastructure/services";
import {
  useGenerationOrchestrator,
  type GenerationStrategy,
  type AlertMessages,
} from "../../../../presentation/hooks/generation";
import type {
  BaseSingleImageHookProps,
  BaseSingleImageHookReturn,
  SingleImageConfig,
  BaseImageResult,
} from "../../domain/types";

export interface SingleImageFeatureOptions<TConfig = SingleImageConfig> {
  buildInput?: (imageBase64: string, config: TConfig) => Record<string, unknown>;
  /** Alert messages for error handling */
  alertMessages?: AlertMessages;
  /** User ID for credit operations */
  userId?: string;
  /** Callback when credits are exhausted */
  onCreditsExhausted?: () => void;
}

const DEFAULT_ALERT_MESSAGES: AlertMessages = {
  networkError: "No internet connection. Please check your network.",
  policyViolation: "Content not allowed. Please try a different image.",
  saveFailed: "Failed to save result. Please try again.",
  creditFailed: "Credit operation failed. Please try again.",
  unknown: "An error occurred. Please try again.",
};

interface SingleImageInput {
  imageBase64: string;
  options?: Record<string, unknown>;
}

export function useSingleImageFeature<TConfig = SingleImageConfig>(
  props: BaseSingleImageHookProps<TConfig>,
  options?: SingleImageFeatureOptions<TConfig>,
): BaseSingleImageHookReturn {
  const { config: rawConfig, onSelectImage, onSaveImage, onBeforeProcess } = props;

  // Cast config to base type for internal usage
  const config = rawConfig as unknown as SingleImageConfig;

  // Image selection state (separate from orchestrator state)
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const creationIdRef = useRef<string | null>(null);

  // Create strategy for orchestrator
  const strategy: GenerationStrategy<SingleImageInput, string> = useMemo(
    () => ({
      execute: async (input, onProgress) => {
        const result = await executeImageFeature(
          config.featureType,
          input.options ? { imageBase64: input.imageBase64, ...input.options } : { imageBase64: input.imageBase64 },
          { extractResult: config.extractResult, onProgress },
        );

        if (!result.success || !result.imageUrl) {
          throw new Error(result.error || "Processing failed");
        }

        // Notify completion with creationId
        const creationId = creationIdRef.current;
        if (creationId) {
          config.onProcessingComplete?.({ ...result, creationId } as BaseImageResult);
        }

        return result.imageUrl;
      },
      getCreditCost: () => config.creditCost || 1,
    }),
    [config],
  );

  // Use orchestrator for generation
  const orchestrator = useGenerationOrchestrator(strategy, {
    userId: options?.userId,
    alertMessages: options?.alertMessages || DEFAULT_ALERT_MESSAGES,
    onCreditsExhausted: options?.onCreditsExhausted,
    onError: (error) => {
      config.onError?.(error.message, creationIdRef.current ?? undefined);
    },
  });

  const selectImage = useCallback(async () => {
    try {
      const uri = await onSelectImage();
      if (uri) {
        setImageUri(uri);
        setImageError(null);
        config.onImageSelect?.(uri);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setImageError(message);
    }
  }, [onSelectImage, config]);

  const process = useCallback(async () => {
    if (!imageUri) return;

    if (onBeforeProcess) {
      const canProceed = await onBeforeProcess();
      if (!canProceed) return;
    }

    const creationId = generateUUID();
    creationIdRef.current = creationId;

    config.onProcessingStart?.({ creationId, imageUri });

    try {
      const imageBase64 = await config.prepareImage(imageUri);

      const input: SingleImageInput = options?.buildInput
        ? { imageBase64, options: options.buildInput(imageBase64, rawConfig) }
        : { imageBase64 };

      await orchestrator.generate(input);
    } catch {
      // Error already handled by orchestrator
    }
  }, [imageUri, config, rawConfig, options, onBeforeProcess, orchestrator]);

  const save = useCallback(async () => {
    if (!orchestrator.result) return;

    try {
      await onSaveImage(orchestrator.result);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setImageError(message);
    }
  }, [orchestrator.result, onSaveImage]);

  const reset = useCallback(() => {
    setImageUri(null);
    setImageError(null);
    creationIdRef.current = null;
    orchestrator.reset();
  }, [orchestrator]);

  // Combine states for backward compatibility
  return {
    imageUri,
    processedUrl: orchestrator.result,
    isProcessing: orchestrator.isGenerating,
    progress: orchestrator.progress,
    error: orchestrator.error?.message || imageError,
    selectImage,
    process,
    save,
    reset,
  };
}
