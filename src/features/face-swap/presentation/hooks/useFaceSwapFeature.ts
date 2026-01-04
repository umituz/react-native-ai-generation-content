/**
 * useFaceSwapFeature Hook
 * Uses base dual image hook for face swap processing
 */

import {
  useDualImageFeature,
  type BaseDualImageHookReturn,
} from "../../../image-to-image";
import type { FaceSwapFeatureConfig, FaceSwapResult } from "../../domain/types";

export interface UseFaceSwapFeatureProps {
  config: FaceSwapFeatureConfig;
  onSelectSourceImage: () => Promise<string | null>;
  onSelectTargetImage: () => Promise<string | null>;
  onSaveImage: (imageUrl: string) => Promise<void>;
  onBeforeProcess?: () => Promise<boolean>;
}

export function useFaceSwapFeature(
  props: UseFaceSwapFeatureProps,
): BaseDualImageHookReturn {
  const { config, onSelectSourceImage, onSelectTargetImage, onSaveImage, onBeforeProcess } = props;

  return useDualImageFeature<FaceSwapFeatureConfig, FaceSwapResult>(
    { config, onSelectSourceImage, onSelectTargetImage, onSaveImage, onBeforeProcess },
    {
      buildInput: (sourceBase64, targetBase64, cfg) => ({
        imageBase64: sourceBase64,
        targetImageBase64: targetBase64,
        options: cfg.defaultOptions,
      }),
    },
  );
}
