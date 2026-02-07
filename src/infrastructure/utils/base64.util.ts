/**
 * Base64 Utility
 * Shared base64 formatting functions
 */

const BASE64_IMAGE_PREFIX = "data:image/jpeg;base64,";

/**
 * Ensures a base64 string has the proper data URI prefix.
 * If already prefixed, returns as-is.
 */
export function formatBase64(base64: string): string {
  if (!base64) return "";
  return base64.startsWith("data:") ? base64 : `${BASE64_IMAGE_PREFIX}${base64}`;
}
