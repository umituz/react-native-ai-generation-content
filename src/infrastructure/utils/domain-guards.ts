/**
 * Domain-Specific Type Guards
 */

import { hasProperty } from "./structure-guards";
import { isObject } from "./primitive-guards";
import { isNonEmptyString } from "./primitive-guards";

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
