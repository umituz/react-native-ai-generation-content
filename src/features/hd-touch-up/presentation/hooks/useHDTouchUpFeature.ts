/**
 * useHDTouchUpFeature Hook
 * Uses base single image hook for HD touch up
 */

import { useSingleImageFeature, type BaseSingleImageHookReturn } from "../../../image-to-image";
import type { HDTouchUpFeatureConfig } from "../../domain/types";

export interface UseHDTouchUpFeatureProps {
  config: HDTouchUpFeatureConfig;
  onSelectImage: () => Promise<string | null>;
  onSaveImage: (imageUrl: string) => Promise<void>;
  onBeforeProcess?: () => Promise<boolean>;
}

export function useHDTouchUpFeature(props: UseHDTouchUpFeatureProps): BaseSingleImageHookReturn {
  const { config, onSelectImage, onSaveImage, onBeforeProcess } = props;

  return useSingleImageFeature<HDTouchUpFeatureConfig>(
    { config: config as never, onSelectImage, onSaveImage, onBeforeProcess },
    { buildInput: (imageBase64) => ({ imageBase64 }) },
  );
}
