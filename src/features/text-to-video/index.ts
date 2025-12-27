/**
 * Text-to-Video Feature
 * Provider-agnostic text-to-video generation for 100+ apps
 */

// Domain Types
export type {
  TextToVideoOptions,
  TextToVideoRequest,
  TextToVideoResult,
  TextToVideoFeatureState,
  TextToVideoFormState,
  TextToVideoGenerationState,
  TextToVideoTranslations,
  TextToVideoInputBuilder,
  TextToVideoResultExtractor,
  TextToVideoConfig,
  TextToVideoCallbacks,
  TabConfig,
  VideoStyleOption,
  AspectRatioOption,
  VideoDurationOption,
  OptionToggleConfig,
  HeroConfig,
  ProgressConfig,
  FrameData,
  VideoModerationResult,
  ProjectData,
  GenerationTabsProps,
  FrameSelectorProps,
  OptionsPanelProps,
  HeroSectionProps,
  HintCarouselProps,
  HintItem,
  ExamplePromptsProps,
  ExamplePrompt,
} from "./domain";

export { INITIAL_FORM_STATE, INITIAL_GENERATION_STATE } from "./domain";

// Infrastructure Services
export { executeTextToVideo, hasTextToVideoSupport } from "./infrastructure";
export type { ExecuteTextToVideoOptions } from "./infrastructure";

// Presentation Hooks
export {
  useTextToVideoFeature,
  useTextToVideoForm,
} from "./presentation";

export type {
  UseTextToVideoFeatureProps,
  UseTextToVideoFeatureReturn,
  UseTextToVideoFormProps,
  UseTextToVideoFormReturn,
} from "./presentation";

// Presentation Components
export {
  GenerationTabs,
  FrameSelector,
  OptionsPanel,
  HeroSection,
  HintCarousel,
} from "./presentation";
