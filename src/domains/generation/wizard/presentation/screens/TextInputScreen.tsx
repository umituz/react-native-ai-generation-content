/**
 * TextInputScreen
 * Generic text input step for wizard flows
 * Uses design system: NavigationHeader + ScreenLayout
 */

import React, { useState, useCallback, useMemo } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicButton,
  useAppDesignTokens,
  ScreenLayout,
  NavigationHeader,
  type DesignTokens,
  useAlert,
  AlertType,
  AlertMode,
} from "@umituz/react-native-design-system";
import { WizardContinueButton } from "../components/WizardContinueButton";
import { contentModerationService } from "../../../../../domains/content-moderation";
import type { TextInputScreenProps } from "./TextInputScreen.types";

export type {
  TextInputScreenTranslations,
  TextInputScreenConfig,
  TextInputScreenProps,
} from "./TextInputScreen.types";

export const TextInputScreen: React.FC<TextInputScreenProps> = ({
  stepId: _stepId,
  translations,
  config,
  examplePrompts = [],
  initialValue = "",
  creditCost,
  onBack,
  onContinue,
}) => {
  const tokens = useAppDesignTokens();
  const alert = useAlert();
  const [text, setText] = useState(initialValue);

  // Validate config - REQUIRED, NO DEFAULTS
  if (!config) {
    throw new Error("[TextInputScreen] Config is required but was not provided.");
  }
  if (typeof config.minLength !== "number" || config.minLength < 0) {
    throw new Error(
      `[TextInputScreen] Invalid minLength: ${config.minLength}. Must be a non-negative number.`
    );
  }
  if (typeof config.maxLength !== "number" || config.maxLength <= 0) {
    throw new Error(
      `[TextInputScreen] Invalid maxLength: ${config.maxLength}. Must be a positive number.`
    );
  }
  if (config.minLength > config.maxLength) {
    throw new Error(
      `[TextInputScreen] Invalid config: minLength (${config.minLength}) > maxLength (${config.maxLength}).`
    );
  }

  const { minLength, maxLength } = config;
  const canContinue = text.trim().length >= minLength;

  const handleContinue = useCallback(async () => {
    if (!canContinue) return;

    const trimmedText = text.trim();

    const moderationResult = await contentModerationService.moderate({
      contentType: "text",
      content: trimmedText,
    });

    if (!moderationResult.isAllowed) {
      const violation = moderationResult.violations[0];
      alert.show(
        AlertType.ERROR,
        AlertMode.MODAL,
        translations.contentNotAllowed || "Content Not Allowed",
        violation?.suggestion || translations.contentNotAllowedMessage || "This type of content is not supported. Please try a different prompt."
      );
      return;
    }

    onContinue(trimmedText);
  }, [canContinue, text, onContinue, alert, translations]);

  const handleExampleSelect = useCallback((example: string) => {
    setText(example);
  }, []);

  const styles = useMemo(() => createStyles(tokens), [tokens]);

  return (
    <View style={{ flex: 1, backgroundColor: tokens.colors.backgroundPrimary }}>
      <NavigationHeader
        title=""
        onBackPress={onBack}
        rightElement={
          <WizardContinueButton
            label={translations.continueButton}
            canContinue={canContinue}
            onPress={handleContinue}
            creditCost={creditCost}
          />
        }
      />
      <ScreenLayout
        scrollable={true}
        edges={["left", "right"]}
        hideScrollIndicator={true}
        keyboardAvoiding={true}
        contentContainerStyle={styles.scrollContent}
      >
        <AtomicText type="headlineMedium" color="textPrimary" style={styles.title}>
          {translations.title}
        </AtomicText>

        {translations.subtitle ? (
          <AtomicText type="bodyMedium" color="textSecondary" style={styles.subtitle}>
            {translations.subtitle}
          </AtomicText>
        ) : null}

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.textInput, { minHeight: config?.multiline ? 120 : 48 }]}
            placeholder={translations.placeholder}
            placeholderTextColor={tokens.colors.textTertiary}
            value={text}
            onChangeText={setText}
            multiline={config?.multiline ?? true}
            maxLength={maxLength}
            textAlignVertical="top"
          />
          <AtomicText type="bodySmall" color="textTertiary" style={styles.charCount}>
            {text.length}/{maxLength}
          </AtomicText>
        </View>

        {examplePrompts.length > 0 && translations.examplesTitle ? (
          <View style={styles.examplesSection}>
            <AtomicText type="labelLarge" color="textSecondary" style={styles.examplesTitle}>
              {translations.examplesTitle}
            </AtomicText>
            {examplePrompts.slice(0, 4).map((example, index) => (
              <AtomicButton
                key={`${example}-${index}`}
                variant="outline"
                size="sm"
                onPress={() => handleExampleSelect(example)}
                style={styles.exampleButton}
              >
                {example.length > 50 ? `${example.slice(0, 50)}...` : example}
              </AtomicButton>
            ))}
          </View>
        ) : null}
      </ScreenLayout>
    </View>
  );
};

const createStyles = (tokens: DesignTokens) =>
  StyleSheet.create({
    scrollContent: {
      paddingHorizontal: tokens.spacing.lg,
      paddingBottom: 40,
    },
    title: {
      marginBottom: tokens.spacing.sm,
    },
    subtitle: {
      marginBottom: tokens.spacing.lg,
    },
    inputContainer: {
      backgroundColor: tokens.colors.backgroundSecondary,
      borderRadius: tokens.borders.radius.md,
      borderWidth: 1,
      borderColor: tokens.colors.border,
      padding: tokens.spacing.md,
    },
    textInput: {
      fontSize: 16,
      lineHeight: 22,
      color: tokens.colors.textPrimary,
    },
    charCount: {
      textAlign: "right",
      marginTop: tokens.spacing.sm,
    },
    examplesSection: {
      marginTop: tokens.spacing.lg,
    },
    examplesTitle: {
      marginBottom: tokens.spacing.sm,
    },
    exampleButton: {
      marginBottom: tokens.spacing.xs,
    },
  });
