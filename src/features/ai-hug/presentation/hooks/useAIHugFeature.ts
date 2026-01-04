/**
 * useAIHugFeature Hook
 * Thin wrapper around useDualImageVideoFeature for ai-hug feature
 * DRY: Uses shared base hook for common logic
 */

import { useDualImageVideoFeature } from "../../../shared/dual-image-video";
import type {
  AIHugFeatureConfig,
  AIHugFeatureState,
} from "../../domain/types";

export interface UseAIHugFeatureProps {
  config: AIHugFeatureConfig;
  onSelectSourceImage: () => Promise<string | null>;
  onSelectTargetImage: () => Promise<string | null>;
  onSaveVideo: (videoUrl: string) => Promise<void>;
}

export interface UseAIHugFeatureReturn extends AIHugFeatureState {
  selectSourceImage: () => Promise<void>;
  selectTargetImage: () => Promise<void>;
  process: () => Promise<void>;
  save: () => Promise<void>;
  reset: () => void;
}

export function useAIHugFeature(props: UseAIHugFeatureProps): UseAIHugFeatureReturn {
  return useDualImageVideoFeature({
    featureType: "ai-hug",
    ...props,
  });
}
