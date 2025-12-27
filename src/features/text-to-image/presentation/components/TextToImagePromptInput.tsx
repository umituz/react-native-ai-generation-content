/**
 * Text-to-Image Prompt Input Component
 * Text input for entering generation prompts
 */

import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";

export interface TextToImagePromptInputProps {
  value: string;
  onChangeText: (text: string) => void;
  label: string;
  placeholder: string;
  characterCountLabel?: string;
  minHeight?: number;
  maxLength?: number;
}

export const TextToImagePromptInput: React.FC<TextToImagePromptInputProps> = ({
  value,
  onChangeText,
  label,
  placeholder,
  characterCountLabel,
  minHeight = 100,
  maxLength,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={styles.container}>
      <AtomicText
        type="bodyMedium"
        style={[styles.label, { color: tokens.colors.textPrimary }]}
      >
        {label}
      </AtomicText>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: tokens.colors.surface,
            color: tokens.colors.textPrimary,
            borderColor: tokens.colors.borderLight,
            minHeight,
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={tokens.colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        maxLength={maxLength}
      />
      {characterCountLabel && (
        <AtomicText
          type="labelSmall"
          style={[styles.charCount, { color: tokens.colors.textSecondary }]}
        >
          {characterCountLabel}
        </AtomicText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    fontWeight: "600",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
  },
  charCount: {
    marginTop: 8,
  },
});
