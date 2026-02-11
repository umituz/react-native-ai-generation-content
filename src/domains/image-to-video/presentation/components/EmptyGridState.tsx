/**
 * EmptyGridState Component
 * Displays empty state when no images are selected
 */

import React from "react";
import { View, TouchableOpacity } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import type { ImageSelectionGridStyles } from "./ImageSelectionGrid.styles";
import type { ImageSelectionGridTranslations } from "./ImageSelectionGrid.types";

interface EmptyGridStateProps {
  styles: ImageSelectionGridStyles;
  maxImages: number;
  translations: ImageSelectionGridTranslations;
  onSelectImages: () => void;
}

export function EmptyGridState({
  styles,
  maxImages,
  translations,
  onSelectImages,
}: EmptyGridStateProps) {
  const tokens = useAppDesignTokens();

  return (
    <View style={styles.section}>
      <AtomicText
        type="bodyMedium"
        style={[styles.label, { color: tokens.colors.textPrimary }]}
      >
        {translations.selectedImages} (0/{maxImages})
      </AtomicText>
      <TouchableOpacity
        style={[
          styles.uploadBox,
          {
            backgroundColor: tokens.colors.surface,
            borderColor: tokens.colors.borderLight,
          },
        ]}
        onPress={onSelectImages}
        activeOpacity={0.7}
      >
        <AtomicIcon name="cloud-upload-outline" size="xl" color="primary" />
        <AtomicText
          type="bodyMedium"
          style={[
            styles.uploadText,
            { color: tokens.colors.primary },
          ]}
        >
          {translations.selectImages}
        </AtomicText>
        <AtomicText
          type="labelSmall"
          style={{ color: tokens.colors.textSecondary }}
        >
          {translations.chooseUpTo.replace("{max}", String(maxImages))}
        </AtomicText>
      </TouchableOpacity>
    </View>
  );
}
