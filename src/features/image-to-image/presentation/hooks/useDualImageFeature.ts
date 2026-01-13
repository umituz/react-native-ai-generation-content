/**
 * useDualImageFeature Hook Factory
 * Base hook for dual image processing features (e.g., face-swap)
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
  BaseDualImageHookProps,
  BaseDualImageHookReturn,
  DualImageConfig,
  BaseImageResult,
} from "../../domain/types";

export interface DualImageFeatureOptions<TConfig extends DualImageConfig> {
  buildInput?: (
    sourceBase64: string,
    targetBase64: string,
    config: TConfig,
  ) => Record<string, unknown>;
  /** Alert messages for error handling */
  alertMessages?: AlertMessages;
  /** User ID for credit operations */
  userId?: string;
  /** Callback when credits are exhausted */
  onCreditsExhausted?: () => void;
}

const DEFAULT_ALERT_MESSAGES: AlertMessages = {
  networkError: "No internet connection. Please check your network.",
  policyViolation: "Content not allowed. Please try different images.",
  saveFailed: "Failed to save result. Please try again.",
  creditFailed: "Credit operation failed. Please try again.",
  unknown: "An error occurred. Please try again.",
};

interface DualImageInput {
  sourceImageBase64: string;
  targetImageBase64: string;
  options?: Record<string, unknown>;
}

export function useDualImageFeature<
  TConfig extends DualImageConfig = DualImageConfig,
  TResult extends BaseImageResult = BaseImageResult,
>(
  props: BaseDualImageHookProps<TConfig>,
  options?: DualImageFeatureOptions<TConfig>,
): BaseDualImageHookReturn {
  const { config, onSelectSourceImage, onSelectTargetImage, onSaveImage, onBeforeProcess } = props;

  // Image selection state (separate from orchestrator state)
  const [sourceImageUri, setSourceImageUri] = useState<string | null>(null);
  const [targetImageUri, setTargetImageUri] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const creationIdRef = useRef<string | null>(null);

  // Create strategy for orchestrator
  const strategy: GenerationStrategy<DualImageInput, string> = useMemo(
    () => ({
      execute: async (input, onProgress) => {
        const executorInput = input.options
          ? { ...input.options }
          : { imageBase64: input.sourceImageBase64, targetImageBase64: input.targetImageBase64 };

        const result = await executeImageFeature(
          config.featureType,
          executorInput,
          { extractResult: config.extractResult, onProgress },
        );

        if (!result.success || !result.imageUrl) {
          throw new Error(result.error || "Processing failed");
        }

        // Notify completion with creationId
        const creationId = creationIdRef.current;
        if (creationId) {
          config.onProcessingComplete?.({ ...result, creationId } as unknown as TResult);
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

  const selectSourceImage = useCallback(async () => {
    try {
      const uri = await onSelectSourceImage();
      if (uri) {
        setSourceImageUri(uri);
        setImageError(null);
        config.onSourceImageSelect?.(uri);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setImageError(message);
    }
  }, [onSelectSourceImage, config]);

  const selectTargetImage = useCallback(async () => {
    try {
      const uri = await onSelectTargetImage();
      if (uri) {
        setTargetImageUri(uri);
        setImageError(null);
        config.onTargetImageSelect?.(uri);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setImageError(message);
    }
  }, [onSelectTargetImage, config]);

  const process = useCallback(async () => {
    if (!sourceImageUri || !targetImageUri) return;

    if (onBeforeProcess) {
      const canProceed = await onBeforeProcess();
      if (!canProceed) return;
    }

    const creationId = generateUUID();
    creationIdRef.current = creationId;

    config.onProcessingStart?.({
      creationId,
      sourceImageUri,
      targetImageUri,
    });

    try {
      const [sourceBase64, targetBase64] = await Promise.all([
        config.prepareImage(sourceImageUri),
        config.prepareImage(targetImageUri),
      ]);

      const input: DualImageInput = options?.buildInput
        ? {
            sourceImageBase64: sourceBase64,
            targetImageBase64: targetBase64,
            options: options.buildInput(sourceBase64, targetBase64, config),
          }
        : { sourceImageBase64: sourceBase64, targetImageBase64: targetBase64 };

      await orchestrator.generate(input);
    } catch (error) {
      // Error already handled by orchestrator
    }
  }, [sourceImageUri, targetImageUri, config, options, onBeforeProcess, orchestrator]);

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
    setSourceImageUri(null);
    setTargetImageUri(null);
    setImageError(null);
    creationIdRef.current = null;
    orchestrator.reset();
  }, [orchestrator]);

  // Combine states for backward compatibility
  return {
    sourceImageUri,
    targetImageUri,
    processedUrl: orchestrator.result,
    isProcessing: orchestrator.isGenerating,
    progress: orchestrator.progress,
    error: orchestrator.error?.message || imageError,
    selectSourceImage,
    selectTargetImage,
    process,
    save,
    reset,
  };
}
