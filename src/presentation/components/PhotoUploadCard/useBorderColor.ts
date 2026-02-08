/**
 * useBorderColor Hook
 * Calculates border color based on validation state
 */

import { useMemo } from "react";
import { useAppDesignTokens } from "@umituz/react-native-design-system";

interface UseBorderColorParams {
  isValidating: boolean;
  isValid: boolean | null;
  showValidationStatus: boolean;
}

export function useBorderColor({
  isValidating,
  isValid,
  showValidationStatus,
}: UseBorderColorParams): string {
  const tokens = useAppDesignTokens();

  return useMemo(() => {
    if (!showValidationStatus) {
      return tokens.colors.borderLight;
    }
    if (isValidating) return tokens.colors.primary;
    if (isValid === true) return tokens.colors.success;
    if (isValid === false) return tokens.colors.error;
    return tokens.colors.borderLight;
  }, [isValidating, isValid, showValidationStatus, tokens.colors.borderLight, tokens.colors.primary, tokens.colors.success, tokens.colors.error]);
}
