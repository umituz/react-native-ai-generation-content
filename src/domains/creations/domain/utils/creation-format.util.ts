/**
 * Creation Format Utilities
 * Single Responsibility: Text formatting and ID generation
 */

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + "...";
}

/**
 * Generate unique creation ID
 */
export function generateCreationId(): string {
  return `creation_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}
