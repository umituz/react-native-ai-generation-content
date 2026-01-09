/**
 * Partner Upload Types
 * Generic partner/photo upload feature types
 */

export interface UploadedImage {
  readonly uri: string;
  readonly base64?: string;
  readonly previewUrl: string;
  readonly width?: number;
  readonly height?: number;
}

export interface PartnerStepConfig {
  readonly titleKey: string;
  readonly subtitleKey: string;
  readonly showFaceDetection?: boolean;
  readonly showNameInput?: boolean;
  readonly showPhotoTips?: boolean;
  readonly maxNameLength?: number;
  readonly namePlaceholderKey?: string;
}

export interface PartnerStepTranslations {
  readonly tapToUpload: string;
  readonly selectPhoto: string;
  readonly change: string;
  readonly analyzing: string;
  readonly continue: string;
  readonly faceDetectionLabel?: string;
  readonly namePlaceholder?: string;
  readonly photoTip1?: string;
  readonly photoTip2?: string;
  readonly photoTip3?: string;
}

export interface PhotoTipsConfig {
  readonly tips: readonly string[];
  readonly icon?: string;
}

export const DEFAULT_PARTNER_STEP_CONFIG: PartnerStepConfig = {
  titleKey: "partner.upload.title",
  subtitleKey: "partner.upload.subtitle",
  showFaceDetection: false,
  showNameInput: true,
  showPhotoTips: true,
  maxNameLength: 50,
  namePlaceholderKey: "partner.upload.namePlaceholder",
} as const;

export const DEFAULT_PHOTO_TIPS: PhotoTipsConfig = {
  tips: [
    "photoTips.tip1",
    "photoTips.tip2",
    "photoTips.tip3",
  ],
  icon: "lightbulb",
} as const;
