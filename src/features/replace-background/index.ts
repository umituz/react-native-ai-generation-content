/**
 * @umituz/react-native-ai-feature-background
 * AI-powered background replacement and removal feature for React Native
 *
 * Usage:
 *   import {
 *     BackgroundFeature,
 *     useBackgroundFeature,
 *     useReplaceBackgroundFeature,
 *     ImagePicker,
 *     ComparisonSlider,
 *     ModeSelector,
 *   } from '@umituz/react-native-ai-feature-background';
 */

// =============================================================================
// DOMAIN LAYER - Types & Interfaces (Legacy)
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
// DOMAIN LAYER - New Provider-Agnostic Types
// =============================================================================

export type {
    ReplaceBackgroundMode,
    ReplaceBackgroundOptions,
    ReplaceBackgroundRequest,
    ReplaceBackgroundResult,
    ReplaceBackgroundFeatureState,
    ReplaceBackgroundTranslations,
    ReplaceBackgroundFeatureConfig,
    ReplaceBackgroundInputBuilder,
    ReplaceBackgroundResultExtractor,
} from "./domain/types";

// =============================================================================
// INFRASTRUCTURE LAYER - Constants
// =============================================================================

export { DEFAULT_SAMPLE_PROMPTS } from "./infrastructure/constants";

// =============================================================================
// INFRASTRUCTURE LAYER - Services
// =============================================================================

export { executeReplaceBackground, hasReplaceBackgroundSupport } from "./infrastructure";
export type { ExecuteReplaceBackgroundOptions } from "./infrastructure";

// =============================================================================
// PRESENTATION LAYER - Components
// =============================================================================

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

export type { BackgroundFeatureProps, ReplaceBackgroundFeatureProps } from "./presentation/components";

// =============================================================================
// PRESENTATION LAYER - Hooks
// =============================================================================

export { useBackgroundFeature, useReplaceBackgroundFeature } from "./presentation/hooks";

export type {
    UseBackgroundFeatureReturn,
    UseReplaceBackgroundFeatureProps,
    UseReplaceBackgroundFeatureReturn,
} from "./presentation/hooks";
