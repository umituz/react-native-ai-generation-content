/**
 * Text-to-Voice Domain Types
 * Barrel export for all types
 */

export type {
  TextToVoiceOptions,
  TextToVoiceRequest,
  TextToVoiceResult,
  TextToVoiceGenerationState,
  VoiceGeneration,
} from "./generation.types";

export type {
  TextToVoiceFormState,
  TextToVoiceFormSetters,
  TextToVoiceFormReturn,
  TextToVoiceFormConfig,
} from "./form.types";

export type {
  TextToVoiceTextInputProps,
  TextToVoiceOptionalInputProps,
  TextToVoiceExamplePromptsProps,
  TextToVoiceGenerateButtonProps,
  TextToVoiceAudioPlayerProps,
  TextToVoiceErrorMessageProps,
  TextToVoiceHeaderProps,
  TextToVoiceScreenConfig,
  TextToVoiceTranslationKeys,
} from "./component.types";

export type {
  TextToVoiceInputBuilder,
  TextToVoiceResultExtractor,
  TextToVoiceFeatureConfig,
  TextToVoiceExecuteOptions,
} from "./config.types";
