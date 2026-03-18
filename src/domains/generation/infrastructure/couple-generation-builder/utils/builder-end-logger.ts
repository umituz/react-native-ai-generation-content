/**
 * Couple Image Generation Builder - End Logger
 */

const DEV = typeof __DEV__ !== "undefined" && __DEV__;

/**
 * Log builder end
 */
export function logBuilderEnd(prefix: string): void {
  if (!DEV) return;

  console.log(`${prefix} ========================================`);
  console.log(`${prefix} ===== BUILD COUPLE GENERATION END =====`);
  console.log(`${prefix} ========================================`);
  console.log(`${prefix} Returning: { target, prompt, params }`);
  console.log("");
}
