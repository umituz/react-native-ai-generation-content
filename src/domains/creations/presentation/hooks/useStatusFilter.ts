/**
 * useStatusFilter Hook
 * Handles status filtering (completed, pending, processing, failed)
 * SOLID: Single Responsibility - Only handles status filter state
 */

import { useState, useCallback, useMemo } from "react";
import type { FilterOption } from "../../domain/types/creation-filter";

interface UseStatusFilterProps {
  readonly options: FilterOption[];
  readonly t: (key: string) => string;
  readonly defaultId?: string;
}

interface UseStatusFilterReturn {
  readonly selectedId: string;
  readonly filterOptions: FilterOption[];
  readonly hasActiveFilter: boolean;
  readonly selectFilter: (id: string) => void;
  readonly clearFilter: () => void;
}

export function useStatusFilter({
  options,
  t,
  defaultId = "all"
}: UseStatusFilterProps): UseStatusFilterReturn {
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
