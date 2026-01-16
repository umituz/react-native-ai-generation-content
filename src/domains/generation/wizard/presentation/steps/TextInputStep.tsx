/**
 * Generic Text Input Step
 * Used by ANY feature that needs text input
 * (text-to-video, prompt-based generation, etc.)
 */

import React, { useState, useCallback } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useAppDesignTokens, AtomicText } from "@umituz/react-native-design-system";
import type { TextInputStepConfig } from "../../domain/entities/wizard-config.types";

export interface TextInputStepProps {
  readonly config: TextInputStepConfig;
  readonly onContinue: (text: string) => void;
  readonly onBack: () => void;
  readonly t: (key: string) => string;
  readonly translations?: Record<string, string>;
}

export const TextInputStep: React.FC<TextInputStepProps> = ({
  config,
  onContinue,
  onBack,
  t,
  translations,
}) => {
  const tokens = useAppDesignTokens();
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[TextInputStep] Rendering", {
      stepId: config.id,
      textLength: text.length,
      minLength: config.minLength,
      maxLength: config.maxLength,
    });
  }

  const handleContinue = useCallback(() => {
    // Validate text length
    if (config.minLength && text.length < config.minLength) {
      setError(t("textInput.errors.tooShort"));
      return;
    }

    if (config.maxLength && text.length > config.maxLength) {
      setError(t("textInput.errors.tooLong"));
      return;
    }

    if (text.trim().length === 0) {
      setError(t("textInput.errors.required"));
      return;
    }

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[TextInputStep] Continue", { stepId: config.id, text });
    }

    onContinue(text);
  }, [text, config, onContinue, t]);

  const handleTextChange = useCallback((newText: string) => {
    setText(newText);
    setError(null); // Clear error on change
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: tokens.colors.backgroundPrimary }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <AtomicText type="body">{t("common.back")}</AtomicText>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Title */}
        {config.titleKey && (
          <AtomicText type="heading2" style={styles.title}>
            {t(config.titleKey)}
          </AtomicText>
        )}

        {/* Subtitle */}
        {config.subtitleKey && (
          <AtomicText type="body" style={styles.subtitle}>
            {t(config.subtitleKey)}
          </AtomicText>
        )}

        {/* Text Input */}
        <TextInput
          style={[
            styles.input,
            config.multiline && styles.multilineInput,
            {
              backgroundColor: tokens.colors.backgroundSecondary,
              borderColor: error ? tokens.colors.error : tokens.colors.border,
              color: tokens.colors.textPrimary,
            },
          ]}
          value={text}
          onChangeText={handleTextChange}
          placeholder={config.placeholderKey ? t(config.placeholderKey) : t("textInput.placeholder")}
          placeholderTextColor={tokens.colors.textSecondary}
          multiline={config.multiline}
          numberOfLines={config.multiline ? 5 : 1}
          maxLength={config.maxLength}
        />

        {/* Character Count */}
        {config.maxLength && (
          <AtomicText type="caption" style={styles.characterCount}>
            {text.length} / {config.maxLength}
          </AtomicText>
        )}

        {/* Error Message */}
        {error && (
          <AtomicText type="body" style={[styles.error, { color: tokens.colors.error }]}>
            {error}
          </AtomicText>
        )}
      </View>

      {/* Continue Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            {
              backgroundColor: text.trim().length > 0 ? tokens.colors.primary : tokens.colors.disabled,
            },
          ]}
          onPress={handleContinue}
          disabled={text.trim().length === 0}
        >
          <AtomicText
            type="buttonLarge"
            style={{ color: text.trim().length > 0 ? tokens.colors.textOnPrimary : tokens.colors.textDisabled }}
          >
            {t("common.continue")}
          </AtomicText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  backButton: {
    alignSelf: "flex-start",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 8,
  },
  multilineInput: {
    height: 120,
    textAlignVertical: "top",
  },
  characterCount: {
    textAlign: "right",
    marginBottom: 8,
  },
  error: {
    marginTop: 8,
  },
  footer: {
    padding: 16,
  },
  continueButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
});
