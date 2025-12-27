/**
 * useMediaFilter Hook
 * Handles media type filtering (image, video, voice)
 * SOLID: Single Responsibility - Only handles media filter state
 */

import { useState, useCallback, useMemo } from "react";
import type { FilterOption } from "../../domain/types/creation-filter";

interface UseMediaFilterProps {
  readonly options: FilterOption[];
  readonly t: (key: string) => string;
  readonly defaultId?: string;
}

interface UseMediaFilterReturn {
  readonly selectedId: string;
  readonly filterOptions: FilterOption[];
  readonly hasActiveFilter: boolean;
  readonly selectFilter: (id: string) => void;
  readonly clearFilter: () => void;
}

export function useMediaFilter({
  options,
  t,
  defaultId = "all"
}: UseMediaFilterProps): UseMediaFilterReturn {
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
