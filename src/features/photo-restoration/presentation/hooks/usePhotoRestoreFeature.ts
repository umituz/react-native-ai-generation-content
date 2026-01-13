/**
 * usePhotoRestoreFeature Hook
 * Uses base single image hook for photo restoration
 * Uses centralized orchestrator for credit/error handling
 */

import {
  useSingleImageFeature,
  type BaseSingleImageHookReturn,
} from "../../../image-to-image";
import type { AlertMessages } from "../../../../presentation/hooks/generation";
import type { PhotoRestoreFeatureConfig } from "../../domain/types";

export interface UsePhotoRestoreFeatureProps {
  config: PhotoRestoreFeatureConfig;
  onSelectImage: () => Promise<string | null>;
  onSaveImage: (imageUrl: string) => Promise<void>;
  onBeforeProcess?: () => Promise<boolean>;
}

export interface UsePhotoRestoreFeatureOptions {
  /** Alert messages for error handling */
  alertMessages?: AlertMessages;
  /** User ID for credit operations */
  userId?: string;
  /** Callback when credits are exhausted */
  onCreditsExhausted?: () => void;
}

export interface UsePhotoRestoreFeatureReturn extends BaseSingleImageHookReturn {}

export function usePhotoRestoreFeature(
  props: UsePhotoRestoreFeatureProps,
  options?: UsePhotoRestoreFeatureOptions,
): UsePhotoRestoreFeatureReturn {
  const { config, onSelectImage, onSaveImage, onBeforeProcess } = props;

  // Cast config to any to bypass strict type checking while maintaining runtime behavior
  return useSingleImageFeature(
    { config: config as never, onSelectImage, onSaveImage, onBeforeProcess },
    {
      buildInput: (imageBase64) => ({ imageBase64 }),
      ...options,
    },
  );
}
