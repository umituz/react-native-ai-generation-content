/**
 * useImageWithPromptFeature Hook Factory
 * Base hook for image + prompt processing features (e.g., replace-background)
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
  BaseImageWithPromptState,
  SingleImageConfig,
  BaseImageResult,
} from "../../domain/types";

export interface ImageWithPromptConfig<TResult extends BaseImageResult = BaseImageResult>
  extends SingleImageConfig<TResult> {
  defaultPrompt?: string;
  onPromptChange?: (prompt: string) => void;
}

export interface ImageWithPromptHookProps<
  TConfig extends ImageWithPromptConfig = ImageWithPromptConfig,
> {
  config: TConfig;
  onSelectImage: () => Promise<string | null>;
  onSaveImage: (imageUrl: string) => Promise<void>;
  /** Called before processing starts. Return false to cancel. */
  onBeforeProcess?: () => Promise<boolean>;
}

export interface ImageWithPromptHookReturn extends BaseImageWithPromptState {
  selectImage: () => Promise<void>;
  setPrompt: (prompt: string) => void;
  process: () => Promise<void>;
  save: () => Promise<void>;
  reset: () => void;
}

export interface ImageWithPromptOptions {
  buildInput?: (
    imageBase64: string,
    prompt: string,
    config: ImageWithPromptConfig,
  ) => Record<string, unknown>;
  promptRequired?: boolean;
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

interface ImageWithPromptInput {
  imageBase64: string;
  prompt: string;
  options?: Record<string, unknown>;
}

export function useImageWithPromptFeature<
  TConfig extends ImageWithPromptConfig = ImageWithPromptConfig,
  TResult extends BaseImageResult = BaseImageResult,
>(
  props: ImageWithPromptHookProps<TConfig>,
  options?: ImageWithPromptOptions,
): ImageWithPromptHookReturn {
  const { config, onSelectImage, onSaveImage, onBeforeProcess } = props;

  // Image and prompt state (separate from orchestrator state)
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [prompt, setPromptState] = useState(config.defaultPrompt || "");
  const [imageError, setImageError] = useState<string | null>(null);
  const creationIdRef = useRef<string | null>(null);

  // Create strategy for orchestrator
  const strategy: GenerationStrategy<ImageWithPromptInput, string> = useMemo(
    () => ({
      execute: async (input, onProgress) => {
        const executorInput = input.options
          ? { ...input.options }
          : { imageBase64: input.imageBase64, prompt: input.prompt };

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

  const setPrompt = useCallback(
    (newPrompt: string) => {
      setPromptState(newPrompt);
      setImageError(null);
      config.onPromptChange?.(newPrompt);
    },
    [config],
  );

  const process = useCallback(async () => {
    if (!imageUri) return;

    if (onBeforeProcess) {
      const canProceed = await onBeforeProcess();
      if (!canProceed) return;
    }

    if (options?.promptRequired && !prompt.trim()) {
      const error = "Prompt is required";
      setImageError(error);
      config.onError?.(error, creationIdRef.current ?? undefined);
      return;
    }

    const creationId = generateUUID();
    creationIdRef.current = creationId;

    config.onProcessingStart?.({ creationId, imageUri });

    try {
      const imageBase64 = await config.prepareImage(imageUri);

      const input: ImageWithPromptInput = options?.buildInput
        ? {
            imageBase64,
            prompt,
            options: options.buildInput(imageBase64, prompt, config),
          }
        : { imageBase64, prompt };

      await orchestrator.generate(input);
    } catch (error) {
      // Error already handled by orchestrator
    }
  }, [imageUri, prompt, config, options, onBeforeProcess, orchestrator]);

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
    setPromptState(config.defaultPrompt || "");
    setImageError(null);
    creationIdRef.current = null;
    orchestrator.reset();
  }, [config.defaultPrompt, orchestrator]);

  // Combine states for backward compatibility
  return {
    imageUri,
    prompt,
    processedUrl: orchestrator.result,
    isProcessing: orchestrator.isGenerating,
    progress: orchestrator.progress,
    error: orchestrator.error?.message || imageError,
    selectImage,
    setPrompt,
    process,
    save,
    reset,
  };
}
