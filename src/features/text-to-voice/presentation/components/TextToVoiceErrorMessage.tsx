/**
 * TextToVoiceErrorMessage Component
 * Error message display
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import type { TextToVoiceErrorMessageProps } from "../../domain/types";

export const TextToVoiceErrorMessage: React.FC<TextToVoiceErrorMessageProps> = ({
  message,
  style,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View
      style={[
        styles.errorCard,
        {
          backgroundColor: `${tokens.colors.error}20`,
          borderColor: tokens.colors.error,
        },
        style,
      ]}
    >
      <AtomicIcon name="alert-circle-outline" size="sm" color="error" />
      <AtomicText
        type="bodySmall"
        style={[styles.errorText, { color: tokens.colors.error }]}
      >
        {message}
      </AtomicText>
    </View>
  );
};

const styles = StyleSheet.create({
  errorCard: {
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
    marginTop: 0,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  errorText: {
    marginLeft: 8,
    flex: 1,
  },
});
