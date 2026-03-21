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
  CreationData,
  GenerationStartData,
  GenerationTabsProps,
  FrameSelectorProps,
  OptionsPanelProps,
  HeroSectionProps,
  HintCarouselProps,
  HintItem,
  ExamplePromptsProps,
  ExamplePrompt,
} from "./domain/index";

export { INITIAL_FORM_STATE, INITIAL_GENERATION_STATE } from "./domain/index";

// Infrastructure Services
export { executeTextToVideo, hasTextToVideoSupport } from "./infrastructure/services";
export type { ExecuteTextToVideoOptions } from "./infrastructure/services";

// Presentation Hooks
export {
  useTextToVideoFeature,
  useTextToVideoForm,
} from "./presentation/index";

export type {
  UseTextToVideoFeatureProps,
  UseTextToVideoFeatureReturn,
  TextToVideoGenerateParams,
  UseTextToVideoFormProps,
  UseTextToVideoFormReturn,
} from "./presentation/index";

// Presentation Components
export {
  GenerationTabs,
  FrameSelector,
  OptionsPanel,
  HeroSection,
  HintCarousel,
} from "./presentation/index";
