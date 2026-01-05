/**
 * Feature Layout Types
 * Shared types for SingleImageFeatureLayout and DualImageFeatureLayout
 */

import type { ReactNode } from "react";
import type {
  BaseSingleImageHookReturn,
  BaseDualImageHookReturn,
} from "../../features/image-to-image/domain/types";

/**
 * Modal translations for processing modal
 */
export interface ModalTranslations {
  title: string;
  message: string;
  hint: string;
  backgroundHint: string;
}

/**
 * Base translations required by layouts
 */
export interface BaseLayoutTranslations {
  successText: string;
  saveButtonText: string;
  tryAnotherText: string;
  processButtonText: string;
  processingText: string;
}

/**
 * Photo upload translations
 */
export interface PhotoUploadTranslations {
  uploadTitle: string;
  uploadSubtitle: string;
  uploadChange: string;
  uploadAnalyzing: string;
}

/**
 * Input render props for single image
 */
export interface SingleImageInputRenderProps {
  imageUri: string | null;
  onSelect: () => void;
  isDisabled: boolean;
  isProcessing: boolean;
}

/**
 * Input render props for dual image
 */
export interface DualImageInputRenderProps {
  sourceImageUri: string | null;
  targetImageUri: string | null;
  onSelectSource: () => void;
  onSelectTarget: () => void;
  isDisabled: boolean;
  isProcessing: boolean;
}

/**
 * Result render props
 */
export interface ResultRenderProps {
  imageUrl: string;
  imageSize: number;
}

/**
 * Processing modal render props
 */
export interface ProcessingModalRenderProps {
  visible: boolean;
  progress: number;
}

/**
 * Custom result render props (includes feature state for comparison views)
 */
export interface CustomResultRenderProps {
  processedUrl: string;
  originalImageUri: string;
  imageSize: number;
  onSave: () => void;
  onReset: () => void;
}

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
 * Dual image video feature state (for ai-kiss, ai-hug)
 */
export interface DualImageVideoFeatureState {
  sourceImageUri: string | null;
  targetImageUri: string | null;
  processedVideoUrl: string | null;
  isProcessing: boolean;
  progress: number;
  error: string | null;
  selectSourceImage: () => Promise<void>;
  selectTargetImage: () => Promise<void>;
  process: () => Promise<void>;
  save: () => Promise<void>;
  reset: () => void;
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
 * Single image with prompt feature state
 */
export interface SingleImageWithPromptFeatureState {
  imageUri: string | null;
  prompt: string;
  processedUrl: string | null;
  isProcessing: boolean;
  progress: number;
  error: string | null;
  selectImage: () => Promise<void>;
  setPrompt: (prompt: string) => void;
  process: () => Promise<void>;
  save: () => Promise<void>;
  reset: () => void;
}

/**
 * Input render props for single image with prompt
 */
export interface SingleImageWithPromptInputRenderProps extends SingleImageInputRenderProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
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
