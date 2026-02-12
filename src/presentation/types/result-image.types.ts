/**
 * Result Image Configuration Types
 */

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

export const DEFAULT_IMAGE_CONFIG: ResultImageConfig = {
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
};
