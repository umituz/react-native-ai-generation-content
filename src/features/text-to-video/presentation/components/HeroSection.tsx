/**
 * HeroSection Component
 * Single Responsibility: Display hero banner for text-to-video feature
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
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
    <LinearGradient
      colors={[tokens.colors.secondary, tokens.colors.primary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, style]}
    >
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
    </LinearGradient>
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
