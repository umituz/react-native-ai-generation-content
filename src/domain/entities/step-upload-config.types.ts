/**
 * Photo Upload Step Configuration Types
 */

/**
 * Photo Upload Step Config
 */
export interface PhotoUploadStepConfig {
  readonly id: string;
  readonly label?: string;
  readonly titleKey?: string;
  readonly subtitleKey?: string;
  readonly showFaceDetection?: boolean;
  readonly showNameInput?: boolean;
  readonly showPhotoTips?: boolean;
  readonly required?: boolean;
}
