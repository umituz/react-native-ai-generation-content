/**
 * ID Generator Utility
 * Shared creation ID generation
 */

/**
 * Generate a unique creation ID with prefix.
 */
export function generateCreationId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
