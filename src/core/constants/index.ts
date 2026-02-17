/**
 * AI Generation Constants
 * Generic constants reusable across any AI generation app
 *
 * Note: AspectRatio, StyleOption, DurationOption, AnimationStyle, VideoDuration
 * already exist in the feature domains with their own names.
 * Here we export the raw config constants (not UI-specific types).
 */

// Video resolution options
export {
  VIDEO_RESOLUTION,
  VIDEO_RESOLUTION_OPTIONS,
  DEFAULT_MOTION_STRENGTH,
  DEFAULT_GUIDANCE_SCALE,
} from "./video.constants";
export type { VideoResolution } from "./video.constants";

// Video duration options
export {
  VIDEO_DURATION,
  VIDEO_DURATION_OPTIONS,
  VIDEO_DURATION_OPTIONS_WITH_LABELS,
  VIDEO_ASPECT_RATIO,
  VIDEO_ASPECT_RATIO_OPTIONS,
} from "./video.constants";
export type { VideoAspectRatio } from "./video.constants";

// Image constants
export {
  IMAGE_SIZE,
  DEFAULT_NUM_IMAGES,
  DEFAULT_IMAGE_GUIDANCE_SCALE,
} from "./image.constants";

// Aspect ratio config
export { ASPECT_RATIO, DEFAULT_IMAGE_SIZES } from "./aspect-ratio.constants";

// Status constants
export { FAL_AI_STATUS, CREATION_STATUS, PROVIDER } from "./status.constants";

// Validation limits
export { VALIDATION_LIMITS } from "./validation.constants";

// Polling config
export { POLLING_CONFIG } from "./polling.constants";

// Animation style options
export { ANIMATION_STYLE } from "./animation.constants";
