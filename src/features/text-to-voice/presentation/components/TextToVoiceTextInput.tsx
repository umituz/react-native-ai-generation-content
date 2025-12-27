/**
 * TextToVoiceTextInput Component
 * Text input for voice generation with character count
 */

import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-localization";
import type { TextToVoiceTextInputProps } from "../../domain/types";

export const TextToVoiceTextInput: React.FC<TextToVoiceTextInputProps> = ({
  value,
  onChangeText,
  maxLength = 5000,
  labelKey,
  placeholderKey,
  characterCountKey,
  style,
}) => {
  const { t } = useLocalization();
  const tokens = useAppDesignTokens();

  return (
    <View
      style={[styles.card, { backgroundColor: tokens.colors.surface }, style]}
    >
      <AtomicText
        type="bodyMedium"
        style={[styles.label, { color: tokens.colors.textPrimary }]}
      >
        {t(labelKey)}
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
        placeholder={t(placeholderKey)}
        placeholderTextColor={tokens.colors.textTertiary}
        multiline
        numberOfLines={6}
        maxLength={maxLength}
      />
      <AtomicText
        type="bodySmall"
        style={[styles.characterCount, { color: tokens.colors.textTertiary }]}
      >
        {t(characterCountKey, { count: value.length, max: maxLength })}
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
    minHeight: 120,
    textAlignVertical: "top",
  },
  characterCount: {
    marginTop: 4,
  },
});
