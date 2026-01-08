/**
 * Result Preview Configuration Types
 * Allows main apps to customize result preview appearance and behavior
 */

export interface ResultHeaderConfig {
  showTitle?: boolean;
  showDate?: boolean;
  showDateIcon?: boolean;
  titleAlignment?: "left" | "center" | "right";
  titleFontSize?: number;
  titleFontWeight?:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  dateBadgeStyle?: "outline" | "filled" | "minimal";
  spacing?: {
    marginBottom?: number;
    titleMarginBottom?: number;
    paddingHorizontal?: number;
  };
}

export interface ResultImageConfig {
  aspectRatio?: number;
  borderRadius?: number;
  showBadge?: boolean;
  badgePosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  badgeStyle?: "dark" | "light";
  badgeIcon?: string;
  spacing?: {
    marginBottom?: number;
    paddingHorizontal?: number;
  };
}

export interface ResultStoryConfig {
  showQuotes?: boolean;
  textAlignment?: "left" | "center" | "right";
  fontSize?: number;
  fontStyle?: "normal" | "italic";
  fontWeight?:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  borderStyle?: "outline" | "filled";
  spacing?: {
    marginBottom?: number;
    paddingHorizontal?: number;
    padding?: number;
  };
}

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

export interface ResultLayoutConfig {
  maxWidth?: number;
  maxHeight?: string | number;
  borderRadius?: number;
  backgroundColor?: string;
  scrollEnabled?: boolean;
  contentPadding?: {
    top?: number;
    bottom?: number;
    horizontal?: number;
  };
}

/**
 * Complete Result Preview Configuration
 * Pass this from main app to customize all aspects of result preview
 */
export interface ResultConfig {
  header?: ResultHeaderConfig;
  image?: ResultImageConfig;
  story?: ResultStoryConfig;
  actions?: ResultActionsConfig;
  layout?: ResultLayoutConfig;
}

/**
 * Default configuration for result preview
 * Used when no config is provided by main app
 */
export const DEFAULT_RESULT_CONFIG: ResultConfig = {
  header: {
    showTitle: true,
    showDate: true,
    showDateIcon: true,
    titleAlignment: "center",
    titleFontSize: 24,
    titleFontWeight: "800",
    dateBadgeStyle: "filled",
    spacing: {
      marginBottom: 20,
      titleMarginBottom: 12,
      paddingHorizontal: 24,
    },
  },
  image: {
    aspectRatio: 1,
    borderRadius: 20,
    showBadge: true,
    badgePosition: "top-right",
    badgeStyle: "dark",
    badgeIcon: "sparkles",
    spacing: {
      marginBottom: 20,
      paddingHorizontal: 20,
    },
  },
  story: {
    showQuotes: true,
    textAlignment: "center",
    fontSize: 14,
    fontStyle: "italic",
    fontWeight: "500",
    borderStyle: "filled",
    spacing: {
      marginBottom: 20,
      paddingHorizontal: 20,
      padding: 20,
    },
  },
  actions: {
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
      variant: "text",
      position: "top",
    },
    layout: "horizontal",
    buttonSpacing: 10,
    spacing: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
  },
  layout: {
    borderRadius: 28,
    scrollEnabled: true,
    contentPadding: {
      top: 24,
      bottom: 20,
      horizontal: 0,
    },
  },
};
