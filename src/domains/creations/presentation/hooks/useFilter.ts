/**
 * useFilter Hook
 * Generic filter state management for any filter type
 * SOLID: Single Responsibility - Only handles filter state
 * DRY: Replaces duplicate useMediaFilter and useStatusFilter
 */

import { useState, useCallback, useMemo } from "react";
import type { FilterOption } from "../../domain/types/creation-filter";

export interface UseFilterProps {
  readonly options: FilterOption[];
  readonly t: (key: string) => string;
  readonly defaultId?: string;
}

export interface UseFilterReturn {
  readonly selectedId: string;
  readonly filterOptions: FilterOption[];
  readonly hasActiveFilter: boolean;
  readonly selectFilter: (id: string) => void;
  readonly clearFilter: () => void;
}

export function useFilter({
  options,
  t,
  defaultId = "all"
}: UseFilterProps): UseFilterReturn {
  const [selectedId, setSelectedId] = useState(defaultId);

  const filterOptions = useMemo(() =>
    options.map(opt => ({
      ...opt,
      label: opt.labelKey ? t(opt.labelKey) : opt.label
    })),
    [options, t]
  );

  const selectFilter = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const clearFilter = useCallback(() => {
    setSelectedId(defaultId);
  }, [defaultId]);

  return {
    selectedId,
    filterOptions,
    hasActiveFilter: selectedId !== defaultId,
    selectFilter,
    clearFilter
  };
}

// Backward compatibility aliases
export const useMediaFilter = useFilter;
export const useStatusFilter = useFilter;
