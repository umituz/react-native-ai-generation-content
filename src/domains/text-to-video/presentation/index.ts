/**
 * Text-to-Video Presentation Index
 * Exports all presentation layer items (hooks and components)
 */

// =============================================================================
// HOOKS
// =============================================================================

export { useTextToVideoFeature } from "./hooks";
export type {
  UseTextToVideoFeatureProps,
  UseTextToVideoFeatureReturn,
  TextToVideoGenerateParams,
} from "./hooks";

export { useTextToVideoForm } from "./hooks";
export type {
  UseTextToVideoFormProps,
  UseTextToVideoFormReturn,
} from "./hooks";

// =============================================================================
// COMPONENTS
// =============================================================================

export {
  GenerationTabs,
  FrameSelector,
  OptionsPanel,
  HeroSection,
  HintCarousel,
} from "./components";
