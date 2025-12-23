/**
 * FaceValidationStatus Component
 *
 * Displays face validation status with appropriate styling.
 */

import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-localization";
import type { FaceValidationState } from "../../domain/entities/FaceDetection";
import { isValidFace } from "../../infrastructure/validators/faceValidator";

interface FaceValidationStatusProps {
  state: FaceValidationState;
}

export const FaceValidationStatus: React.FC<FaceValidationStatusProps> = ({
  state,
}) => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();

  if (state.isValidating) {
    return (
      <View
        style={[styles.container, { backgroundColor: tokens.colors.surface }]}
      >
        <ActivityIndicator size="small" color={tokens.colors.primary} />
        <AtomicText
          style={[styles.text, { color: tokens.colors.textSecondary }]}
        >
          {t("faceDetection.analyzing")}
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
          size={16}
          customColor={tokens.colors.error}
        />
        <AtomicText style={[styles.text, { color: tokens.colors.error }]}>
          {t("faceDetection.error")}
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
        size={16}
        customColor={valid ? tokens.colors.success : tokens.colors.error}
      />
      <AtomicText
        style={[
          styles.text,
          { color: valid ? tokens.colors.success : tokens.colors.error },
        ]}
      >
        {valid ? t("faceDetection.success") : t("faceDetection.noFace")}
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
