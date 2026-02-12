/**
 * Status Extraction Helpers
 * Infrastructure: Safely extract data from unknown objects
 */

/**
 * Type guard to check if object has a property
 */
export function hasProperty<K extends PropertyKey>(
  obj: unknown,
  prop: K
): obj is Record<K, unknown> {
  return typeof obj === "object" && obj !== null && prop in obj;
}

/**
 * Safely get a string property from an object
 */
export function safeString(obj: unknown, key: PropertyKey): string {
  if (hasProperty(obj, key)) {
    const value = obj[key];
    return typeof value === "string" ? value : String(value ?? "");
  }
  return "";
}
