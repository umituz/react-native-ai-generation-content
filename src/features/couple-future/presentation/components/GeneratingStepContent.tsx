/**
 * GeneratingStepContent
 * Display component for generation progress
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { GenerationProgressBar } from "../../../../presentation/components";

interface GeneratingStepContentProps {
  readonly progress: number;
  readonly title: string;
  readonly message: string;
  readonly hint?: string;
}

export const GeneratingStepContent: React.FC<GeneratingStepContentProps> = ({
  progress,
  title,
  message,
  hint,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={[styles.container, { backgroundColor: tokens.colors.backgroundPrimary }]}>
      <View style={styles.content}>
        <AtomicText type="headlineMedium" style={styles.title}>
          {title}
        </AtomicText>

        <View style={styles.progressContainer}>
          <GenerationProgressBar progress={progress} />
        </View>

        <AtomicText
          type="bodyMedium"
          style={[styles.message, { color: tokens.colors.textSecondary }]}
        >
          {message}
        </AtomicText>

        {hint ? (
          <AtomicText
            type="labelSmall"
            style={[styles.hint, { color: tokens.colors.textTertiary }]}
          >
            {hint}
          </AtomicText>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "100%",
    paddingHorizontal: 24,
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 32,
  },
  progressContainer: {
    width: "100%",
    marginBottom: 24,
  },
  message: {
    textAlign: "center",
    marginBottom: 16,
  },
  hint: {
    textAlign: "center",
  },
});
