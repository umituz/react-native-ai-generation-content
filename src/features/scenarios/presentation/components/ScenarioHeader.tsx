/**
 * ScenarioHeader Component
 * Header section for scenario selection screen
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
  type DesignTokens,
} from "@umituz/react-native-design-system";

export interface ScenarioHeaderProps {
  readonly title: string;
  readonly subtitle: string;
}

export const ScenarioHeader: React.FC<ScenarioHeaderProps> = ({
  title,
  subtitle,
}) => {
  const tokens = useAppDesignTokens();
  const styles = React.useMemo(() => createStyles(tokens), [tokens]);

  return (
    <View style={styles.container}>
      <AtomicText type="headlineLarge" style={styles.title}>
        {title}
      </AtomicText>
      <AtomicText
        type="bodyMedium"
        color="textSecondary"
        style={styles.subtitle}
      >
        {subtitle}
      </AtomicText>
    </View>
  );
};

const createStyles = (tokens: DesignTokens) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: tokens.spacing.md,
      paddingTop: tokens.spacing.lg,
      paddingBottom: tokens.spacing.md,
      gap: tokens.spacing.xs,
    },
    title: {
      lineHeight: 34,
    },
    subtitle: {
      lineHeight: 22,
    },
  });
