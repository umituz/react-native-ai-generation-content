/**
 * useAIKissFeature Hook
 * Thin wrapper around useDualImageVideoFeature for ai-kiss feature
 * DRY: Uses shared base hook for common logic
 */

import { useDualImageVideoFeature } from "../../../shared/dual-image-video";
import type {
  AIKissFeatureConfig,
  AIKissFeatureState,
} from "../../domain/types";

export interface UseAIKissFeatureProps {
  config: AIKissFeatureConfig;
  onSelectSourceImage: () => Promise<string | null>;
  onSelectTargetImage: () => Promise<string | null>;
  onSaveVideo: (videoUrl: string) => Promise<void>;
}

export interface UseAIKissFeatureReturn extends AIKissFeatureState {
  selectSourceImage: () => Promise<void>;
  selectTargetImage: () => Promise<void>;
  process: () => Promise<void>;
  save: () => Promise<void>;
  reset: () => void;
}

export function useAIKissFeature(props: UseAIKissFeatureProps): UseAIKissFeatureReturn {
  return useDualImageVideoFeature({
    featureType: "ai-kiss",
    ...props,
  });
}
