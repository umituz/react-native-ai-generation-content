/**
 * CreationsFilterBar Type Definitions
 */

/**
 * Filter button configuration
 */
export interface FilterButton {
  /** Unique filter identifier */
  id: string;
  /** Display label */
  label: string;
  /** Icon name */
  icon?: string;
  /** Is this filter active */
  active: boolean;
  /** Handler when pressed */
  onPress: () => void;
}

export interface CreationsFilterBarProps {
  /** Array of filter buttons */
  readonly filters: FilterButton[];
  /** Show clear button when any filter is active */
  readonly showClearButton?: boolean;
  /** Clear button label */
  readonly clearLabel?: string;
  /** Clear all filters handler */
  readonly onClear?: () => void;
  /** Has any active filters (for showing clear button) */
  readonly hasActiveFilters?: boolean;
}

export interface MediaFilterLabels {
  all: string;
  images: string;
  videos: string;
  voice: string;
}

export interface StatusFilterLabels {
  all: string;
  completed: string;
  pending: string;
  processing: string;
  failed: string;
}
