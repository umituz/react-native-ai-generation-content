/**
 * PlaceholderContent Component
 * Displays upload placeholder with icon and text
 */

import React from "react";
import { View } from "react-native";
import { AtomicIcon, AtomicText } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import type { PhotoUploadCardStyles } from "./PhotoUploadCard.styles";

interface PlaceholderContentProps {
  styles: PhotoUploadCardStyles;
  title: string;
  subtitle: string;
  icon: string;
  iconSize: number;
}

export function PlaceholderContent({
  styles,
  title,
  subtitle,
  icon,
  iconSize,
}: PlaceholderContentProps) {
  const tokens = useAppDesignTokens();

  return (
    <View style={styles.placeholder}>
      <View style={styles.iconCircle}>
        <AtomicIcon
          name={icon}
          size={iconSize}
          customColor={tokens.colors.primary}
        />
      </View>
      <AtomicText style={styles.title}>{title}</AtomicText>
      <AtomicText style={styles.subtitle}>{subtitle}</AtomicText>
    </View>
  );
}
