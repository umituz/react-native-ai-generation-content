/**
 * useRemoveBackgroundFeature Hook
 * Uses base single image hook for background removal
 */

import { useSingleImageFeature, type BaseSingleImageHookReturn } from "../../../image-to-image";
import type { RemoveBackgroundFeatureConfig } from "../../domain/types";

export interface UseRemoveBackgroundFeatureProps {
  config: RemoveBackgroundFeatureConfig;
  onSelectImage: () => Promise<string | null>;
  onSaveImage: (imageUrl: string) => Promise<void>;
  onBeforeProcess?: () => Promise<boolean>;
}

export function useRemoveBackgroundFeature(props: UseRemoveBackgroundFeatureProps): BaseSingleImageHookReturn {
  const { config, onSelectImage, onSaveImage, onBeforeProcess } = props;

  return useSingleImageFeature<RemoveBackgroundFeatureConfig>(
    { config: config as never, onSelectImage, onSaveImage, onBeforeProcess },
    {
      buildInput: (imageBase64, cfg) => ({
        imageBase64,
        options: cfg.defaultOptions,
      }),
    },
  );
}
