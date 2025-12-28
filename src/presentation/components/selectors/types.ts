/**
 * Selector Component Types
 * Generic types for selector UI components
 */

/**
 * Style option for StyleSelector
 * All fields are required - app provides translated values
 */
export interface StyleOption {
  id: string;
  name: string;
  description?: string;
  thumbnail?: string;
  icon?: string;
}

/**
 * Aspect ratio option for AspectRatioSelector
 * App provides translated name and description
 */
export interface AspectRatioOption {
  id: "16:9" | "9:16" | "1:1";
  name: string;
  icon: string;
  description: string;
}

/**
 * Duration value type (seconds)
 */
export type DurationValue = number;
