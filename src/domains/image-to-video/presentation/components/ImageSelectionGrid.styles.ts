/**
 * ImageSelectionGrid Styles
 */

import { StyleSheet } from "react-native";
import type { DesignTokens } from "@umituz/react-native-design-system/theme";

export function createImageSelectionGridStyles(_tokens: DesignTokens) {
  return StyleSheet.create({
    section: {
      padding: 16,
      marginBottom: 8,
    },
    label: {
      fontWeight: "600",
      marginBottom: 12,
    },
    uploadBox: {
      padding: 48,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      borderStyle: "dashed",
    },
    uploadText: {
      fontWeight: "600",
      marginTop: 12,
    },
    scroll: {
      marginHorizontal: -16,
      paddingHorizontal: 16,
    },
    imageCard: {
      width: 120,
      height: 120,
      borderRadius: 12,
      marginRight: 12,
      position: "relative",
    },
    imagePreview: {
      width: "100%",
      height: "100%",
      borderRadius: 12,
    },
    removeButton: {
      position: "absolute",
      top: 6,
      right: 6,
      width: 24,
      height: 24,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    imageBadge: {
      position: "absolute",
      bottom: 6,
      left: 6,
      width: 24,
      height: 24,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    badgeText: {
      fontSize: 10,
    },
    addMoreCard: {
      width: 120,
      height: 120,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      borderStyle: "dashed",
    },
    addMoreText: {
      marginTop: 4,
    },
  });
}

export type ImageSelectionGridStyles = ReturnType<typeof createImageSelectionGridStyles>;
