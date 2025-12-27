/**
 * useCreationsFilter Hook
 * Combines status and media filters to filter creations
 * SOLID: Combines filters, delegates individual filter logic to separate hooks
 */

import { useMemo } from "react";
import type { Creation } from "../../domain/entities/Creation";
import { getCategoryForType } from "../../domain/types/creation-categories";

interface UseCreationsFilterProps {
  readonly creations: Creation[] | undefined;
  readonly statusFilter?: string;
  readonly mediaFilter?: string;
}

interface UseCreationsFilterReturn {
  readonly filtered: Creation[];
  readonly isFiltered: boolean;
  readonly activeFiltersCount: number;
}

export function useCreationsFilter({
  creations,
  statusFilter = "all",
  mediaFilter = "all"
}: UseCreationsFilterProps): UseCreationsFilterReturn {

  const filtered = useMemo(() => {
    if (!creations) return [];

    return creations.filter((creation) => {
      // Status filter
      if (statusFilter !== "all" && creation.status !== statusFilter) {
        return false;
      }

      // Media filter
      if (mediaFilter !== "all") {
        const category = getCategoryForType(creation.type as Parameters<typeof getCategoryForType>[0]);
        if (category !== mediaFilter) {
          return false;
        }
      }

      return true;
    });
  }, [creations, statusFilter, mediaFilter]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (statusFilter !== "all") count++;
    if (mediaFilter !== "all") count++;
    return count;
  }, [statusFilter, mediaFilter]);

  const isFiltered = statusFilter !== "all" || mediaFilter !== "all";

  return {
    filtered,
    isFiltered,
    activeFiltersCount
  };
}
