/**
 * useAdvancedFilter Hook
 * Advanced filtering with category, status, and search support
 */

import { useState, useMemo, useCallback } from "react";
import type { CreationFilter, CreationStats, FilterOption } from "../../domain/types";
import {
  DEFAULT_CREATION_FILTER,
  MEDIA_FILTER_OPTIONS,
  STATUS_FILTER_OPTIONS,
  calculateCreationStats,
  isTypeInCategory,
} from "../../domain/types";
import type { CreationCategory, CreationStatus, CreationTypeId } from "../../domain/types";

interface Creation {
  id: string;
  type?: string;
  status?: string;
  prompt?: string;
  createdAt?: Date | number;
  updatedAt?: Date | number;
  metadata?: Record<string, unknown>;
}

interface UseAdvancedFilterProps<T extends Creation> {
  creations: T[] | undefined;
  initialFilter?: Partial<CreationFilter>;
}

interface UseAdvancedFilterReturn<T extends Creation> {
  // Filtered results
  filtered: T[];

  // Current filter state
  filter: CreationFilter;

  // Stats
  stats: CreationStats;

  // Filter state
  activeMediaFilter: string;
  activeStatusFilter: string;
  hasActiveFilters: boolean;

  // Filter options with counts
  mediaFilterOptions: FilterOption[];
  statusFilterOptions: FilterOption[];

  // Actions
  setMediaFilter: (filter: CreationCategory | CreationTypeId) => void;
  setStatusFilter: (status: CreationStatus | "all") => void;
  setSearchQuery: (query: string) => void;
  updateFilter: (update: Partial<CreationFilter>) => void;
  resetFilters: () => void;
}

/**
 * Advanced filtering hook for creations
 * Supports category, status, search, and sorting
 */
export function useAdvancedFilter<T extends Creation>({
  creations,
  initialFilter,
}: UseAdvancedFilterProps<T>): UseAdvancedFilterReturn<T> {
  const [filter, setFilter] = useState<CreationFilter>({
    ...DEFAULT_CREATION_FILTER,
    ...initialFilter,
  });

  // Calculate stats from all creations
  const stats = useMemo(() => {
    if (!creations) {
      return {
        total: 0,
        byCategory: { all: 0, image: 0, video: 0, voice: 0 },
        byStatus: { pending: 0, queued: 0, processing: 0, completed: 0, failed: 0 },
        byType: {},
      };
    }
    return calculateCreationStats(creations);
  }, [creations]);

  // Filter creations
  const filtered = useMemo(() => {
    if (!creations) return [];

    let result = [...creations];

    // Filter by type/category
    if (filter.type && filter.type !== "all") {
      const filterType = filter.type;

      // Check if it's a category
      if (["image", "video", "voice"].includes(filterType)) {
        const category = filterType as CreationCategory;
        result = result.filter((c) =>
          c.type && isTypeInCategory(c.type as CreationTypeId, category)
        );
      } else {
        // It's a specific type
        result = result.filter((c) => c.type === filterType);
      }
    }

    // Filter by status
    if (filter.status && filter.status !== "all") {
      result = result.filter((c) => c.status === filter.status);
    }

    // Filter by search query
    if (filter.searchQuery && filter.searchQuery.trim()) {
      const query = filter.searchQuery.toLowerCase().trim();
      result = result.filter((c) => {
        const prompt = c.prompt?.toLowerCase() || "";
        const type = c.type?.toLowerCase() || "";
        return prompt.includes(query) || type.includes(query);
      });
    }

    // Filter by date range
    if (filter.startDate) {
      result = result.filter((c) => {
        const createdAt = c.createdAt instanceof Date
          ? c.createdAt.getTime()
          : (c.createdAt || 0);
        return createdAt >= filter.startDate!;
      });
    }

    if (filter.endDate) {
      result = result.filter((c) => {
        const createdAt = c.createdAt instanceof Date
          ? c.createdAt.getTime()
          : (c.createdAt || 0);
        return createdAt <= filter.endDate!;
      });
    }

    // Sort
    if (filter.sortField) {
      result.sort((a, b) => {
        let aVal: string | number | Date | undefined;
        let bVal: string | number | Date | undefined;

        switch (filter.sortField) {
          case "createdAt":
            aVal = a.createdAt;
            bVal = b.createdAt;
            break;
          case "updatedAt":
            aVal = a.updatedAt;
            bVal = b.updatedAt;
            break;
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

        // Convert dates to numbers for comparison
        if (aVal instanceof Date) aVal = aVal.getTime();
        if (bVal instanceof Date) bVal = bVal.getTime();

        // Handle undefined values
        if (aVal === undefined && bVal === undefined) return 0;
        if (aVal === undefined) return 1;
        if (bVal === undefined) return -1;

        // Compare
        if (typeof aVal === "string" && typeof bVal === "string") {
          return filter.sortOrder === "desc"
            ? bVal.localeCompare(aVal)
            : aVal.localeCompare(bVal);
        }

        if (typeof aVal === "number" && typeof bVal === "number") {
          return filter.sortOrder === "desc" ? bVal - aVal : aVal - bVal;
        }

        return 0;
      });
    }

    // Apply limit
    if (filter.limit && filter.limit > 0) {
      result = result.slice(0, filter.limit);
    }

    return result;
  }, [creations, filter]);

  // Media filter options with counts
  const mediaFilterOptions = useMemo<FilterOption[]>(() => {
    return MEDIA_FILTER_OPTIONS.map((opt) => ({
      ...opt,
      count: opt.id === "all"
        ? stats.total
        : stats.byCategory[opt.id as CreationCategory] || 0,
    }));
  }, [stats]);

  // Status filter options with counts
  const statusFilterOptions = useMemo<FilterOption[]>(() => {
    return STATUS_FILTER_OPTIONS.map((opt) => ({
      ...opt,
      count: opt.id === "all"
        ? stats.total
        : stats.byStatus[opt.id as CreationStatus] || 0,
    }));
  }, [stats]);

  // Actions
  const setMediaFilter = useCallback((type: CreationCategory | CreationTypeId) => {
    setFilter((prev) => ({ ...prev, type }));
  }, []);

  const setStatusFilter = useCallback((status: CreationStatus | "all") => {
    setFilter((prev) => ({ ...prev, status }));
  }, []);

  const setSearchQuery = useCallback((searchQuery: string) => {
    setFilter((prev) => ({ ...prev, searchQuery }));
  }, []);

  const updateFilter = useCallback((update: Partial<CreationFilter>) => {
    setFilter((prev) => ({ ...prev, ...update }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilter(DEFAULT_CREATION_FILTER);
  }, []);

  // Derived state
  const hasActiveFilters = filter.type !== "all" || filter.status !== "all" || !!filter.searchQuery;
  const activeMediaFilter = (filter.type as string) || "all";
  const activeStatusFilter = (filter.status as string) || "all";

  return {
    filtered,
    filter,
    stats,
    activeMediaFilter,
    activeStatusFilter,
    hasActiveFilters,
    mediaFilterOptions,
    statusFilterOptions,
    setMediaFilter,
    setStatusFilter,
    setSearchQuery,
    updateFilter,
    resetFilters,
  };
}
