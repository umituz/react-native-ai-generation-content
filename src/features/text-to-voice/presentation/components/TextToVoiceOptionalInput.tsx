/**
 * TextToVoiceOptionalInput Component
 * Optional text input with hint
 */

import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import type { TextToVoiceOptionalInputProps } from "../../domain/types";

export const TextToVoiceOptionalInput: React.FC<
  TextToVoiceOptionalInputProps
> = ({ title, value, onChangeText, placeholder, hint, style }) => {
  const tokens = useAppDesignTokens();

  return (
    <View
      style={[styles.card, { backgroundColor: tokens.colors.surface }, style]}
    >
      <AtomicText
        type="bodyMedium"
        style={[styles.label, { color: tokens.colors.textPrimary }]}
      >
        {title}
      </AtomicText>
      <TextInput
        style={[
          styles.textInput,
          {
            backgroundColor: tokens.colors.backgroundPrimary,
            color: tokens.colors.textPrimary,
            borderColor: tokens.colors.borderLight,
          },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={tokens.colors.textTertiary}
      />
      <AtomicText
        type="bodySmall"
        style={[styles.hint, { color: tokens.colors.textTertiary }]}
      >
        {hint}
      </AtomicText>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
  },
  label: {
    fontWeight: "600",
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    minHeight: 44,
  },
  hint: {
    marginTop: 4,
  },
});
