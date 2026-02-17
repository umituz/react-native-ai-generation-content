/**
 * Credit Value Extractors
 * Pure utility functions to extract and normalize values from customData
 * Single Responsibility: Data transformation for credit calculation
 *
 * Handles both raw values and selection format objects:
 * - Raw: "4s", 4, "480p"
 * - Selection format: { uri: "4s", selection: "4s" | 4, previewUrl: "" }
 */

/**
 * Unwrap selection format to get the actual value
 * Selection steps store data as { uri, selection, previewUrl } objects
 */
function unwrapSelection(value: unknown): unknown {
  if (typeof value === "object" && value !== null && "selection" in value) {
    return (value as Record<string, unknown>).selection;
  }
  return value;
}

/**
 * Extract duration value from customData
 * Handles both number and string formats ("4s", "5s", "6s")
 * Also handles selection format objects from wizard steps
 *
 * @param value - Raw value from customData
 * @returns Normalized duration number, or undefined if invalid
 */
export function extractDuration(value: unknown): number | undefined {
  const unwrapped = unwrapSelection(value);

  // Already a number
  if (typeof unwrapped === "number" && unwrapped > 0) {
    return unwrapped;
  }

  // String format: "4s", "5s", "6s" → parse to number
  if (typeof unwrapped === "string") {
    const match = unwrapped.match(/^(\d+)s?$/);
    if (match) {
      const parsed = parseInt(match[1], 10);
      return parsed > 0 ? parsed : undefined;
    }
  }

  return undefined;
}

/**
 * Extract resolution value from customData
 * Validates against allowed values
 * Also handles selection format objects from wizard steps
 *
 * @param value - Raw value from customData
 * @returns Normalized resolution string, or undefined if invalid
 */
export function extractResolution(value: unknown): string | undefined {
  const unwrapped = unwrapSelection(value);

  if (typeof unwrapped === "string" && unwrapped.length > 0) {
    return unwrapped;
  }
  return undefined;
}

/**
 * Extract default duration from wizard feature config
 * Finds the duration selection step and resolves its default option value
 */
export function getConfigDefaultDuration(steps: readonly Record<string, unknown>[]): number | undefined {
  const step = steps.find((s) => s.selectionType === "duration");
  if (!step?.defaultValue || !step.options || !Array.isArray(step.options)) return undefined;

  const defaultId = typeof step.defaultValue === "string" ? step.defaultValue : String(step.defaultValue);
  const options = step.options as readonly { id: string; value: unknown }[];
  const option = options.find((o) => o.id === defaultId);
  if (option) {
    return typeof option.value === "number" ? option.value : extractDuration(option.value);
  }
  return extractDuration(defaultId);
}

/**
 * Extract default resolution from wizard feature config
 * Finds the resolution selection step and returns its default value
 */
export function getConfigDefaultResolution(steps: readonly Record<string, unknown>[]): string | undefined {
  const step = steps.find((s) => s.selectionType === "resolution");
  if (!step?.defaultValue) return undefined;
  return typeof step.defaultValue === "string" ? step.defaultValue : undefined;
}
