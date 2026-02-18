/**
 * Button Style Utility
 * Calculates button styles based on variant
 */

import type { DesignTokens } from "@umituz/react-native-design-system";

interface ButtonStyle {
  backgroundColor: string;
  color: string;
  textColor: string;
  borderWidth?: number;
  borderColor?: string;
}

export function getButtonStyle(
  variant: string | undefined,
  tokens: DesignTokens
): ButtonStyle {
  switch (variant) {
    case "primary":
      return {
        backgroundColor: tokens.colors.primary,
        color: tokens.colors.onPrimary,
        textColor: tokens.colors.onPrimary,
      };
    case "secondary":
      return {
        backgroundColor: tokens.colors.surface,
        borderWidth: 2,
        borderColor: tokens.colors.primary,
        color: tokens.colors.primary,
        textColor: tokens.colors.primary,
      };
    case "outline":
      return {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: tokens.colors.borderLight,
        color: tokens.colors.textPrimary,
        textColor: tokens.colors.textPrimary,
      };
    case "text":
      return {
        backgroundColor: "transparent",
        color: tokens.colors.primary,
        textColor: tokens.colors.primary,
      };
    default:
      return {
        backgroundColor: tokens.colors.primary,
        color: tokens.colors.onPrimary,
        textColor: tokens.colors.onPrimary,
      };
  }
}
