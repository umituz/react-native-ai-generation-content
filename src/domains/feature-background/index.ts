/**
 * @umituz/react-native-ai-feature-background
 * AI-powered background replacement and removal feature for React Native
 *
 * Usage:
 *   import {
 *     BackgroundFeature,
 *     useBackgroundFeature,
 *     ImagePicker,
 *     ComparisonSlider,
 *     ModeSelector,
 *   } from '@umituz/react-native-ai-feature-background';
 */

// =============================================================================
// DOMAIN LAYER - Types & Interfaces
// =============================================================================

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

// =============================================================================
// INFRASTRUCTURE LAYER - Constants
// =============================================================================

export { DEFAULT_SAMPLE_PROMPTS } from "./infrastructure/constants";

// =============================================================================
// PRESENTATION LAYER - Components
// =============================================================================

export {
    BackgroundFeature,
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

export type { BackgroundFeatureProps } from "./presentation/components";

// =============================================================================
// PRESENTATION LAYER - Hooks
// =============================================================================

export { useBackgroundFeature } from "./presentation/hooks";

export type { UseBackgroundFeatureReturn } from "./presentation/hooks";
