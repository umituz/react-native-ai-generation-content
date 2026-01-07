/**
 * PhotoUploadCard Type Definitions
 */

import type { StyleProp, ViewStyle } from "react-native";

export interface PhotoUploadCardConfig {
  aspectRatio?: number;
  borderRadius?: number;
  iconSize?: number;
  showValidationStatus?: boolean;
  allowChange?: boolean;
  borderStyle?: "solid" | "dashed";
}

export interface PhotoUploadCardProps {
  imageUri: string | null;
  onPress: () => void;
  isValidating?: boolean;
  isValid?: boolean | null;
  disabled?: boolean;
  config?: PhotoUploadCardConfig;
  translations?: {
    tapToUpload: string;
    selectPhoto: string;
    change: string;
    analyzing?: string;
  };
  title?: string;
  subtitle?: string;
  icon?: string;
  style?: StyleProp<ViewStyle>;
}

export const DEFAULT_CONFIG: PhotoUploadCardConfig = {
  aspectRatio: 1,
  borderRadius: 28,
  iconSize: 40,
  showValidationStatus: true,
  allowChange: true,
  borderStyle: "dashed",
};
