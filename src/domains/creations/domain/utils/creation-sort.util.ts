/**
 * Creation Sort Utilities
 * Single Responsibility: Sorting operations
 */

/**
 * Sort creations by field
 */
export function sortCreations<T extends Record<string, unknown>>(
  items: T[],
  field: keyof T,
  order: "asc" | "desc" = "desc"
): T[] {
  return [...items].sort((a, b) => {
    const aVal = a[field] as unknown;
    const bVal = b[field] as unknown;

    if (aVal === undefined && bVal === undefined) return 0;
    if (aVal === undefined) return 1;
    if (bVal === undefined) return -1;

    if (typeof aVal === "string" && typeof bVal === "string") {
      return order === "desc"
        ? bVal.localeCompare(aVal)
        : aVal.localeCompare(bVal);
    }

    if (typeof aVal === "number" && typeof bVal === "number") {
      return order === "desc" ? bVal - aVal : aVal - bVal;
    }

    // Handle Date objects
    if (aVal instanceof Date && bVal instanceof Date) {
      return order === "desc"
        ? bVal.getTime() - aVal.getTime()
        : aVal.getTime() - bVal.getTime();
    }

    return 0;
  });
}
