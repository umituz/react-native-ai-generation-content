/**
 * Partner Upload Feature
 * Generic partner/photo upload screens and components
 */

export type {
  UploadedImage,
  PartnerStepConfig,
  PartnerStepTranslations,
  PhotoTipsConfig,
} from "./domain/types";
export { DEFAULT_PARTNER_STEP_CONFIG, DEFAULT_PHOTO_TIPS } from "./domain/types";

export { PhotoTips, PartnerInfoInput } from "./presentation/components";
export type { PhotoTipsProps, PhotoTipConfig, PartnerInfoInputProps } from "./presentation/components";

export { usePartnerStep } from "./presentation/hooks";
export type {
  UsePartnerStepConfig,
  UsePartnerStepTranslations,
  UsePartnerStepOptions,
  UsePartnerStepReturn,
} from "./presentation/hooks";

export { PartnerStepScreen } from "./presentation/screens";
export type {
  PartnerStepScreenProps,
  PartnerStepScreenTranslations,
  PartnerStepScreenConfig,
} from "./presentation/screens";
