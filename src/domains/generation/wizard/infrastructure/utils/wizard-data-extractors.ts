/**
 * Wizard Data Extractors
 * Type-safe utilities for extracting values from wizard data
 *
 * Pattern: Type Guards + Normalizers
 * @see https://www.typescriptlang.org/docs/handbook/2/narrowing.html
 * @see https://betterstack.com/community/guides/scaling-nodejs/typescript-type-guards/
 */

// ============================================================================
// Type Guards
// ============================================================================

/**
 * Check if value is a non-null object
 */
function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Check if object has a specific property
 * Uses 'in' operator for safe property checking
 */
function hasProperty<K extends string>(
  obj: Record<string, unknown>,
  key: K,
): obj is Record<K, unknown> {
  return key in obj;
}

// ============================================================================
// String Extractors
// ============================================================================

/**
 * Extracts string from various input formats:
 * - Direct string: "my text"
 * - Object with text field: { text: "my text" }
 * - Object with uri field (fallback): { uri: "my text" }
 *
 * @param value - The value to extract string from
 * @returns The extracted string or undefined
 */
export function extractString(value: unknown): string | undefined {
  // Direct string
  if (typeof value === "string") {
    return value;
  }

  // Object with text or uri field
  if (isObject(value)) {
    if (hasProperty(value, "text") && typeof value.text === "string") {
      return value.text;
    }
    if (hasProperty(value, "uri") && typeof value.uri === "string") {
      return value.uri;
    }
  }

  return undefined;
}

/**
 * Extracts and trims string, returning undefined if empty
 */
export function extractTrimmedString(value: unknown): string | undefined {
  const str = extractString(value);
  const trimmed = str?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : undefined;
}

// ============================================================================
// Number Extractors
// ============================================================================

/**
 * Extracts number from various input formats:
 * - Direct number: 5
 * - Object with value field: { value: 5 }
 * - Object with selection field: { selection: 5 }
 *
 * @param value - The value to extract number from
 * @returns The extracted number or undefined
 */
export function extractNumber(value: unknown): number | undefined {
  // Direct number
  if (typeof value === "number" && !Number.isNaN(value)) {
    return value;
  }

  // Object with value or selection field
  if (isObject(value)) {
    if (hasProperty(value, "value") && typeof value.value === "number") {
      return value.value;
    }
    if (hasProperty(value, "selection") && typeof value.selection === "number") {
      return value.selection;
    }
  }

  return undefined;
}

// ============================================================================
// Selection Extractors
// ============================================================================

/**
 * Extracts selection value (string or string array) from wizard data
 *
 * @param value - The value to extract selection from
 * @returns The extracted selection or undefined
 */
export function extractSelection(value: unknown): string | string[] | undefined {
  // Direct string
  if (typeof value === "string") {
    return value;
  }

  // Direct string array
  if (Array.isArray(value) && value.every((v) => typeof v === "string")) {
    return value as string[];
  }

  // Object with selection field
  if (isObject(value)) {
    if (hasProperty(value, "selection")) {
      const selection = value.selection;
      if (typeof selection === "string") {
        return selection;
      }
      if (Array.isArray(selection) && selection.every((v) => typeof v === "string")) {
        return selection as string[];
      }
    }
  }

  return undefined;
}

// ============================================================================
// Prompt Extractor (Specialized)
// ============================================================================

/**
 * Extracts prompt from wizard data with fallback chain
 * Checks multiple keys in order: prompt, motion_prompt, text
 *
 * @param wizardData - The wizard data object
 * @param fallback - Optional fallback value (e.g., scenario.aiPrompt)
 * @returns The extracted and trimmed prompt or undefined
 */
export function extractPrompt(
  wizardData: Record<string, unknown>,
  fallback?: string,
): string | undefined {
  // Priority chain for prompt keys
  const promptKeys = ["prompt", "motion_prompt", "text", "userPrompt"];

  for (const key of promptKeys) {
    if (key in wizardData) {
      const extracted = extractTrimmedString(wizardData[key]);
      if (extracted) {
        return extracted;
      }
    }
  }

  // Use fallback if provided
  return fallback?.trim() || undefined;
}

// ============================================================================
// Duration Extractor (Specialized)
// ============================================================================

/**
 * Extracts duration from wizard data
 * Handles both direct number and object with value field
 *
 * @param wizardData - The wizard data object
 * @returns The extracted duration in seconds or undefined
 */
export function extractDuration(
  wizardData: Record<string, unknown>,
): number | undefined {
  const durationData = wizardData.duration;

  const extracted = extractNumber(durationData);
  if (extracted !== undefined && extracted > 0) {
    return extracted;
  }

  return undefined;
}
