/**
 * Feature Layout Types
 * Central index for all layout types
 */

// Re-export all partial types
export type {
  ModalTranslations,
  BaseLayoutTranslations,
  PhotoUploadTranslations,
} from "./translations";

export type {
  SingleImageInputRenderProps,
  DualImageInputRenderProps,
  SingleImageWithPromptInputRenderProps,
} from "./input-props";

export type { ResultRenderProps, CustomResultRenderProps } from "./result-props";

export type {
  DualImageVideoFeatureState,
  SingleImageWithPromptFeatureState,
} from "./feature-states";

export type {
  SingleImageFeatureLayoutProps,
  DualImageFeatureLayoutProps,
  DualImageVideoFeatureLayoutProps,
  SingleImageWithPromptFeatureLayoutProps,
} from "./layout-props";
