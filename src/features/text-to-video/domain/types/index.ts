/**
 * Text-to-Video Domain Types
 * Single Responsibility: Export all domain types
 */

export type {
  TextToVideoOptions,
  TextToVideoRequest,
  TextToVideoResult,
  TextToVideoInputBuilder,
  TextToVideoResultExtractor,
} from "./request.types";

export type {
  TextToVideoFeatureState,
  TextToVideoFormState,
  TextToVideoGenerationState,
  FrameData,
} from "./state.types";

export { INITIAL_FORM_STATE, INITIAL_GENERATION_STATE } from "./state.types";

export type {
  TabConfig,
  VideoStyleOption,
  AspectRatioOption,
  VideoDurationOption,
  OptionToggleConfig,
  TextToVideoConfig,
  HeroConfig,
  ProgressConfig,
} from "./config.types";

export type {
  VideoModerationResult,
  ProjectData,
  CreationData,
  GenerationStartData,
  TextToVideoCallbacks,
  TextToVideoTranslations,
} from "./callback.types";

export type {
  GenerationTabsProps,
  FrameSelectorProps,
  OptionsPanelProps,
  HeroSectionProps,
  HintCarouselProps,
  HintItem,
  StyleSelectorProps,
  AspectRatioSelectorProps,
  DurationSelectorProps,
  GenerateButtonProps,
  ExamplePromptsProps,
  ExamplePrompt,
} from "./component.types";
