/**
 * useReplaceBackgroundFeature Hook
 * Uses base image with prompt hook for background replacement
 */

import { useState, useCallback, useMemo } from "react";
import {
  useImageWithPromptFeature,
  type ImageWithPromptHookReturn,
} from "../../../image-to-image";
import type {
  ReplaceBackgroundFeatureConfig,
  ReplaceBackgroundResult,
  ReplaceBackgroundMode,
} from "../../domain/types";

export interface UseReplaceBackgroundFeatureProps {
  config: ReplaceBackgroundFeatureConfig;
  onSelectImage: () => Promise<string | null>;
  onSaveImage: (imageUrl: string) => Promise<void>;
  onBeforeProcess?: () => Promise<boolean>;
}

export interface UseReplaceBackgroundFeatureReturn extends ImageWithPromptHookReturn {
  mode: ReplaceBackgroundMode;
  setMode: (mode: ReplaceBackgroundMode) => void;
}

export function useReplaceBackgroundFeature(
  props: UseReplaceBackgroundFeatureProps,
): UseReplaceBackgroundFeatureReturn {
  const { config, onSelectImage, onSaveImage, onBeforeProcess } = props;
  const [mode, setMode] = useState<ReplaceBackgroundMode>(config.defaultMode || "replace");

  const baseHook = useImageWithPromptFeature<ReplaceBackgroundFeatureConfig, ReplaceBackgroundResult>(
    { config, onSelectImage, onSaveImage, onBeforeProcess },
    {
      buildInput: (imageBase64, prompt) => ({
        imageBase64,
        prompt: prompt || undefined,
        options: { mode },
      }),
    },
  );

  const handleSetMode = useCallback((newMode: ReplaceBackgroundMode) => {
    setMode(newMode);
  }, []);

  return useMemo(
    () => ({
      ...baseHook,
      mode,
      setMode: handleSetMode,
    }),
    [baseHook, mode, handleSetMode],
  );
}
