/**
 * Photo Preparation Utilities
 *
 * Utilities for preparing photos for AI generation.
 */

export interface PhotoInput {
  base64: string;
  mimeType?: string;
  previewUrl?: string;
}

export interface PreparedImage {
  base64: string;
  mimeType: string;
}

/**
 * Clean base64 string by removing data URI prefix
 */
export const cleanBase64 = (base64: string): string => {
  return base64.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "");
};

/**
 * Add data URI prefix to base64 string
 */
export const addBase64Prefix = (
  base64: string,
  mimeType: string = "image/jpeg",
): string => {
  const cleanedBase64 = cleanBase64(base64);
  const imageType = mimeType.replace("image/", "");
  return `data:image/${imageType};base64,${cleanedBase64}`;
};

/**
 * Prepare single photo for API consumption
 */
export const preparePhoto = (photo: PhotoInput): PreparedImage => {
  return {
    base64: cleanBase64(photo.base64),
    mimeType: photo.mimeType || "image/jpeg",
  };
};

/**
 * Prepare multiple photos for API consumption
 */
export const preparePhotos = (photos: PhotoInput[]): PreparedImage[] => {
  return photos.map(preparePhoto);
};

/**
 * Validate photo base64 string
 */
export const isValidBase64 = (base64: string): boolean => {
  if (!base64 || typeof base64 !== "string") return false;

  const cleaned = cleanBase64(base64);

  if (cleaned.length === 0) return false;
  if (cleaned.length % 4 !== 0) return false;

  const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
  return base64Regex.test(cleaned);
};

/**
 * Get image size estimate in bytes from base64
 */
export const getBase64Size = (base64: string): number => {
  const cleaned = cleanBase64(base64);
  return (cleaned.length * 3) / 4;
};

/**
 * Get image size estimate in MB from base64
 */
export const getBase64SizeMB = (base64: string): number => {
  return getBase64Size(base64) / (1024 * 1024);
};
