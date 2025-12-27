/**
 * Text-to-Voice Feature
 * Provider-agnostic text-to-voice generation feature
 */

// Domain Types
export type {
  TextToVoiceOptions,
  TextToVoiceRequest,
  TextToVoiceResult,
  TextToVoiceFeatureState,
  TextToVoiceTranslations,
  TextToVoiceInputBuilder,
  TextToVoiceResultExtractor,
  TextToVoiceFeatureConfig,
} from "./domain";

// Infrastructure Services
export { executeTextToVoice, hasTextToVoiceSupport } from "./infrastructure";
export type { ExecuteTextToVoiceOptions } from "./infrastructure";

// Presentation Hooks
export { useTextToVoiceFeature } from "./presentation";
export type {
  UseTextToVoiceFeatureProps,
  UseTextToVoiceFeatureReturn,
} from "./presentation";
