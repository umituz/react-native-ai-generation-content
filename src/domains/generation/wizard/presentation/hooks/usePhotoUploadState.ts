/**
 * Generic Photo Upload State Hook
 * Manages photo upload state for wizard steps
 * Uses design system's useMedia hook for media picking with built-in validation
 */

export { usePhotoUploadState } from "./photo-upload";
export type {
  PhotoUploadConfig,
  PhotoUploadTranslations,
  PhotoUploadError,
  UsePhotoUploadStateProps,
  UsePhotoUploadStateReturn,
} from "./photo-upload";
