/**
 * Base64 Size Calculations
 */

/**
 * Calculate base64 size in bytes
 */
export function calculateBase64Size(base64: string): number {
  // Remove data URI prefix if present
  const cleanBase64 = base64.replace(/^data:[^;]+;base64,/, "");
  return (cleanBase64.length * 3) / 4;
}

/**
 * Calculate base64 size in megabytes
 */
export function calculateBase64SizeMB(base64: string): number {
  return calculateBase64Size(base64) / (1024 * 1024);
}

/**
 * Calculate if base64 size is within limit
 */
export function isBase64SizeWithinLimit(base64: string, maxSizeMB: number): boolean {
  return calculateBase64SizeMB(base64) <= maxSizeMB;
}
