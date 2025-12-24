/**
 * useCreationsFilter Hook
 * Handles filtering of creations by type, search, and favorites
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
  const [searchQuery, setSearchQuery] = useState("");
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const filtered = useMemo(() => {
    if (!creations) return [];

    let result = creations;

    // 1. Filter by Favorites
    if (showOnlyFavorites) {
      result = result.filter(c => c.isFavorite);
    }

    // 2. Filter by Category/Type
    if (!selectedIds.includes(defaultFilterId)) {
      result = result.filter((c) =>
        selectedIds.includes(c.type) ||
        selectedIds.some(id => (c as any).metadata?.tags?.includes(id))
      );
    }

    // 3. Filter by Search Query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(c =>
        c.prompt?.toLowerCase().includes(query) ||
        c.type.toLowerCase().includes(query)
      );
    }

    return result;
  }, [creations, selectedIds, defaultFilterId, searchQuery, showOnlyFavorites]);

  const toggleFilter = useCallback((filterId: string, multiSelect: boolean = false) => {
    setSelectedIds(prev => {
      if (filterId === defaultFilterId) return [defaultFilterId];

      let newIds: string[];
      if (!multiSelect) {
        if (prev.includes(filterId) && prev.length === 1) return prev;
        newIds = [filterId];
      } else {
        if (prev.includes(filterId)) {
          newIds = prev.filter(id => id !== filterId);
        } else {
          newIds = [...prev.filter(id => id !== defaultFilterId), filterId];
        }
      }

      if (newIds.length === 0) return [defaultFilterId];
      return newIds;
    });
  }, [defaultFilterId]);

  const clearFilters = useCallback(() => {
    setSelectedIds([defaultFilterId]);
    setSearchQuery("");
    setShowOnlyFavorites(false);
  }, [defaultFilterId]);

  return {
    filtered,
    selectedIds,
    searchQuery,
    setSearchQuery,
    showOnlyFavorites,
    setShowOnlyFavorites,
    toggleFilter,
    clearFilters,
    isFiltered: !selectedIds.includes(defaultFilterId) || !!searchQuery || showOnlyFavorites,
  };
}
