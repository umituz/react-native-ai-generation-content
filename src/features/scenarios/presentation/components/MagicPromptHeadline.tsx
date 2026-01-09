/**
 * MagicPromptHeadline Component
 * Headline section with highlighted text for Magic Prompt screen
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";

export interface MagicPromptHeadlineProps {
  readonly headlinePart1: string;
  readonly headlinePart2: string;
  readonly subtitle: string;
}

export const MagicPromptHeadline: React.FC<MagicPromptHeadlineProps> = ({
  headlinePart1,
  headlinePart2,
  subtitle,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <AtomicText
          type="headlineLarge"
          style={[styles.title, { color: tokens.colors.textPrimary }]}
        >
          {headlinePart1}{" "}
          <AtomicText
            type="headlineLarge"
            style={[
              styles.titleHighlight,
              { color: tokens.colors.textPrimary },
            ]}
          >
            {headlinePart2}
          </AtomicText>
        </AtomicText>
      </View>
      <AtomicText
        type="bodyLarge"
        style={[styles.subtitle, { color: tokens.colors.textSecondary }]}
      >
        {subtitle}
      </AtomicText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
  },
  titleRow: {
    marginBottom: 12,
  },
  title: {
    fontWeight: "800",
    fontSize: 32,
    lineHeight: 40,
  },
  titleHighlight: {
    fontWeight: "800",
    fontSize: 32,
    lineHeight: 40,
    textDecorationLine: "underline",
    textDecorationColor: "rgba(255, 140, 90, 0.5)",
    textDecorationStyle: "solid",
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
});
