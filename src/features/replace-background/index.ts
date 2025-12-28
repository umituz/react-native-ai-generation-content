/**
 * Replace Background Feature
 * AI-powered background replacement and removal feature for React Native
 */

// Domain Types - Legacy
export type {
  BackgroundProcessRequest,
  BackgroundProcessResult,
  BackgroundFeatureState,
  SamplePrompt,
  StudioMode,
  StudioModeConfig,
  ComparisonState,
  ImagePickerProps,
  PromptInputProps,
  GenerateButtonProps,
  ResultDisplayProps,
  ErrorDisplayProps,
  ProcessingModalProps,
  FeatureHeaderProps,
  ModeSelectorProps,
  ComparisonSliderProps,
  ProcessRequestParams,
  BackgroundFeatureConfig,
  UseBackgroundFeatureConfig,
} from "./domain/entities";

// Domain Types - Provider-Agnostic
export type {
  ReplaceBackgroundMode,
  ReplaceBackgroundOptions,
  ReplaceBackgroundRequest,
  ReplaceBackgroundResult,
  ReplaceBackgroundFeatureState,
  ReplaceBackgroundTranslations,
  ReplaceBackgroundFeatureConfig,
  ReplaceBackgroundResultExtractor,
} from "./domain/types";

// Constants
export { DEFAULT_SAMPLE_PROMPTS } from "./infrastructure/constants";

// Presentation Components
export {
  BackgroundFeature,
  ReplaceBackgroundFeature,
  ImagePicker,
  PromptInput,
  GenerateButton,
  ResultDisplay,
  ErrorDisplay,
  ProcessingModal,
  FeatureHeader,
  ComparisonSlider,
  ModeSelector,
} from "./presentation/components";

export type {
  BackgroundFeatureProps,
  ReplaceBackgroundFeatureProps,
} from "./presentation/components";

// Presentation Hooks
export {
  useBackgroundFeature,
  useReplaceBackgroundFeature,
} from "./presentation/hooks";

export type {
  UseBackgroundFeatureReturn,
  UseReplaceBackgroundFeatureProps,
  UseReplaceBackgroundFeatureReturn,
} from "./presentation/hooks";
