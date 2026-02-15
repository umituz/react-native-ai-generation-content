/**
 * CreationCard Utilities
 */

import { useMemo } from "react";
import { normalizeToDate } from "../../../../shared/utils/date";

/**
 * Format creation date for display
 */
export function useCreationDateFormatter(
  createdAt: Date | number,
  formatDate?: (date: Date) => string
): string {
  return useMemo(() => {
    const date = normalizeToDate(createdAt);

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
