/**
 * Text-to-Image Form State Hook
 * Manages form state for text-to-image generation
 */

import { useState, useCallback, useMemo } from "react";
import type {
  AspectRatio,
  ImageSize,
  NumImages,
  OutputFormat,
  TextToImageFormState,
  TextToImageFormActions,
  TextToImageFormDefaults,
} from "../../domain/types/form.types";
import { DEFAULT_FORM_VALUES } from "../../domain/constants/options.constants";

export interface UseFormStateOptions {
  defaults?: TextToImageFormDefaults;
}

export interface UseFormStateReturn {
  state: TextToImageFormState;
  actions: TextToImageFormActions;
}

export function useFormState(options?: UseFormStateOptions): UseFormStateReturn {
  const defaults = useMemo(
    () => ({ ...DEFAULT_FORM_VALUES, ...options?.defaults }),
    [options?.defaults]
  );

  const [prompt, setPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(
    defaults.aspectRatio ?? "9:16"
  );
  const [size, setSize] = useState<ImageSize>(defaults.size ?? "512x512");
  const [numImages, setNumImages] = useState<NumImages>(defaults.numImages ?? 1);
  const [negativePrompt, setNegativePrompt] = useState("");
  const [guidanceScale, setGuidanceScale] = useState(defaults.guidanceScale ?? 7.5);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>(
    defaults.outputFormat ?? "png"
  );
  const [selectedStyle, setSelectedStyle] = useState(
    defaults.selectedStyle ?? "realistic"
  );

  const reset = useCallback(() => {
    setPrompt("");
    setAspectRatio(defaults.aspectRatio ?? "9:16");
    setSize(defaults.size ?? "512x512");
    setNumImages(defaults.numImages ?? 1);
    setNegativePrompt("");
    setGuidanceScale(defaults.guidanceScale ?? 7.5);
    setSelectedModel(null);
    setOutputFormat(defaults.outputFormat ?? "png");
    setSelectedStyle(defaults.selectedStyle ?? "realistic");
  }, [defaults]);

  const state: TextToImageFormState = useMemo(
    () => ({
      prompt,
      aspectRatio,
      size,
      numImages,
      negativePrompt,
      guidanceScale,
      selectedModel,
      outputFormat,
      selectedStyle,
    }),
    [
      prompt,
      aspectRatio,
      size,
      numImages,
      negativePrompt,
      guidanceScale,
      selectedModel,
      outputFormat,
      selectedStyle,
    ]
  );

  const actions: TextToImageFormActions = useMemo(
    () => ({
      setPrompt,
      setAspectRatio,
      setSize,
      setNumImages,
      setNegativePrompt,
      setGuidanceScale,
      setSelectedModel,
      setOutputFormat,
      setSelectedStyle,
      reset,
    }),
    [reset]
  );

  return { state, actions };
}
