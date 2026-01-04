/**
 * PhotoRestoreResultView Component
 * Displays the restored image result with before/after comparison
 */

import React from "react";
import { StyleSheet } from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { AIGenerationResult } from "../../../../presentation/components/display/AIGenerationResult";
import { ComparisonSlider } from "../../../upscaling/presentation/components/ComparisonSlider";
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
    <AIGenerationResult
      successText={translations.successText}
      primaryAction={{
        label: translations.saveButtonText,
        onPress: onSave,
      }}
      secondaryAction={{
        label: translations.tryAnotherText,
        onPress: onReset,
      }}
    >
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
    </AIGenerationResult>
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
