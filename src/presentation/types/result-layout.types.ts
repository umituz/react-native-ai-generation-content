/**
 * Result Layout Configuration Types
 */

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

export const DEFAULT_LAYOUT_CONFIG: ResultLayoutConfig = {
  borderRadius: 28,
  scrollEnabled: true,
  contentPadding: {
    top: 24,
    bottom: 20,
    horizontal: 0,
  },
};
