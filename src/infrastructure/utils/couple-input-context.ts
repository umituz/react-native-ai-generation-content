/**
 * Couple Input Utilities - Context Management
 */

/**
 * Prepends optional context (e.g. appearance analysis) to a base prompt.
 */
export function prependContext(
  basePrompt: string,
  context: string | undefined | null,
): string {
  return context ? `${context}\n\n${basePrompt}` : basePrompt;
}
