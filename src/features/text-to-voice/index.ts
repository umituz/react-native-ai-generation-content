/**
 * Text-to-Voice Feature
 * Provider-agnostic text-to-voice generation feature
 */

// Domain Types
export type {
  TextToVoiceOptions,
  TextToVoiceRequest,
  TextToVoiceResult,
  TextToVoiceGenerationState,
  VoiceGeneration,
  TextToVoiceFormState,
  TextToVoiceFormSetters,
  TextToVoiceFormReturn,
  TextToVoiceFormConfig,
  TextToVoiceTextInputProps,
  TextToVoiceOptionalInputProps,
  TextToVoiceExamplePromptsProps,
  TextToVoiceGenerateButtonProps,
  TextToVoiceAudioPlayerProps,
  TextToVoiceErrorMessageProps,
  TextToVoiceHeaderProps,
  TextToVoiceScreenConfig,
  TextToVoiceTranslationKeys,
  TextToVoiceInputBuilder,
  TextToVoiceResultExtractor,
  TextToVoiceFeatureConfig,
  TextToVoiceExecuteOptions,
} from "./domain";

// Infrastructure Services
export { executeTextToVoice, hasTextToVoiceSupport } from "./infrastructure";

// Presentation Hooks
export {
  useTextToVoiceForm,
  useTextToVoiceGeneration,
} from "./presentation";

export type {
  UseTextToVoiceGenerationProps,
  UseTextToVoiceGenerationReturn,
} from "./presentation";

// Presentation Components
export {
  TextToVoiceTextInput,
  TextToVoiceOptionalInput,
  TextToVoiceExamplePrompts,
  TextToVoiceGenerateButton,
  TextToVoiceAudioPlayer,
  TextToVoiceErrorMessage,
  TextToVoiceHeader,
} from "./presentation";
