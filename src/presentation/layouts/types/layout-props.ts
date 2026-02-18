/**
 * Layout Props Types
 * Main layout component props interfaces
 */

import type { ReactNode } from "react";
import type {
  ModalTranslations,
  BaseLayoutTranslations,
  PhotoUploadTranslations,
} from "./translations";
import type {
  SingleImageInputRenderProps,
  DualImageInputRenderProps,
  SingleImageWithPromptInputRenderProps,
} from "./input-props";
import type { ResultRenderProps, CustomResultRenderProps } from "./result-props";
import type {
  DualImageVideoFeatureState,
  SingleImageWithPromptFeatureState,
} from "./feature-states";

/**
 * Base hook return for single image features
 */
export interface BaseSingleImageHookReturn {
  readonly imageUri: string | null;
  readonly processedUrl: string | null;
  readonly isProcessing: boolean;
  readonly progress: number;
  selectImage(): Promise<void>;
  process(): Promise<void>;
  save(): Promise<void>;
  reset(): void;
}

/**
 * Base hook return for dual image features
 */
export interface BaseDualImageHookReturn {
  readonly sourceImageUri: string | null;
  readonly targetImageUri: string | null;
  readonly processedUrl: string | null;
  readonly isProcessing: boolean;
  readonly progress: number;
  selectSourceImage(): Promise<void>;
  selectTargetImage(): Promise<void>;
  process(): Promise<void>;
  save(): Promise<void>;
  reset(): void;
}

/**
 * Base interface for all layout props
 * Contains common properties shared across all feature layouts
 */
interface BaseFeatureLayoutProps {
  /** UI translations */
  translations: BaseLayoutTranslations & Partial<PhotoUploadTranslations>;
  /** Progress screen translations */
  modalTranslations: ModalTranslations;
  /** Progress screen icon */
  modalIcon?: string;
  /** Optional description text */
  description?: string;
  /** Optional children to render before the input */
  children?: ReactNode;
}

/**
 * Single image feature layout props
 * Note: No modal - shows fullscreen progress when processing (FutureUS pattern)
 */
export interface SingleImageFeatureLayoutProps extends BaseFeatureLayoutProps {
  /** Feature hook return */
  feature: BaseSingleImageHookReturn;
  /** Render the input section (photo upload) */
  renderInput: (props: SingleImageInputRenderProps) => ReactNode;
  /** Render the result section (wrapped with AIGenerationResult) */
  renderResult?: (props: ResultRenderProps) => ReactNode;
  /** Render a fully custom result section (no AIGenerationResult wrapper) */
  renderCustomResult?: (props: CustomResultRenderProps) => ReactNode;
}

/**
 * Dual image feature layout props
 * Note: No modal - shows fullscreen progress when processing (FutureUS pattern)
 */
export interface DualImageFeatureLayoutProps extends BaseFeatureLayoutProps {
  /** Feature hook return */
  feature: BaseDualImageHookReturn;
  /** Render the input section (dual image picker) */
  renderInput: (props: DualImageInputRenderProps) => ReactNode;
  /** Render the result section */
  renderResult: (props: ResultRenderProps) => ReactNode;
}

/**
 * Dual image video feature layout props
 * Note: No modal - shows fullscreen progress when processing (FutureUS pattern)
 */
export interface DualImageVideoFeatureLayoutProps extends BaseFeatureLayoutProps {
  /** Feature hook return */
  feature: DualImageVideoFeatureState;
  /** Render the input section (dual image picker) */
  renderInput: (props: DualImageInputRenderProps) => ReactNode;
}

/**
 * Single image with prompt feature layout props
 * Note: No modal - shows fullscreen progress when processing (FutureUS pattern)
 */
export interface SingleImageWithPromptFeatureLayoutProps extends BaseFeatureLayoutProps {
  /** Feature hook return */
  feature: SingleImageWithPromptFeatureState;
  /** Render the input section (photo upload + prompt) */
  renderInput: (props: SingleImageWithPromptInputRenderProps) => ReactNode;
  /** Render the result section */
  renderResult: (props: ResultRenderProps) => ReactNode;
}
