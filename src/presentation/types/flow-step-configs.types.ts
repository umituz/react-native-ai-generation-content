/**
 * Flow Step Configuration Types
 */

import type { StepHeaderConfig } from "@umituz/react-native-design-system/molecules";
import type { PhotoUploadCardConfig } from "../components/PhotoUploadCard";

/**
 * Photo upload step configuration
 */
export interface PhotoStepConfig {
  enabled: boolean;
  order: number;
  id: string;
  header?: StepHeaderConfig;
  photoCard?: PhotoUploadCardConfig;
  requireNameInput?: boolean;
  enableValidation?: boolean;
  validationType?: "none" | "face-detection" | "custom";
  showPhotoTips?: boolean;
  customValidator?: (imageUri: string) => Promise<boolean>;
}

/**
 * Text input step configuration
 */
export interface TextInputStepConfig {
  enabled: boolean;
  order: number;
  id: string;
  header?: StepHeaderConfig;
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
  showCharacterCount?: boolean;
}

/**
 * Preview step configuration
 */
export interface PreviewStepConfig {
  enabled: boolean;
  order: number;
  id: string;
  header?: StepHeaderConfig;
  allowEditing?: boolean;
  layout?: "grid" | "list" | "carousel";
}
