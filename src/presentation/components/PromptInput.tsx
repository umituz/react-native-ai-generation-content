/**
 * PromptInput Component
 * Generic AI prompt input with customizable title and placeholder
 * Props-driven for 100+ apps compatibility
 */

import React from "react";
import { View, TextInput, StyleSheet, type ViewStyle } from "react-native";
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
  readonly maxLength?: number;
  readonly isDisabled?: boolean;
  readonly showCharacterCount?: boolean;
  readonly characterCountLabel?: string;
  readonly style?: ViewStyle;
}

export const PromptInput: React.FC<PromptInputProps> = ({
  value,
  onChangeText,
  title,
  placeholder,
  minHeight = 120,
  maxLines = 6,
  maxLength = 500,
  isDisabled = false,
  showCharacterCount = false,
  characterCountLabel,
  style,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        {title && (
          <AtomicText
            type="bodyMedium"
            style={[styles.label, { color: tokens.colors.textPrimary }]}
          >
            {title}
          </AtomicText>
        )}
        {showCharacterCount && (
          <AtomicText
            type="labelSmall"
            style={[styles.count, { color: tokens.colors.textSecondary }]}
          >
            {characterCountLabel ?? `${value.length}/${maxLength}`}
          </AtomicText>
        )}
      </View>
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
        numberOfLines={maxLines}
        maxLength={maxLength}
        textAlignVertical="top"
        editable={!isDisabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  label: {
    fontWeight: "600",
  },
  count: {
    opacity: 0.8,
  },
  input: {
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
  },
});
