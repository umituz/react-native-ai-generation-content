/**
 * Filter Buttons Utility
 * Creates filter buttons for the gallery screen
 */

export interface FilterButton {
  readonly id: string;
  readonly label: string;
  readonly icon: string;
  readonly isActive: boolean;
  readonly onPress: () => void;
}

export interface FilterButtonsConfig {
  readonly showStatusFilter: boolean;
  readonly showMediaFilter: boolean;
  readonly statusFilterActive: boolean;
  readonly mediaFilterActive: boolean;
  readonly statusFilterLabel: string;
  readonly mediaFilterLabel: string;
  readonly onStatusFilterPress: () => void;
  readonly onMediaFilterPress: () => void;
}

/**
 * Creates filter buttons array for gallery header
 */
export function createFilterButtons(config: FilterButtonsConfig): FilterButton[] {
  const buttons: FilterButton[] = [];

  if (config.showStatusFilter) {
    buttons.push({
      id: "status",
      label: config.statusFilterLabel,
      icon: "list-outline",
      isActive: config.statusFilterActive,
      onPress: config.onStatusFilterPress,
    });
  }

  if (config.showMediaFilter) {
    buttons.push({
      id: "media",
      label: config.mediaFilterLabel,
      icon: "grid-outline",
      isActive: config.mediaFilterActive,
      onPress: config.onMediaFilterPress,
    });
  }

  return buttons;
}

/**
 * Creates item title for creation card
 */
export function createItemTitle(
  item: { type: string; metadata?: Record<string, unknown> },
  config: {
    readonly types?: readonly { id: string; labelKey?: string }[];
    readonly getCreationTitle?: (params: { type: string; metadata?: Record<string, unknown> }) => string;
  },
  t: (key: string) => string
): string {
  if (config.getCreationTitle) {
    return config.getCreationTitle({ type: item.type, metadata: item.metadata });
  }

  const typeConfig = config.types?.find((tc) => tc.id === item.type);
  if (typeConfig?.labelKey) {
    return t(typeConfig.labelKey);
  }

  return item.type.split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}
