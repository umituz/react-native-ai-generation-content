/**
 * Flow Configuration Data Types
 */

/** Auth Gate Configuration */
export interface AuthGateConfig {
  readonly allowAnonymous?: boolean;
  readonly onAuthRequired?: () => void;
  readonly onAuthSuccess?: () => void;
}

/** Credit Gate Configuration */
export interface CreditGateConfig {
  readonly requiredCredits: number;
  readonly onCreditsExhausted?: () => void;
  readonly onCreditsAvailable?: () => void;
}

/** Partner Configuration */
export interface PartnerConfig {
  readonly partnerId: "A" | "B" | "single";
  readonly showNameInput?: boolean;
  readonly showFaceDetection?: boolean;
  readonly showPhotoTips?: boolean;
  readonly maxNameLength?: number;
}

/** Visual Style Option */
export interface FlowVisualStyleData {
  readonly id: string;
  readonly icon: string;
  readonly labelKey: string;
  readonly promptModifier?: string;
}

/** Uploaded Image Data */
export interface FlowUploadedImageData {
  readonly uri: string;
  readonly base64: string;
  readonly mimeType: string;
}
