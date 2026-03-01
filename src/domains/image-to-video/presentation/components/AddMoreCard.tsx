/**
 * AddMoreCard Component
 * Displays "Add More" button in the image grid
 */

import React from "react";
import { TouchableOpacity } from "react-native";
import { AtomicIcon, AtomicText } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import type { ImageSelectionGridStyles } from "./ImageSelectionGrid.styles";

interface AddMoreCardProps {
  styles: ImageSelectionGridStyles;
  addMoreText: string;
  onPress: () => void;
}

export function AddMoreCard({
  styles,
  addMoreText,
  onPress,
}: AddMoreCardProps) {
  const tokens = useAppDesignTokens();

  return (
    <TouchableOpacity
      style={[
        styles.addMoreCard,
        {
          backgroundColor: tokens.colors.surface,
          borderColor: tokens.colors.borderLight,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <AtomicIcon name="add" size="lg" color="primary" />
      <AtomicText
        type="labelSmall"
        style={[
          styles.addMoreText,
          { color: tokens.colors.primary },
        ]}
      >
        {addMoreText}
      </AtomicText>
    </TouchableOpacity>
  );
}
