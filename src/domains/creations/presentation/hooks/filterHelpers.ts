/**
 * Filter Helpers
 * Utility functions for filtering and sorting creations
 */

import type { CreationFilter } from "../../domain/types";
import { isTypeInCategory } from "../../domain/types";
import type { CreationCategory, CreationTypeId } from "../../domain/types";
import type { FilterableCreation } from "./advancedFilter.types";
import { normalizeDateToTimestamp, compareDates } from "../../../../shared/utils/date";

function filterByType<T extends FilterableCreation>(
  creations: T[],
  filterType: string | undefined,
): T[] {
  if (!filterType || filterType === "all") return creations;

  if (["image", "video", "voice"].includes(filterType)) {
    const category = filterType as CreationCategory;
    return creations.filter(
      (c) => c.type && isTypeInCategory(c.type as CreationTypeId, category),
    );
  }

  return creations.filter((c) => c.type === filterType);
}

function filterByStatus<T extends FilterableCreation>(
  creations: T[],
  status: string | undefined,
): T[] {
  if (!status || status === "all") return creations;
  return creations.filter((c) => c.status === status);
}

function filterBySearch<T extends FilterableCreation>(
  creations: T[],
  searchQuery: string | undefined,
): T[] {
  if (!searchQuery?.trim()) return creations;

  const query = searchQuery.toLowerCase().trim();
  return creations.filter((c) => {
    const prompt = c.prompt?.toLowerCase() || "";
    const type = c.type?.toLowerCase() || "";
    return prompt.includes(query) || type.includes(query);
  });
}

function filterByDateRange<T extends FilterableCreation>(
  creations: T[],
  startDate: number | undefined,
  endDate: number | undefined,
): T[] {
  let result = creations;

  if (startDate) {
    result = result.filter((c) => {
      const createdAt = normalizeDateToTimestamp(c.createdAt);
      return createdAt >= startDate;
    });
  }

  if (endDate) {
    result = result.filter((c) => {
      const createdAt = normalizeDateToTimestamp(c.createdAt);
      return createdAt <= endDate;
    });
  }

  return result;
}

function sortCreations<T extends FilterableCreation>(
  creations: T[],
  sortField: CreationFilter["sortField"],
  sortOrder: CreationFilter["sortOrder"],
): T[] {
  if (!sortField) return creations;

  return [...creations].sort((a, b) => {
    let aVal: string | number | Date | undefined;
    let bVal: string | number | Date | undefined;

    switch (sortField) {
      case "createdAt":
        return compareDates(a.createdAt, b.createdAt, sortOrder);
      case "updatedAt":
        return compareDates(a.updatedAt, b.updatedAt, sortOrder);
      case "type":
        aVal = a.type;
        bVal = b.type;
        break;
      case "status":
        aVal = a.status;
        bVal = b.status;
        break;
      default:
        return 0;
    }

    if (aVal === undefined && bVal === undefined) return 0;
    if (aVal === undefined) return 1;
    if (bVal === undefined) return -1;

    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortOrder === "desc"
        ? bVal.localeCompare(aVal)
        : aVal.localeCompare(bVal);
    }

    return 0;
  });
}

export function applyAllFilters<T extends FilterableCreation>(
  creations: T[],
  filter: CreationFilter,
): T[] {
  let result = [...creations];

  result = filterByType(result, filter.type);
  result = filterByStatus(result, filter.status);
  result = filterBySearch(result, filter.searchQuery);
  result = filterByDateRange(result, filter.startDate, filter.endDate);
  result = sortCreations(result, filter.sortField, filter.sortOrder);

  if (filter.limit && filter.limit > 0) {
    result = result.slice(0, filter.limit);
  }

  return result;
}
