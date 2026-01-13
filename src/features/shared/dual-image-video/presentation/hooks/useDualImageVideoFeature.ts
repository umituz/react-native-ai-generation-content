/**
 * useDualImageVideoFeature Hook
 * Base hook for video features that take two images (ai-hug, ai-kiss, etc.)
 * DRY: Consolidates common logic from useAIHugFeature and useAIKissFeature
 * Uses centralized orchestrator for credit/error handling
 */

import { useState, useCallback, useRef, useMemo } from "react";
import { executeVideoFeature } from "../../../../../infrastructure/services";
import { generateCreationId } from "../../../../../domains/creations/domain/utils";
import {
  useGenerationOrchestrator,
  type GenerationStrategy,
  type AlertMessages,
} from "../../../../../presentation/hooks/generation";
import type {
  UseDualImageVideoFeatureProps,
  UseDualImageVideoFeatureReturn,
} from "../../domain/types/dual-image-video.types";

export interface DualImageVideoFeatureOptions {
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

interface DualImageVideoInput {
  sourceImageBase64: string;
  targetImageBase64: string;
}

export function useDualImageVideoFeature(
  props: UseDualImageVideoFeatureProps,
  options?: DualImageVideoFeatureOptions,
): UseDualImageVideoFeatureReturn {
  const { featureType, config, onSelectSourceImage, onSelectTargetImage, onSaveVideo, onBeforeProcess } = props;

  // Image selection state (separate from orchestrator state)
  const [sourceImageUri, setSourceImageUri] = useState<string | null>(null);
  const [targetImageUri, setTargetImageUri] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const currentCreationIdRef = useRef<string | null>(null);

  // Create strategy for orchestrator
  const strategy: GenerationStrategy<DualImageVideoInput, string> = useMemo(
    () => ({
      execute: async (input, onProgress) => {
        const result = await executeVideoFeature(
          featureType,
          { sourceImageBase64: input.sourceImageBase64, targetImageBase64: input.targetImageBase64 },
          { extractResult: config.extractResult, onProgress },
        );

        if (!result.success || !result.videoUrl) {
          throw new Error(result.error || "Processing failed");
        }

        // Notify completion with creationId
        const creationId = currentCreationIdRef.current;
        if (creationId) {
          config.onProcessingComplete?.({ success: true, videoUrl: result.videoUrl, creationId });
        }

        return result.videoUrl;
      },
      getCreditCost: () => config.creditCost || 1,
    }),
    [featureType, config],
  );

  // Use orchestrator for generation
  const orchestrator = useGenerationOrchestrator(strategy, {
    userId: options?.userId,
    alertMessages: options?.alertMessages || DEFAULT_ALERT_MESSAGES,
    onCreditsExhausted: options?.onCreditsExhausted,
    onError: (error) => {
      config.onError?.(error.message, currentCreationIdRef.current ?? undefined);
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

    // Generate creationId for this processing session
    const creationId = generateCreationId();
    currentCreationIdRef.current = creationId;

    // Notify start with creationId for Firestore creation
    config.onProcessingStart?.({
      creationId,
      featureType,
      sourceImageUri,
      targetImageUri,
    });

    try {
      const [sourceImageBase64, targetImageBase64] = await Promise.all([
        config.prepareImage(sourceImageUri),
        config.prepareImage(targetImageUri),
      ]);

      await orchestrator.generate({ sourceImageBase64, targetImageBase64 });
    } catch (error) {
      // Error already handled by orchestrator
    }
  }, [sourceImageUri, targetImageUri, featureType, config, onBeforeProcess, orchestrator]);

  const save = useCallback(async () => {
    if (!orchestrator.result) return;

    try {
      await onSaveVideo(orchestrator.result);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setImageError(message);
    }
  }, [orchestrator.result, onSaveVideo]);

  const reset = useCallback(() => {
    setSourceImageUri(null);
    setTargetImageUri(null);
    setImageError(null);
    currentCreationIdRef.current = null;
    orchestrator.reset();
  }, [orchestrator]);

  // Combine states for backward compatibility
  return {
    sourceImageUri,
    targetImageUri,
    processedVideoUrl: orchestrator.result,
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
