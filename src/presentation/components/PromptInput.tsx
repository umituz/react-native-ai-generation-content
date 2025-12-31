/**
 * PromptInput Component
 * Generic AI prompt input with customizable title and placeholder
 * Props-driven for 100+ apps compatibility
 */

import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";

export interface PromptInputProps {
  readonly value: string;
  readonly onChangeText: (text: string) => void;
  readonly title?: string;
  readonly placeholder?: string;
  readonly minHeight?: number;
  readonly maxLines?: number;
  readonly isDisabled?: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({
  value,
  onChangeText,
  title,
  placeholder,
  minHeight = 120,
  maxLines = 6,
  isDisabled = false,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={styles.container}>
      {title && (
        <AtomicText
          type="bodyMedium"
          style={[styles.label, { color: tokens.colors.textPrimary }]}
        >
          {title}
        </AtomicText>
      )}
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
        maxLength={500}
        textAlignVertical="top"
        editable={!isDisabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: "100%",
  },
  label: {
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
  },
});
