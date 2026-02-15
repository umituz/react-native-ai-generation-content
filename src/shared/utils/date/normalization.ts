/**
 * Date Normalization Utilities
 * Provides consistent date handling across the application
 */

/**
 * Normalizes a Date or timestamp to a timestamp number
 * @param date - Date object or timestamp number
 * @returns Timestamp in milliseconds
 */
export function normalizeDateToTimestamp(date: Date | number | undefined): number {
  if (date === undefined) return 0;
  return date instanceof Date ? date.getTime() : date;
}

/**
 * Normalizes a Date or timestamp to a Date object
 * @param date - Date object or timestamp number
 * @returns Date object
 */
export function normalizeToDate(date: Date | number): Date {
  return date instanceof Date ? date : new Date(date);
}

/**
 * Checks if a value is a valid date
 * @param value - Value to check
 * @returns True if value is a valid Date or number timestamp
 */
export function isValidDate(value: unknown): value is Date | number {
  if (value instanceof Date) {
    return !isNaN(value.getTime());
  }
  if (typeof value === "number") {
    return !isNaN(value) && isFinite(value);
  }
  return false;
}

/**
 * Compares two dates for sorting
 * @param a - First date
 * @param b - Second date
 * @param order - Sort order ('asc' or 'desc')
 * @returns Comparison result for Array.sort()
 */
export function compareDates(
  a: Date | number | undefined,
  b: Date | number | undefined,
  order: "asc" | "desc" = "asc"
): number {
  const aTime = normalizeDateToTimestamp(a);
  const bTime = normalizeDateToTimestamp(b);

  if (aTime === 0 && bTime === 0) return 0;
  if (aTime === 0) return 1;
  if (bTime === 0) return -1;

  return order === "desc" ? bTime - aTime : aTime - bTime;
}
