/**
 * useGalleryFilters Hook
 * Manages all filter state and modals for gallery screen
 * SOLID: Coordinates filter hooks without business logic
 */

import { useState, useCallback } from "react";
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
  t
}: UseGalleryFiltersProps): UseGalleryFiltersReturn {
  const [statusFilterVisible, setStatusFilterVisible] = useState(false);
  const [mediaFilterVisible, setMediaFilterVisible] = useState(false);

  const statusFilter = useFilter({ options: statusOptions, t });
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
