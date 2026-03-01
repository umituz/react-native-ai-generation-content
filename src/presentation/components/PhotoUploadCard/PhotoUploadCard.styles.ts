/**
 * PhotoUploadCard Styles
 */

import { StyleSheet } from "react-native";
import type { DesignTokens } from "@umituz/react-native-design-system/theme";
import type { PhotoUploadCardConfig } from "./PhotoUploadCard.types";

export type PhotoUploadCardStyles = ReturnType<typeof createPhotoUploadCardStyles>;

interface CreateStylesParams {
  tokens: DesignTokens;
  imageUri: string | null;
  config: PhotoUploadCardConfig;
}

export function createPhotoUploadCardStyles({
  tokens,
  imageUri,
  config,
}: CreateStylesParams) {
  return StyleSheet.create({
    container: {
      marginHorizontal: 24,
      marginBottom: 24,
    },
    card: {
      aspectRatio: config.aspectRatio,
      backgroundColor: tokens.colors.surfaceSecondary,
      borderRadius: config.borderRadius,
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      borderWidth: 2,
      borderStyle: imageUri ? "solid" : config.borderStyle,
    },
    placeholder: {
      alignItems: "center",
      padding: 32,
    },
    iconCircle: {
      width: 88,
      height: 88,
      borderRadius: 44,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
      borderWidth: 2,
      borderColor: tokens.colors.borderLight,
      backgroundColor: tokens.colors.surfaceSecondary,
    },
    title: {
      fontSize: 20,
      fontWeight: "700",
      color: tokens.colors.textPrimary,
      marginBottom: 8,
      letterSpacing: 0.3,
    },
    subtitle: {
      fontSize: 14,
      color: tokens.colors.textSecondary,
      textAlign: "center",
      lineHeight: 20,
      maxWidth: 240,
    },
    image: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },
    imageOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: tokens.colors.modalOverlay,
      opacity: 0.3,
    },
    changeButton: {
      position: "absolute",
      bottom: 20,
      right: 20,
      backgroundColor: tokens.colors.surface,
      paddingHorizontal: 18,
      paddingVertical: 12,
      borderRadius: 28,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    changeText: {
      fontSize: 14,
      fontWeight: "700",
      color: tokens.colors.primary,
    },
    validatingContainer: {
      alignItems: "center",
      padding: 32,
    },
    validatingText: {
      fontSize: 16,
      fontWeight: "600",
      color: tokens.colors.primary,
      marginTop: 20,
    },
    pulseRing: {
      position: "absolute",
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: tokens.colors.borderLight,
    },
  });
}
