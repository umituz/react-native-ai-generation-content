/**
 * Couple Future Feature
 * Identity-preserving image generation for couples using Nano Banana
 */

export { executeCoupleFuture } from "./infrastructure/executor";
export type {
  CoupleFutureInput,
  CoupleFutureConfig,
  CoupleFutureResult,
  NanoBananaAspectRatio,
  NanoBananaOutputFormat,
} from "./domain/types";
export { COUPLE_FUTURE_DEFAULTS } from "./domain/types";
