/**
 * FaceValidationStatus Component
 *
 * Displays face validation status with appropriate styling.
 * Translations provided by main app via props.
 */

import * as React from "react";
import { View, StyleSheet } from "react-native";
import { AtomicText, AtomicIcon, AtomicSpinner } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import type { FaceValidationState } from "../../domain/entities/FaceDetection";
import { isValidFace } from "../../infrastructure/validators/faceValidator";

interface FaceValidationLabels {
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
        <AtomicSpinner size="sm" color="primary" />
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
          color="error"
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
        color={valid ? "success" : "error"}
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
