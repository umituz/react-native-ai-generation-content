/**
 * ResultStoryCard Component
 * Displays story text with quote styling
 */

import * as React from "react";
import { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { LinearGradient } from "expo-linear-gradient";

export interface ResultStoryCardProps {
  story: string;
}

export const ResultStoryCard: React.FC<ResultStoryCardProps> = ({ story }) => {
  const tokens = useAppDesignTokens();

  const styles = useMemo(() => StyleSheet.create({
    outer: {
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    container: {
      padding: 20,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: tokens.colors.primaryContainer,
    },
    quoteIcon: {
      fontSize: 40,
      lineHeight: 40,
      color: tokens.colors.primary,
      opacity: 0.4,
      marginBottom: -12,
    },
    quoteEnd: {
      alignItems: "flex-end",
      marginTop: -12,
    },
    quoteIconEnd: {
      marginBottom: 0,
    },
    text: {
      fontSize: 14,
      color: tokens.colors.textPrimary,
      textAlign: "center",
      lineHeight: 22,
      fontStyle: "italic",
      fontWeight: "500",
    },
  }), [tokens]);

  return (
    <View style={styles.outer}>
      <LinearGradient
        colors={[tokens.colors.primaryContainer, tokens.colors.surface]}
        style={styles.container}
      >
        <AtomicText style={styles.quoteIcon}>&quot;</AtomicText>
        <AtomicText style={styles.text}>{story}</AtomicText>
        <View style={styles.quoteEnd}>
          <AtomicText style={[styles.quoteIcon, styles.quoteIconEnd]}>
            &quot;
          </AtomicText>
        </View>
      </LinearGradient>
    </View>
  );
};
