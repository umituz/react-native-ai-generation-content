/**
 * Credit Calculation Types
 * Domain types for credit calculation system
 * Single Source of Truth for credit-related type definitions
 */

/**
 * Credit Calculator Function Type
 * Apps provide implementation, package calls it
 *
 * @param params - Calculation parameters
 * @param params.duration - Video duration in seconds
 * @param params.resolution - Video resolution ("480p" | "720p")
 * @param params.outputType - Output type ("video" | "image")
 * @param params.hasImageInput - Whether input includes image (image-to-video)
 * @returns Calculated credit cost
 */
export type CreditCalculatorFn = (params: {
  duration?: number;
  resolution?: string;
  outputType: "video" | "image";
  hasImageInput: boolean;
}) => number;
