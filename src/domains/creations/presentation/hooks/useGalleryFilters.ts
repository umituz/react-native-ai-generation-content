/**
 * useGalleryFilters Hook
 * Manages all filter state and modals for gallery screen
 * SOLID: Coordinates filter hooks without business logic
 */

import { useState, useCallback, useMemo } from "react";
import type { Creation } from "../../domain/entities/Creation";
import type { FilterOption } from "../../domain/types/creation-filter";
import { useFilter } from "./useFilter";
import { useCreationsFilter } from "./useCreationsFilter";

interface UseGalleryFiltersProps {
  readonly creations: Creation[] | undefined;
  readonly statusOptions: FilterOption[];
  readonly mediaOptions: FilterOption[];
  readonly t: (key: string) => string;
}

interface UseGalleryFiltersReturn {
  readonly filtered: Creation[];
  readonly isFiltered: boolean;
  readonly activeFiltersCount: number;
  readonly processingCount: number;
  readonly statusFilterVisible: boolean;
  readonly mediaFilterVisible: boolean;
  readonly statusFilter: ReturnType<typeof useFilter>;
  readonly mediaFilter: ReturnType<typeof useFilter>;
  readonly openStatusFilter: () => void;
  readonly closeStatusFilter: () => void;
  readonly openMediaFilter: () => void;
  readonly closeMediaFilter: () => void;
  readonly clearAllFilters: () => void;
}

export function useGalleryFilters({
  creations,
  statusOptions,
  mediaOptions,
  t,
}: UseGalleryFiltersProps): UseGalleryFiltersReturn {
  const [statusFilterVisible, setStatusFilterVisible] = useState(false);
  const [mediaFilterVisible, setMediaFilterVisible] = useState(false);

  // Calculate processing count from creations status (single source of truth)
  const processingCount = useMemo(() => {
    if (!creations) return 0;
    return creations.filter(
      (c) => c.status === "processing" || c.status === "queued",
    ).length;
  }, [creations]);

  // Enrich status options with dynamic counts
  const enrichedStatusOptions = useMemo(() => {
    return statusOptions.map((option) => {
      if (option.id === "processing" && processingCount > 0) {
        return { ...option, count: processingCount };
      }
      return option;
    });
  }, [statusOptions, processingCount]);

  const statusFilter = useFilter({ options: enrichedStatusOptions, t });
  const mediaFilter = useFilter({ options: mediaOptions, t });

  const { filtered, isFiltered, activeFiltersCount } = useCreationsFilter({
    creations,
    statusFilter: statusFilter.selectedId,
    mediaFilter: mediaFilter.selectedId
  });

  const openStatusFilter = useCallback(() => setStatusFilterVisible(true), []);
  const closeStatusFilter = useCallback(() => setStatusFilterVisible(false), []);
  const openMediaFilter = useCallback(() => setMediaFilterVisible(true), []);
  const closeMediaFilter = useCallback(() => setMediaFilterVisible(false), []);

  const clearAllFilters = useCallback(() => {
    statusFilter.clearFilter();
    mediaFilter.clearFilter();
  }, [statusFilter, mediaFilter]);

  return {
    filtered,
    isFiltered,
    activeFiltersCount,
    processingCount,
    statusFilterVisible,
    mediaFilterVisible,
    statusFilter,
    mediaFilter,
    openStatusFilter,
    closeStatusFilter,
    openMediaFilter,
    closeMediaFilter,
    clearAllFilters
  };
}
