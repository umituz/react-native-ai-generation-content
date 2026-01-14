/**
 * useAnimeSelfieFeature Hook
 * Uses base single image hook for anime selfie transformation
 * Uses centralized orchestrator for credit/error handling
 */

import { useMemo } from "react";
import {
  useSingleImageFeature,
  type BaseSingleImageHookReturn,
} from "../../../image-to-image";
import type { AlertMessages } from "../../../../presentation/hooks/generation";
import { createAnimeSelfiePrompt } from "../../../../domains/prompts";
import type { AnimeSelfieFeatureConfig } from "../../domain/types";

export interface UseAnimeSelfieFeatureProps {
  config: AnimeSelfieFeatureConfig;
  onSelectImage: () => Promise<string | null>;
  onSaveImage: (imageUrl: string) => Promise<void>;
  onBeforeProcess?: () => Promise<boolean>;
}

export interface UseAnimeSelfieFeatureOptions {
  /** Alert messages for error handling */
  alertMessages?: AlertMessages;
  /** User ID for credit operations */
  userId?: string;
  /** Callback when credits are exhausted */
  onCreditsExhausted?: () => void;
}

export type UseAnimeSelfieFeatureReturn = BaseSingleImageHookReturn;

export function useAnimeSelfieFeature(
  props: UseAnimeSelfieFeatureProps,
  options?: UseAnimeSelfieFeatureOptions,
): UseAnimeSelfieFeatureReturn {
  const { config, onSelectImage, onSaveImage, onBeforeProcess } = props;

  const promptConfig = useMemo(
    () => createAnimeSelfiePrompt(config.defaultStyle),
    [config.defaultStyle],
  );

  // Cast config to any to bypass strict type checking while maintaining runtime behavior
  return useSingleImageFeature(
    { config: config as never, onSelectImage, onSaveImage, onBeforeProcess },
    {
      buildInput: (imageBase64) => ({
        imageBase64,
        prompt: promptConfig.prompt,
        options: {
          guidance_scale: promptConfig.guidance_scale,
        },
      }),
      ...options,
    },
  );
}
