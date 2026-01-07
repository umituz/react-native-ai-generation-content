/**
 * Layout Props Types
 * Main layout component props interfaces
 */

import type { ReactNode } from "react";
import type {
  BaseSingleImageHookReturn,
  BaseDualImageHookReturn,
} from "@features/image-to-image/domain/types";
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
import type {
  ResultRenderProps,
  ProcessingModalRenderProps,
  CustomResultRenderProps,
} from "./result-props";
import type {
  DualImageVideoFeatureState,
  SingleImageWithPromptFeatureState,
} from "./feature-states";

/**
 * Single image feature layout props
 */
export interface SingleImageFeatureLayoutProps {
  /** Feature hook return */
  feature: BaseSingleImageHookReturn;
  /** UI translations */
  translations: BaseLayoutTranslations & PhotoUploadTranslations;
  /** Modal translations */
  modalTranslations: ModalTranslations;
  /** Modal icon */
  modalIcon?: string;
  /** Render the input section (photo upload) */
  renderInput: (props: SingleImageInputRenderProps) => ReactNode;
  /** Render the result section (wrapped with AIGenerationResult) */
  renderResult?: (props: ResultRenderProps) => ReactNode;
  /** Render a fully custom result section (no AIGenerationResult wrapper) */
  renderCustomResult?: (props: CustomResultRenderProps) => ReactNode;
  /** Optional description text */
  description?: string;
  /** Optional custom processing modal */
  renderProcessingModal?: (props: ProcessingModalRenderProps) => ReactNode;
  /** Optional children to render before the input */
  children?: ReactNode;
}

/**
 * Dual image feature layout props
 */
export interface DualImageFeatureLayoutProps {
  /** Feature hook return */
  feature: BaseDualImageHookReturn;
  /** UI translations */
  translations: BaseLayoutTranslations;
  /** Modal translations */
  modalTranslations: ModalTranslations;
  /** Modal icon */
  modalIcon?: string;
  /** Render the input section (dual image picker) */
  renderInput: (props: DualImageInputRenderProps) => ReactNode;
  /** Render the result section */
  renderResult: (props: ResultRenderProps) => ReactNode;
  /** Optional description text */
  description?: string;
  /** Optional custom processing modal */
  renderProcessingModal?: (props: ProcessingModalRenderProps) => ReactNode;
  /** Optional children to render before the input */
  children?: ReactNode;
}

/**
 * Dual image video feature layout props
 */
export interface DualImageVideoFeatureLayoutProps {
  /** Feature hook return */
  feature: DualImageVideoFeatureState;
  /** UI translations */
  translations: BaseLayoutTranslations;
  /** Modal translations */
  modalTranslations: ModalTranslations;
  /** Modal icon */
  modalIcon?: string;
  /** Render the input section (dual image picker) */
  renderInput: (props: DualImageInputRenderProps) => ReactNode;
  /** Optional description text */
  description?: string;
  /** Optional custom processing modal */
  renderProcessingModal?: (props: ProcessingModalRenderProps) => ReactNode;
  /** Optional children to render before the input */
  children?: ReactNode;
}

/**
 * Single image with prompt feature layout props
 */
export interface SingleImageWithPromptFeatureLayoutProps {
  /** Feature hook return */
  feature: SingleImageWithPromptFeatureState;
  /** UI translations */
  translations: BaseLayoutTranslations & PhotoUploadTranslations;
  /** Modal translations */
  modalTranslations: ModalTranslations;
  /** Modal icon */
  modalIcon?: string;
  /** Render the input section (photo upload + prompt) */
  renderInput: (props: SingleImageWithPromptInputRenderProps) => ReactNode;
  /** Render the result section */
  renderResult: (props: ResultRenderProps) => ReactNode;
  /** Optional description text */
  description?: string;
  /** Optional custom processing modal */
  renderProcessingModal?: (props: ProcessingModalRenderProps) => ReactNode;
  /** Optional children to render before the input */
  children?: ReactNode;
}
