/**
 * Result Header Configuration Types
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

export const DEFAULT_HEADER_CONFIG: ResultHeaderConfig = {
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
};
