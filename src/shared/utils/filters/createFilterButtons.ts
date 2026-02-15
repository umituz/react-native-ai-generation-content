/**
 * Generic Filter Button Factory
 * Creates filter button configurations from data
 */

export interface FilterButtonConfig<T = string> {
  id: T;
  label: string;
  icon: string;
  active: boolean;
  onPress: () => void;
}

export interface FilterItemInput<T = string> {
  id: T;
  label: string;
  icon: string;
}

/**
 * Creates filter buttons from configuration
 * @param items - Array of filter items with id, label, and icon
 * @param activeFilter - Currently active filter id
 * @param onSelect - Callback when a filter is selected
 * @returns Array of filter button configurations
 */
export function createFilterButtons<T extends string = string>(
  items: readonly FilterItemInput<T>[],
  activeFilter: T,
  onSelect: (filter: T) => void
): FilterButtonConfig<T>[] {
  return items.map((item) => ({
    id: item.id,
    label: item.label,
    icon: item.icon,
    active: activeFilter === item.id,
    onPress: () => onSelect(item.id),
  }));
}

/**
 * Creates filter buttons from a record/map
 * @param filterMap - Record of filter id to label and icon
 * @param activeFilter - Currently active filter id
 * @param onSelect - Callback when a filter is selected
 * @returns Array of filter button configurations
 */
export function createFilterButtonsFromMap<T extends string = string>(
  filterMap: Record<T, { label: string; icon: string }>,
  activeFilter: T,
  onSelect: (filter: T) => void
): FilterButtonConfig<T>[] {
  return Object.entries(filterMap).map(([id, config]) => ({
    id: id as T,
    label: (config as { label: string; icon: string }).label,
    icon: (config as { label: string; icon: string }).icon,
    active: activeFilter === id,
    onPress: () => onSelect(id as T),
  }));
}
