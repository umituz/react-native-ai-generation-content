/**
 * useUpscaleFeature Hook
 * Uses base single image hook for image upscaling
 */

import { useSingleImageFeature, type BaseSingleImageHookReturn } from "../../../image-to-image";
import type { UpscaleFeatureConfig, UpscaleResult } from "../../domain/types";

export interface UseUpscaleFeatureProps {
  config: UpscaleFeatureConfig;
  onSelectImage: () => Promise<string | null>;
  onSaveImage: (imageUrl: string) => Promise<void>;
  onBeforeProcess?: () => Promise<boolean>;
}

export function useUpscaleFeature(props: UseUpscaleFeatureProps): BaseSingleImageHookReturn {
  const { config, onSelectImage, onSaveImage, onBeforeProcess } = props;

  return useSingleImageFeature<UpscaleFeatureConfig>(
    { config: config as never, onSelectImage, onSaveImage, onBeforeProcess },
    {
      buildInput: (imageBase64, cfg) => ({
        imageBase64,
        options: { scaleFactor: cfg.defaultScaleFactor || 2 },
      }),
    },
  );
}
