/**
 * Dual Image Video Feature (Shared)
 * Base infrastructure for video features using two source images
 */

export type {
  DualImageVideoFeatureState,
  DualImageVideoResult,
  DualImageVideoResultExtractor,
  DualImageVideoFeatureConfig,
  DualImageVideoTranslations,
  UseDualImageVideoFeatureProps,
  UseDualImageVideoFeatureReturn,
} from "./domain/types";

export { useDualImageVideoFeature } from "./presentation/hooks";
