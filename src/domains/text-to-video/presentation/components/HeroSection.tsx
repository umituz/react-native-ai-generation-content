/**
 * HeroSection Component
 * Single Responsibility: Display hero banner for text-to-video feature
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import type { HeroSectionProps } from "../../domain/types";

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  icon,
  style,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={[styles.container, { backgroundColor: tokens.colors.primary }, style]}>
      <View style={styles.iconContainer}>
        <AtomicIcon
          name={icon || "sparkles-outline"}
          size="xl"
          color="textInverse"
        />
      </View>
      <AtomicText type="headlineSmall" color="textInverse" style={styles.title}>
        {title}
      </AtomicText>
      <AtomicText type="bodyMedium" color="textInverse" style={styles.subtitle}>
        {subtitle}
      </AtomicText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
  },
  iconContainer: {
    marginBottom: 12,
  },
  title: {
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    opacity: 0.9,
  },
});
