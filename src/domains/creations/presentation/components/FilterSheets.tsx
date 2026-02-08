/**
 * Filter Sheets Components
 * Modal-based filter sheets for status and media type filtering
 */

import React from "react";
import { FilterSheet } from "@umituz/react-native-design-system";
import type { FilterOption } from "../../domain/types/creation-filter";

interface FilterSheetConfig {
  readonly visible: boolean;
  readonly onClose: () => void;
  readonly options: FilterOption[];
  readonly selectedId: string;
  readonly onSelect: (id: string) => void;
  readonly onClear: () => void;
  readonly title: string;
  readonly clearLabel?: string;
}

export const StatusFilterSheet: React.FC<FilterSheetConfig> = ({
  visible,
  onClose,
  options,
  selectedId,
  onSelect,
  onClear,
  title,
  clearLabel
}: FilterSheetConfig) => (
  <FilterSheet
    visible={visible}
    onClose={onClose}
    options={options}
    selectedIds={[selectedId]}
    onFilterPress={onSelect}
    onClearFilters={onClear}
    title={title}
    clearLabel={clearLabel}
  />
);

export const MediaFilterSheet: React.FC<FilterSheetConfig> = ({
  visible,
  onClose,
  options,
  selectedId,
  onSelect,
  onClear,
  title,
  clearLabel
}: FilterSheetConfig) => (
  <FilterSheet
    visible={visible}
    onClose={onClose}
    options={options}
    selectedIds={[selectedId]}
    onFilterPress={onSelect}
    onClearFilters={onClear}
    title={title}
    clearLabel={clearLabel}
  />
);
