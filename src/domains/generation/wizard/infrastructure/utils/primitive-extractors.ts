/**
 * Primitive Data Extractors
 * Type-safe utilities for extracting primitive values from unknown data
 */

// ============================================================================
// Type Guards
// ============================================================================

/**
 * Check if value is a non-null object
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Check if object has a specific property
 */
export function hasProperty<K extends string>(
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
 */
export function extractString(value: unknown): string | undefined {
  if (typeof value === "string") {
    return value;
  }

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
 */
export function extractNumber(value: unknown): number | undefined {
  if (typeof value === "number" && !Number.isNaN(value)) {
    return value;
  }

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
 */
export function extractSelection(value: unknown): string | string[] | undefined {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value) && value.every((v) => typeof v === "string")) {
    return value as string[];
  }

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
