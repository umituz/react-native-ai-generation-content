/**
 * useImageWithPromptFeature Hook Factory
 * Base hook for image + prompt processing features (e.g., replace-background)
 */

import { useState, useCallback } from "react";
import { executeImageFeature } from "../../../../infrastructure/services";
import type {
  BaseImageWithPromptState,
  SingleImageConfig,
  BaseImageResult,
} from "../../domain/types";

const INITIAL_STATE: BaseImageWithPromptState = {
  imageUri: null,
  prompt: "",
  processedUrl: null,
  isProcessing: false,
  progress: 0,
  error: null,
};

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
}

export function useImageWithPromptFeature<
  TConfig extends ImageWithPromptConfig = ImageWithPromptConfig,
  TResult extends BaseImageResult = BaseImageResult,
>(
  props: ImageWithPromptHookProps<TConfig>,
  options?: ImageWithPromptOptions,
): ImageWithPromptHookReturn {
  const { config, onSelectImage, onSaveImage, onBeforeProcess } = props;
  const [state, setState] = useState<BaseImageWithPromptState>({
    ...INITIAL_STATE,
    prompt: config.defaultPrompt || "",
  });

  const selectImage = useCallback(async () => {
    try {
      const uri = await onSelectImage();
      if (uri) {
        setState((prev) => ({ ...prev, imageUri: uri, error: null }));
        config.onImageSelect?.(uri);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setState((prev) => ({ ...prev, error: message }));
    }
  }, [onSelectImage, config]);

  const setPrompt = useCallback(
    (prompt: string) => {
      setState((prev) => ({ ...prev, prompt, error: null }));
      config.onPromptChange?.(prompt);
    },
    [config],
  );

  const handleProgress = useCallback((progress: number) => {
    setState((prev) => ({ ...prev, progress }));
  }, []);

  const process = useCallback(async () => {
    if (!state.imageUri) return;

    // Check if processing is allowed (credit check, etc.)
    if (onBeforeProcess) {
      const canProceed = await onBeforeProcess();
      if (!canProceed) return;
    }

    if (options?.promptRequired && !state.prompt.trim()) {
      const error = "Prompt is required";
      setState((prev) => ({ ...prev, error }));
      config.onError?.(error);
      return;
    }

    setState((prev) => ({
      ...prev,
      isProcessing: true,
      progress: 0,
      error: null,
    }));

    config.onProcessingStart?.();

    try {
      const imageBase64 = await config.prepareImage(state.imageUri);

      const input = options?.buildInput
        ? options.buildInput(imageBase64, state.prompt, config)
        : { imageBase64, prompt: state.prompt };

      const result = await executeImageFeature(
        config.featureType,
        input,
        { extractResult: config.extractResult, onProgress: handleProgress },
      );

      if (result.success && result.imageUrl) {
        setState((prev) => ({
          ...prev,
          isProcessing: false,
          processedUrl: result.imageUrl!,
          progress: 100,
        }));
        config.onProcessingComplete?.(result as TResult);
      } else {
        const errorMessage = result.error || "Processing failed";
        setState((prev) => ({
          ...prev,
          isProcessing: false,
          error: errorMessage,
          progress: 0,
        }));
        config.onError?.(errorMessage);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setState((prev) => ({
        ...prev,
        isProcessing: false,
        error: message,
        progress: 0,
      }));
      config.onError?.(message);
    }
  }, [state.imageUri, state.prompt, config, options, handleProgress, onBeforeProcess]);

  const save = useCallback(async () => {
    if (!state.processedUrl) return;

    try {
      await onSaveImage(state.processedUrl);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setState((prev) => ({ ...prev, error: message }));
    }
  }, [state.processedUrl, onSaveImage]);

  const reset = useCallback(() => {
    setState({
      ...INITIAL_STATE,
      prompt: config.defaultPrompt || "",
    });
  }, [config.defaultPrompt]);

  return {
    ...state,
    selectImage,
    setPrompt,
    process,
    save,
    reset,
  };
}
