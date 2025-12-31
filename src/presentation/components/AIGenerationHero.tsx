/**
 * HeroSection Component
 * Generic hero section with gradient background and optional icon
 * Props-driven for 100+ apps compatibility
 */

import React from "react";
import { View, StyleSheet, type ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";

export interface AIGenerationHeroProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly iconName?: string;
  readonly gradientColors?: readonly [string, string, ...string[]];
  readonly style?: ViewStyle;
}

export const AIGenerationHero: React.FC<AIGenerationHeroProps> = ({
  title,
  subtitle,
  iconName,
  gradientColors = ["#00FF88", "#10B981"],
  style,
}) => {
  const tokens = useAppDesignTokens();

  const finalColors = gradientColors || [
    tokens.colors.secondary ?? tokens.colors.info,
    tokens.colors.primary,
  ];

  return (
    <View style={[styles.container, style]}>
      <LinearGradient
        colors={finalColors as [string, string, ...string[]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {iconName && (
          <View style={styles.iconWrapper}>
            <AtomicIcon name={iconName} size="xl" color="onSurface" />
          </View>
        )}
        <AtomicText type="headlineSmall" style={styles.title}>
          {title}
        </AtomicText>
        {subtitle && (
          <AtomicText type="bodyMedium" style={styles.subtitle}>
            {subtitle}
          </AtomicText>
        )}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
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
  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "700",
  },
  subtitle: {
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 8,
    opacity: 0.9,
  },
});
