/**
 * HeroSection Component
 * Generic hero section with solid background and optional icon
 * Props-driven for 100+ apps compatibility
 */

import React from "react";
import { View, StyleSheet, type ViewStyle } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";

export interface AIGenerationHeroProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly iconName?: string;
  readonly style?: ViewStyle;
}

export const AIGenerationHero: React.FC<AIGenerationHeroProps> = ({
  title,
  subtitle,
  iconName,
  style,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.heroBackground,
          { backgroundColor: tokens.colors.primary },
        ]}
      >
        {iconName && (
          <View
            style={[
              styles.iconWrapper,
              { backgroundColor: tokens.colors.surface },
            ]}
          >
            <AtomicIcon
              name={iconName}
              size="xl"
              customColor={tokens.colors.primary}
            />
          </View>
        )}
        <AtomicText
          type="headlineSmall"
          style={[styles.title, { color: tokens.colors.textInverse }]}
        >
          {title}
        </AtomicText>
        {subtitle && (
          <AtomicText
            type="bodyMedium"
            style={[styles.subtitle, { color: tokens.colors.textInverse }]}
          >
            {subtitle}
          </AtomicText>
        )}
      </View>
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
  heroBackground: {
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    textAlign: "center",
    fontWeight: "700",
  },
  subtitle: {
    textAlign: "center",
    marginTop: 8,
  },
});
