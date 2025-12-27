/**
 * PhotoRestoreResultView Component
 * Displays the restored image result with before/after comparison
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicButton,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { ComparisonSlider } from "../../../background/presentation/components/ComparisonSlider";
import type { PhotoRestoreTranslations } from "../../domain/types";

export interface PhotoRestoreResultViewProps {
  originalUri: string;
  processedUri: string;
  translations: Pick<
    PhotoRestoreTranslations,
    | "successText"
    | "saveButtonText"
    | "tryAnotherText"
    | "beforeLabel"
    | "afterLabel"
  >;
  onSave: () => void;
  onReset: () => void;
}

export const PhotoRestoreResultView: React.FC<PhotoRestoreResultViewProps> = ({
  originalUri,
  processedUri,
  translations,
  onSave,
  onReset,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={styles.container}>
      <AtomicText
        type="headlineMedium"
        style={[styles.title, { color: tokens.colors.success }]}
      >
        {translations.successText}
      </AtomicText>

      <ComparisonSlider
        originalUri={originalUri}
        processedUri={processedUri}
        beforeLabel={translations.beforeLabel}
        afterLabel={translations.afterLabel}
      />

      <AtomicText
        type="bodySmall"
        style={[styles.hint, { color: tokens.colors.textSecondary }]}
      >
        Drag slider to compare
      </AtomicText>

      <View style={styles.actions}>
        <AtomicButton
          title={translations.saveButtonText}
          onPress={onSave}
          variant="primary"
          size="lg"
        />
        <AtomicButton
          title={translations.tryAnotherText}
          onPress={onReset}
          variant="secondary"
          size="lg"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
  },
  hint: {
    textAlign: "center",
    marginTop: 12,
    marginBottom: 24,
  },
  actions: {
    gap: 12,
  },
});
