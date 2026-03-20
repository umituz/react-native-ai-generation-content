/**
 * Generic Photo Upload State Hook - Type Definitions
 */

export interface UploadedImage {
  uri: string;
  base64?: string;
  width?: number;
  height?: number;
  previewUrl?: string;
  fileSize?: number;
}

export interface PhotoUploadConfig {
  readonly maxFileSizeMB?: number;
}

export interface PhotoUploadTranslations {
  readonly fileTooLarge: string;
  readonly maxFileSize: string;
  readonly error: string;
  readonly uploadFailed: string;
  readonly permissionDenied?: string;
}

export interface PhotoUploadError {
  readonly title: string;
  readonly message: string;
}

export interface UsePhotoUploadStateProps {
  readonly config?: PhotoUploadConfig;
  readonly translations: PhotoUploadTranslations;
  readonly initialImage?: UploadedImage;
  readonly stepId?: string;
  readonly onError?: (error: PhotoUploadError) => void;
}

export interface UsePhotoUploadStateReturn {
  readonly image: UploadedImage | null;
  readonly handlePickImage: () => Promise<void>;
  readonly canContinue: boolean;
  readonly clearImage: () => void;
}
