/**
 * useGalleryFilters Hook
 * Manages all filter state and modals for gallery screen
 * SOLID: Coordinates filter hooks without business logic
 */

import { useState, useCallback, useMemo } from "react";
import type { Creation } from "../../domain/entities/Creation";
import type { FilterOption } from "../../domain/types/creation-filter";
import type { BackgroundJob } from "../../../../domain/entities/job.types";
import { useFilter } from "./useFilter";
import { useCreationsFilter } from "./useCreationsFilter";

interface UseGalleryFiltersProps {
  readonly creations: Creation[] | undefined;
  readonly statusOptions: FilterOption[];
  readonly mediaOptions: FilterOption[];
  readonly t: (key: string) => string;
  /** Pending background jobs to include in status counts */
  readonly pendingJobs?: BackgroundJob[];
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
  t,
  pendingJobs = [],
}: UseGalleryFiltersProps): UseGalleryFiltersReturn {
  const [statusFilterVisible, setStatusFilterVisible] = useState(false);
  const [mediaFilterVisible, setMediaFilterVisible] = useState(false);

  // Calculate pending jobs count for status filter
  const processingJobsCount = useMemo(() => {
    return pendingJobs.filter(
      (job) => job.status === "processing" || job.status === "queued",
    ).length;
  }, [pendingJobs]);

  // Enrich status options with dynamic counts
  const enrichedStatusOptions = useMemo(() => {
    return statusOptions.map((option) => {
      if (option.id === "processing" && processingJobsCount > 0) {
        return { ...option, count: processingJobsCount };
      }
      return option;
    });
  }, [statusOptions, processingJobsCount]);

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
