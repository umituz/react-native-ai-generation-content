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
  defaults: Required<TextToImageFormDefaults>;
}

export interface UseFormStateReturn {
  state: TextToImageFormState;
  actions: TextToImageFormActions;
}

function validateDefaults(defaults: TextToImageFormDefaults): asserts defaults is Required<TextToImageFormDefaults> {
  if (!defaults.aspectRatio) {
    throw new Error("useFormState: defaults.aspectRatio is required");
  }
  if (!defaults.size) {
    throw new Error("useFormState: defaults.size is required");
  }
  if (!defaults.numImages) {
    throw new Error("useFormState: defaults.numImages is required");
  }
  if (defaults.guidanceScale === undefined) {
    throw new Error("useFormState: defaults.guidanceScale is required");
  }
  if (!defaults.outputFormat) {
    throw new Error("useFormState: defaults.outputFormat is required");
  }
  if (!defaults.selectedStyle) {
    throw new Error("useFormState: defaults.selectedStyle is required");
  }
}

export function useFormState(options: UseFormStateOptions): UseFormStateReturn {
  const defaults = useMemo(() => {
    validateDefaults(options.defaults);
    return options.defaults;
  }, [options.defaults]);

  const [prompt, setPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(defaults.aspectRatio);
  const [size, setSize] = useState<ImageSize>(defaults.size);
  const [numImages, setNumImages] = useState<NumImages>(defaults.numImages);
  const [negativePrompt, setNegativePrompt] = useState("");
  const [guidanceScale, setGuidanceScale] = useState(defaults.guidanceScale);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>(defaults.outputFormat);
  const [selectedStyle, setSelectedStyle] = useState(defaults.selectedStyle);

  const reset = useCallback(() => {
    setPrompt("");
    setAspectRatio(defaults.aspectRatio);
    setSize(defaults.size);
    setNumImages(defaults.numImages);
    setNegativePrompt("");
    setGuidanceScale(defaults.guidanceScale);
    setSelectedModel(null);
    setOutputFormat(defaults.outputFormat);
    setSelectedStyle(defaults.selectedStyle);
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
