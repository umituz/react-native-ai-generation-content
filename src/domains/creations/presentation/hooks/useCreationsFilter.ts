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

export function useCreationsFilter({
  creations,
  defaultFilterId = "all"
}: UseCreationsFilterProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([defaultFilterId]);

  const filtered = useMemo(() => {
    if (!creations) return [];
    if (selectedIds.includes(defaultFilterId)) return creations;

    return creations.filter((c) =>
      selectedIds.includes(c.type) ||
      selectedIds.some(id => (c as any).metadata?.tags?.includes(id))
    );
  }, [creations, selectedIds, defaultFilterId]);

  const toggleFilter = useCallback((filterId: string, multiSelect: boolean = false) => {
    setSelectedIds(prev => {
      // If selecting 'all', clear everything else
      if (filterId === defaultFilterId) return [defaultFilterId];

      let newIds: string[];
      if (!multiSelect) {
        // Single select
        // If we tap the already selected item in single mode, should we Deselect it? 
        // Typically in radio-button style filters, no. But let's assume valid toggling behavior suitable for the UI.
        // If single select, simply switch to the new one.
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
