/**
 * Result Actions Configuration Types
 */

export interface ResultActionButton {
  enabled?: boolean;
  label?: string;
  icon?: string;
  variant?: "primary" | "secondary" | "outline" | "text";
  position?: "top" | "bottom";
}

export interface ResultActionsConfig {
  share?: ResultActionButton;
  save?: ResultActionButton;
  retry?: ResultActionButton;
  layout?: "horizontal" | "vertical" | "grid";
  buttonSpacing?: number;
  spacing?: {
    paddingHorizontal?: number;
    paddingBottom?: number;
  };
}

export const DEFAULT_ACTIONS_CONFIG: ResultActionsConfig = {
  share: {
    enabled: true,
    icon: "share-social",
    variant: "primary",
    position: "bottom",
  },
  save: {
    enabled: true,
    icon: "download",
    variant: "secondary",
    position: "bottom",
  },
  retry: {
    enabled: true,
    icon: "refresh",
    variant: "outline",
    position: "bottom",
  },
  layout: "horizontal",
  buttonSpacing: 10,
  spacing: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
};
