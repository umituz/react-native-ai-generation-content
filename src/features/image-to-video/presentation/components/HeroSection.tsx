/**
 * Hero Section Component
 * Generic hero section with gradient background
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";

export interface HeroSectionProps {
  title: string;
  subtitle: string;
  iconName?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  iconName = "image-outline",
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={componentStyles.container}>
      <LinearGradient
        colors={[
          tokens.colors.secondary ?? tokens.colors.info,
          tokens.colors.primary,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={componentStyles.gradient}
      >
        <View style={componentStyles.iconContainer}>
          <AtomicIcon name={iconName as never} size="xl" color="onSurface" />
        </View>
        <AtomicText
          type="headlineSmall"
          style={[componentStyles.title, { color: tokens.colors.textInverse }]}
        >
          {title}
        </AtomicText>
        <AtomicText
          type="bodyMedium"
          style={[componentStyles.subtitle, { color: tokens.colors.textInverse }]}
        >
          {subtitle}
        </AtomicText>
      </LinearGradient>
    </View>
  );
};

const componentStyles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 20,
    overflow: "hidden",
  },
  gradient: {
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginTop: 16,
    fontWeight: "700",
  },
  subtitle: {
    textAlign: "center",
    marginTop: 8,
    opacity: 0.9,
  },
});
