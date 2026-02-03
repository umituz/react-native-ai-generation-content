/**
 * Result Preview Domain Export
 * Reusable result preview components for AI generation
 */

// Components
export {
  ResultPreviewScreen,
  ResultImageCard,
  ResultActionBar,
  RecentCreationsSection,
  GenerationErrorScreen,
  StarRatingPicker,
} from "./presentation/components";
export type {
  StarRatingPickerProps,
  GenerationErrorTranslations,
  GenerationErrorConfig,
  GenerationErrorScreenProps,
} from "./presentation/components";

// Hooks
export { useResultActions } from "./presentation/hooks";

// Types
export type {
  ResultData,
  ResultActionsCallbacks,
  ResultDisplayState,
  ResultImageCardProps,
  ResultActionBarProps,
  RecentCreation,
  ResultPreviewScreenProps,
  ResultPreviewTranslations,
  UseResultActionsOptions,
  UseResultActionsReturn,
} from "./presentation/types";
