/**
 * useCreationsFilter Hook
 * Handles filtering of creations by type
 */

import { useState, useMemo, useCallback } from "react";
import type { Creation } from "../../domain/entities/Creation";

interface UseCreationsFilterProps {
  readonly creations: Creation[] | undefined;
  readonly defaultFilterId?: string;
}

interface CreationWithTags extends Creation {
  readonly metadata?: {
    readonly tags?: string[];
    readonly [key: string]: unknown;
  };
}

export function useCreationsFilter({
  creations,
  defaultFilterId = "all"
}: UseCreationsFilterProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([defaultFilterId]);

  const filtered = useMemo(() => {
    if (!creations) return [];
    if (selectedIds.includes(defaultFilterId)) return creations;

    return creations.filter((c) => {
      const creation = c as CreationWithTags;
      return (
        selectedIds.includes(creation.type) ||
        selectedIds.some(id => creation.metadata?.tags?.includes(id))
      );
    });
  }, [creations, selectedIds, defaultFilterId]);

  const toggleFilter = useCallback((filterId: string, multiSelect = false) => {
    setSelectedIds(prev => {
      // If selecting 'all', clear everything else
      if (filterId === defaultFilterId) return [defaultFilterId];

      let newIds: string[];
      if (!multiSelect) {
        // Single select
        if (prev.includes(filterId) && prev.length === 1) return prev;
        newIds = [filterId];
      } else {
        // Multi select
        if (prev.includes(filterId)) {
          newIds = prev.filter(id => id !== filterId);
        } else {
          // Remove 'all' if present
          newIds = [...prev.filter(id => id !== defaultFilterId), filterId];
        }
      }

      // If nothing selected, revert to 'all'
      if (newIds.length === 0) return [defaultFilterId];
      return newIds;
    });
  }, [defaultFilterId]);

  const clearFilters = useCallback(() => {
    setSelectedIds([defaultFilterId]);
  }, [defaultFilterId]);

  return {
    filtered,
    selectedIds,
    toggleFilter,
    clearFilters,
    isFiltered: !selectedIds.includes(defaultFilterId),
  };
}
