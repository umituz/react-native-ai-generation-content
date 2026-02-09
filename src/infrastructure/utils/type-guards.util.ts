/**
 * Type Guard Utilities
 * Provides reusable type guards for common type checking patterns
 */

/**
 * Checks if value is a non-null object
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Checks if value is a plain object (not null, not array)
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return isObject(value) && Object.prototype.toString.call(value) === "[object Object]";
}

/**
 * Checks if value is an array
 */
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

/**
 * Checks if value is a non-empty string
 */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Checks if value is a number (excluding NaN)
 */
export function isNumber(value: unknown): value is number {
  return typeof value === "number" && !isNaN(value);
}

/**
 * Checks if value is a positive number
 */
export function isPositiveNumber(value: unknown): value is number {
  return isNumber(value) && value > 0;
}

/**
 * Checks if value is a boolean
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

/**
 * Checks if value is a function
 */
export function isFunction(value: unknown): value is (...args: unknown[]) => unknown {
  return typeof value === "function";
}

/**
 * Checks if value is a promise
 */
export function isPromise(value: unknown): value is Promise<unknown> {
  return (
    isObject(value) &&
    "then" in value &&
    isFunction(value.then) &&
    "catch" in value &&
    isFunction(value.catch)
  );
}

/**
 * Checks if value has a specific property
 */
export function hasProperty<K extends PropertyKey>(
  value: unknown,
  key: K
): value is Record<K, unknown> {
  return isObject(value) && key in value;
}

/**
 * Checks if value is a date object
 */
export function isDate(value: unknown): value is Date {
  return value instanceof Date && !isNaN(value.getTime());
}

/**
 * Checks if value is defined (not null or undefined)
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Checks if value is a string URL
 */
export function isUrl(value: unknown): value is string {
  if (!isNonEmptyString(value)) {
    return false;
  }

  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Checks if value is an array of strings
 */
export function isStringArray(value: unknown): value is string[] {
  return isArray(value) && value.every((item) => typeof item === "string");
}

/**
 * Checks if value is an array of numbers
 */
export function isNumberArray(value: unknown): value is number[] {
  return isArray(value) && value.every(isNumber);
}

/**
 * Checks if object has all required properties
 */
export function hasProperties<K extends PropertyKey>(
  value: unknown,
  keys: K[]
): value is Record<K, unknown> {
  return isObject(value) && keys.every((key) => key in value);
}

/**
 * Type guard for creation objects with output property
 */
export function isCreationWithOutput(
  value: unknown
): value is { output: unknown } {
  return hasProperty(value, "output") && isObject(value.output);
}

/**
 * Type guard for wizard data with id property
 */
export function isWizardData(value: unknown): value is { id: string } {
  return hasProperty(value, "id") && isNonEmptyString(value.id);
}
