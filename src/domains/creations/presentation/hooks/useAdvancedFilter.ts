/**
 * useAdvancedFilter Hook
 * Advanced filtering with category, status, and search support
 */

import { useState, useMemo, useCallback } from "react";
import type { CreationFilter, FilterOption } from "../../domain/types";
import {
  DEFAULT_CREATION_FILTER,
  MEDIA_FILTER_OPTIONS,
  STATUS_FILTER_OPTIONS,
  calculateCreationStats,
} from "../../domain/types";
import type { CreationCategory, CreationStatus, CreationTypeId } from "../../domain/types";
import type {
  FilterableCreation,
  UseAdvancedFilterProps,
  UseAdvancedFilterReturn,
} from "./advancedFilter.types";
import { applyAllFilters } from "./filterHelpers";

const EMPTY_STATS = {
  total: 0,
  byCategory: { all: 0, image: 0, video: 0, voice: 0 },
  byStatus: { pending: 0, queued: 0, processing: 0, completed: 0, failed: 0 },
  byType: {},
};

export function useAdvancedFilter<T extends FilterableCreation>({
  creations,
  initialFilter,
}: UseAdvancedFilterProps<T>): UseAdvancedFilterReturn<T> {
  const [filter, setFilter] = useState<CreationFilter>({
    ...DEFAULT_CREATION_FILTER,
    ...initialFilter,
  });

  const stats = useMemo(() => {
    if (!creations) return EMPTY_STATS;
    return calculateCreationStats(creations);
  }, [creations]);

  const filtered = useMemo(() => {
    if (!creations) return [];
    return applyAllFilters(creations, filter);
  }, [creations, filter]);

  const mediaFilterOptions = useMemo<FilterOption[]>(() => {
    return MEDIA_FILTER_OPTIONS.map((opt) => ({
      ...opt,
      count:
        opt.id === "all"
          ? stats.total
          : stats.byCategory[opt.id as CreationCategory] || 0,
    }));
  }, [stats]);

  const statusFilterOptions = useMemo<FilterOption[]>(() => {
    return STATUS_FILTER_OPTIONS.map((opt) => ({
      ...opt,
      count:
        opt.id === "all"
          ? stats.total
          : stats.byStatus[opt.id as CreationStatus] || 0,
    }));
  }, [stats]);

  const setMediaFilter = useCallback(
    (type: CreationCategory | CreationTypeId) => {
      setFilter((prev) => ({ ...prev, type }));
    },
    [],
  );

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

  const hasActiveFilters = useMemo(
    () =>
      filter.type !== "all" || filter.status !== "all" || !!filter.searchQuery,
    [filter.type, filter.status, filter.searchQuery]
  );
  const activeMediaFilter = useMemo(
    () => (filter.type as string) || "all",
    [filter.type]
  );
  const activeStatusFilter = useMemo(
    () => (filter.status as string) || "all",
    [filter.status]
  );

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
