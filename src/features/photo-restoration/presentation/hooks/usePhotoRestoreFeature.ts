/**
 * usePhotoRestoreFeature Hook
 * Uses base single image hook for photo restoration
 */

import { useSingleImageFeature, type BaseSingleImageHookReturn } from "../../../image-to-image";
import type { PhotoRestoreFeatureConfig, PhotoRestoreResult } from "../../domain/types";

export interface UsePhotoRestoreFeatureProps {
  config: PhotoRestoreFeatureConfig;
  onSelectImage: () => Promise<string | null>;
  onSaveImage: (imageUrl: string) => Promise<void>;
  onBeforeProcess?: () => Promise<boolean>;
}

export function usePhotoRestoreFeature(props: UsePhotoRestoreFeatureProps): BaseSingleImageHookReturn {
  const { config, onSelectImage, onSaveImage, onBeforeProcess } = props;

  return useSingleImageFeature<PhotoRestoreFeatureConfig>(
    { config: config as never, onSelectImage, onSaveImage, onBeforeProcess },
    { buildInput: (imageBase64) => ({ imageBase64 }) },
  );
}
