/**
 * Aspect Ratio & Dimension Calculations
 */

/**
 * Calculate aspect ratio from dimensions
 */
export function calculateAspectRatio(width: number, height: number): number {
  return width / height;
}

/**
 * Calculate height from width and aspect ratio
 */
export function calculateHeightFromAspectRatio(
  width: number,
  aspectRatio: number
): number {
  return Math.round(width / aspectRatio);
}

/**
 * Calculate width from height and aspect ratio
 */
export function calculateWidthFromAspectRatio(
  height: number,
  aspectRatio: number
): number {
  return Math.round(height * aspectRatio);
}
