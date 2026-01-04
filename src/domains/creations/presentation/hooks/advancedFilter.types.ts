/**
 * Advanced Filter Types
 * Type definitions for advanced filtering hook
 */

import type { CreationFilter, CreationStats, FilterOption } from "../../domain/types";
import type { CreationCategory, CreationStatus, CreationTypeId } from "../../domain/types";

export interface FilterableCreation {
  id: string;
  type?: string;
  status?: string;
  prompt?: string;
  createdAt?: Date | number;
  updatedAt?: Date | number;
  metadata?: Record<string, unknown>;
}

export interface UseAdvancedFilterProps<T extends FilterableCreation> {
  creations: T[] | undefined;
  initialFilter?: Partial<CreationFilter>;
}

export interface UseAdvancedFilterReturn<T extends FilterableCreation> {
  filtered: T[];
  filter: CreationFilter;
  stats: CreationStats;
  activeMediaFilter: string;
  activeStatusFilter: string;
  hasActiveFilters: boolean;
  mediaFilterOptions: FilterOption[];
  statusFilterOptions: FilterOption[];
  setMediaFilter: (filter: CreationCategory | CreationTypeId) => void;
  setStatusFilter: (status: CreationStatus | "all") => void;
  setSearchQuery: (query: string) => void;
  updateFilter: (update: Partial<CreationFilter>) => void;
  resetFilters: () => void;
}
