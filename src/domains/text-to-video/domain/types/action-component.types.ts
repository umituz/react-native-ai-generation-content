/**
 * Action Component Types
 */

import type { ViewStyle } from "react-native";

export interface GenerateButtonProps {
  isGenerating: boolean;
  isDisabled: boolean;
  onPress: () => void;
  credits?: number;
  label: string;
  generatingLabel: string;
  style?: ViewStyle;
}
