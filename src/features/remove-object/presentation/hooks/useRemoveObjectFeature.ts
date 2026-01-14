/**
 * useRemoveObjectFeature Hook
 * Manages remove object feature state and actions
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
  RemoveObjectFeatureConfig,
  RemoveObjectResult,
} from "../../domain/types";

export interface UseRemoveObjectFeatureProps {
  config: RemoveObjectFeatureConfig;
  onSelectImage: () => Promise<string | null>;
  onSelectMask?: () => Promise<string | null>;
  onSaveImage: (imageUrl: string) => Promise<void>;
  onBeforeProcess?: () => Promise<boolean>;
}

export interface UseRemoveObjectFeatureOptions {
  /** Alert messages for error handling */
  alertMessages?: AlertMessages;
  /** User ID for credit operations */
  userId?: string;
  /** Callback when credits are exhausted */
  onCreditsExhausted?: () => void;
}

export interface UseRemoveObjectFeatureReturn {
  imageUri: string | null;
  maskUri: string | null;
  prompt: string;
  processedUrl: string | null;
  isProcessing: boolean;
  progress: number;
  error: string | null;
  selectImage: () => Promise<void>;
  selectMask: () => Promise<void>;
  setPrompt: (prompt: string) => void;
  process: () => Promise<void>;
  save: () => Promise<void>;
  reset: () => void;
}

const DEFAULT_ALERT_MESSAGES: AlertMessages = {
  networkError: "No internet connection. Please check your network.",
  policyViolation: "Content not allowed. Please try a different image.",
  saveFailed: "Failed to save result. Please try again.",
  creditFailed: "Credit operation failed. Please try again.",
  unknown: "An error occurred. Please try again.",
};

interface RemoveObjectInput {
  imageBase64: string;
  maskBase64?: string;
  prompt?: string;
}

export function useRemoveObjectFeature(
  props: UseRemoveObjectFeatureProps,
  options?: UseRemoveObjectFeatureOptions,
): UseRemoveObjectFeatureReturn {
  const { config, onSelectImage, onSelectMask, onSaveImage, onBeforeProcess } = props;

  // UI state (separate from orchestrator state)
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [maskUri, setMaskUri] = useState<string | null>(null);
  const [prompt, setPromptState] = useState("");
  const [imageError, setImageError] = useState<string | null>(null);
  const creationIdRef = useRef<string | null>(null);

  // Create strategy for orchestrator
  const strategy: GenerationStrategy<RemoveObjectInput, string> = useMemo(
    () => ({
      execute: async (input, onProgress) => {
        const result = await executeImageFeature(
          "remove-object",
          {
            imageBase64: input.imageBase64,
            targetImageBase64: input.maskBase64,
            prompt: input.prompt,
          },
          { extractResult: config.extractResult, onProgress },
        );

        if (!result.success || !result.imageUrl) {
          throw new Error(result.error || "Processing failed");
        }

        // Notify completion with creationId
        const creationId = creationIdRef.current;
        if (creationId) {
          config.onProcessingComplete?.({ ...result, creationId } as RemoveObjectResult & { creationId?: string });
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

  const selectMask = useCallback(async () => {
    if (!onSelectMask) return;

    try {
      const uri = await onSelectMask();
      if (uri) {
        setMaskUri(uri);
        setImageError(null);
        config.onMaskSelect?.(uri);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setImageError(message);
    }
  }, [onSelectMask, config]);

  const setPrompt = useCallback((newPrompt: string) => {
    setPromptState(newPrompt);
    setImageError(null);
  }, []);

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
      const maskBase64 = maskUri
        ? await config.prepareImage(maskUri)
        : undefined;

      await orchestrator.generate({
        imageBase64,
        maskBase64,
        prompt: prompt || undefined,
      });
    } catch {
      // Error already handled by orchestrator
    }
  }, [imageUri, maskUri, prompt, config, onBeforeProcess, orchestrator]);

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
    setMaskUri(null);
    setPromptState("");
    setImageError(null);
    creationIdRef.current = null;
    orchestrator.reset();
  }, [orchestrator]);

  // Combine states for backward compatibility
  return {
    imageUri,
    maskUri,
    prompt,
    processedUrl: orchestrator.result,
    isProcessing: orchestrator.isGenerating,
    progress: orchestrator.progress,
    error: orchestrator.error?.message || imageError,
    selectImage,
    selectMask,
    setPrompt,
    process,
    save,
    reset,
  };
}
