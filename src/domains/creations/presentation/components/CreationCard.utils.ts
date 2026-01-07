/**
 * CreationCard Utilities
 */

import { useMemo } from "react";

/**
 * Format creation date for display
 */
export function useCreationDateFormatter(
  createdAt: Date | number,
  formatDate?: (date: Date) => string
): string {
  return useMemo(() => {
    const date = createdAt instanceof Date
      ? createdAt
      : new Date(createdAt);

    if (formatDate) {
      return formatDate(date);
    }

    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, [createdAt, formatDate]);
}
