/**
 * Credit & Cost Calculations
 */

/**
 * Calculate cost in credits based on duration and resolution
 */
export function calculateCredits(
  durationSeconds: number,
  resolutionMultiplier: number = 1,
  baseCost: number = 1
): number {
  return Math.ceil((durationSeconds / 60) * resolutionMultiplier * baseCost);
}

/**
 * Calculate resolution multiplier for credits
 */
export function calculateResolutionMultiplier(width: number, height: number): number {
  const totalPixels = width * height;
  const basePixels = 720 * 1280; // HD baseline

  if (totalPixels <= basePixels) return 1;
  if (totalPixels <= basePixels * 2) return 1.5;
  if (totalPixels <= basePixels * 4) return 2;
  return 3;
}

/**
 * Calculate cost to credits conversion
 */
export function convertCostToCredits(
  cost: number,
  creditsPerDollar: number = 100
): number {
  return Math.ceil(cost * creditsPerDollar);
}
