/**
 * Complex Structure Type Guards
 */

import { isObject, isArray, isNonEmptyString, isNumber, isFunction } from "./primitive-guards";

/**
 * Checks if value is a plain object (not null, not array)
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return isObject(value) && Object.prototype.toString.call(value) === "[object Object]";
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
 * Checks if value has a specific property
 */
export function hasProperty<K extends PropertyKey>(
  value: unknown,
  key: K
): value is Record<K, unknown> {
  return isObject(value) && key in value;
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
