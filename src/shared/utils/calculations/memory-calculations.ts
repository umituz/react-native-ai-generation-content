/**
 * Memory Usage Calculations
 */

/**
 * Calculate estimated memory usage for image
 */
export function calculateImageMemoryUsage(
  width: number,
  height: number,
  bytesPerPixel: number = 4 // RGBA
): number {
  return width * height * bytesPerPixel;
}

/**
 * Calculate estimated memory usage in MB
 */
export function calculateMemoryMB(bytes: number): number {
  return bytes / (1024 * 1024);
}

/**
 * Calculate safe batch size for processing
 */
export function calculateSafeBatchSize(
  availableMemoryMB: number,
  itemSizeMB: number,
  safetyFactor: number = 0.7
): number {
  const safeMemory = availableMemoryMB * safetyFactor;
  return Math.max(1, Math.floor(safeMemory / itemSizeMB));
}
