/**
 * FaceValidationStatus Component
 *
 * Displays face validation status with appropriate styling.
 * Translations provided by main app via props.
 */

import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import type { FaceValidationState } from "../../domain/entities/FaceDetection";
import { isValidFace } from "../../infrastructure/validators/faceValidator";

export interface FaceValidationLabels {
  analyzing: string;
  error: string;
  success: string;
  noFace: string;
}

interface FaceValidationStatusProps {
  state: FaceValidationState;
  labels: FaceValidationLabels;
}

export const FaceValidationStatus: React.FC<FaceValidationStatusProps> = ({
  state,
  labels,
}) => {
  const tokens = useAppDesignTokens();

  if (state.isValidating) {
    return (
      <View
        style={[styles.container, { backgroundColor: tokens.colors.surface }]}
      >
        <ActivityIndicator size="small" color={tokens.colors.primary} />
        <AtomicText
          style={[styles.text, { color: tokens.colors.textSecondary }]}
        >
          {labels.analyzing}
        </AtomicText>
      </View>
    );
  }

  if (state.error) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: tokens.colors.errorContainer },
        ]}
      >
        <AtomicIcon
          name="alert-circle"
          size="sm"
          customColor={tokens.colors.error}
        />
        <AtomicText style={[styles.text, { color: tokens.colors.error }]}>
          {labels.error}
        </AtomicText>
      </View>
    );
  }

  if (!state.result) {
    return null;
  }

  const valid = isValidFace(state.result);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: valid
            ? tokens.colors.successContainer
            : tokens.colors.errorContainer,
        },
      ]}
    >
      <AtomicIcon
        name={valid ? "checkmark-circle" : "close-circle"}
        size="sm"
        customColor={valid ? tokens.colors.success : tokens.colors.error}
      />
      <AtomicText
        style={[
          styles.text,
          { color: valid ? tokens.colors.success : tokens.colors.error },
        ]}
      >
        {valid ? labels.success : labels.noFace}
      </AtomicText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
    marginTop: 8,
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
  },
});
