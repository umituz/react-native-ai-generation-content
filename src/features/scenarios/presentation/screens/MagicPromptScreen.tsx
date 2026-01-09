/**
 * MagicPromptScreen
 * Config-driven custom prompt screen
 */

import React, { useState, useCallback, useMemo } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  AtomicText,
  AtomicTextArea,
  AtomicIcon,
  useAppDesignTokens,
  ScreenLayout,
  NavigationHeader,
} from "@umituz/react-native-design-system";
import { MagicPromptHeadline } from "../components/MagicPromptHeadline";
import { InspirationChips } from "../components/InspirationChips";
import { StyleSelector } from "../components/StyleSelector";
import type {
  MagicPromptConfig,
  VisualStyleOption,
  InspirationChipData,
} from "../../domain/types";

export interface MagicPromptScreenProps {
  readonly config: MagicPromptConfig;
  readonly visualStyles: readonly VisualStyleOption[];
  readonly inspirationChips: readonly InspirationChipData[];
  readonly surprisePrompts: readonly string[];
  readonly initialPrompt: string;
  readonly initialVisualStyle: string;
  readonly onContinue: (prompt: string, visualStyle: string) => void;
  readonly onBack: () => void;
  readonly t: (key: string) => string;
}

export const MagicPromptScreen: React.FC<MagicPromptScreenProps> = ({
  config,
  visualStyles,
  inspirationChips,
  surprisePrompts,
  initialPrompt,
  initialVisualStyle,
  onContinue,
  onBack,
  t,
}) => {
  const tokens = useAppDesignTokens();
  const [text, setText] = useState(initialPrompt);
  const [selectedStyle, setSelectedStyle] = useState(initialVisualStyle);

  const handleSurprise = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * surprisePrompts.length);
    const surprisePrompt = t(surprisePrompts[randomIndex]);
    setText(surprisePrompt);

    const randomStyleIndex = Math.floor(Math.random() * visualStyles.length);
    setSelectedStyle(visualStyles[randomStyleIndex].id);
  }, [surprisePrompts, visualStyles, t]);

  const handleInspirationSelect = useCallback(
    (promptKey: string) => {
      const prompt = t(promptKey);
      setText(prompt);
    },
    [t],
  );

  const handleStyleSelect = useCallback((styleId: string) => {
    setSelectedStyle(styleId);
  }, []);

  const handleContinue = useCallback(() => {
    onContinue(text, selectedStyle);
  }, [onContinue, text, selectedStyle]);

  const isValid = text.trim().length >= config.minLength;

  const componentStyles = useMemo(
    () =>
      StyleSheet.create({
        inputCard: {
          borderWidth: 1,
          borderRadius: 16,
          padding: 16,
          marginBottom: 24,
        },
        inputHeader: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        },
        label: {
          textTransform: "uppercase",
          fontWeight: "700",
          letterSpacing: 1,
        },
        surpriseButton: {
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 999,
        },
        surpriseText: { fontWeight: "600" },
        textArea: { marginBottom: 12 },
        charCounter: { alignItems: "flex-end", paddingTop: 8 },
      }),
    [],
  );

  return (
    <View style={{ flex: 1, backgroundColor: tokens.colors.backgroundPrimary }}>
      <NavigationHeader
        title={t(config.headerKey)}
        onBackPress={onBack}
        rightElement={
          <TouchableOpacity
            onPress={handleContinue}
            disabled={!isValid}
            activeOpacity={0.7}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: isValid
                ? tokens.colors.primary
                : tokens.colors.surfaceVariant,
              paddingHorizontal: tokens.spacing.md,
              paddingVertical: tokens.spacing.xs,
              borderRadius: tokens.borders.radius.full,
              opacity: isValid ? 1 : 0.5,
            }}
          >
            <AtomicText
              type="bodyMedium"
              style={{
                fontWeight: "800",
                color: isValid
                  ? tokens.colors.onPrimary
                  : tokens.colors.textSecondary,
                marginRight: 4,
              }}
            >
              {t(config.continueKey)}
            </AtomicText>
            <AtomicIcon
              name="arrow-forward"
              size="sm"
              color={isValid ? "onPrimary" : "textSecondary"}
            />
          </TouchableOpacity>
        }
      />
      <ScreenLayout
        scrollable={true}
        edges={["left", "right"]}
        keyboardAvoiding={true}
        contentContainerStyle={{ paddingHorizontal: tokens.spacing.lg }}
      >
        <MagicPromptHeadline
          headlinePart1={t(config.headlinePart1Key)}
          headlinePart2={t(config.headlinePart2Key)}
          subtitle={t(config.subtitleKey)}
        />

        <View
          style={[
            componentStyles.inputCard,
            { borderColor: tokens.colors.border },
          ]}
        >
          <View style={componentStyles.inputHeader}>
            <AtomicText
              type="labelSmall"
              style={[
                componentStyles.label,
                { color: tokens.colors.textSecondary },
              ]}
            >
              {t(config.inputLabelKey)}
            </AtomicText>
            <TouchableOpacity
              onPress={handleSurprise}
              style={[
                componentStyles.surpriseButton,
                { backgroundColor: tokens.colors.primaryContainer },
              ]}
            >
              <AtomicIcon name="sparkles" size="xs" color="primary" />
              <AtomicText
                type="labelSmall"
                style={[
                  componentStyles.surpriseText,
                  { color: tokens.colors.primary },
                ]}
              >
                {t(config.surpriseButtonKey)}
              </AtomicText>
            </TouchableOpacity>
          </View>

          <AtomicTextArea
            placeholder={t(config.placeholderKey)}
            value={text}
            onChangeText={setText}
            numberOfLines={8}
            maxLength={config.maxLength}
            autoFocus
            minHeight={200}
            style={componentStyles.textArea}
          />

          <View style={componentStyles.charCounter}>
            <AtomicText
              type="labelSmall"
              style={{ color: tokens.colors.textSecondary }}
            >
              {text.length}/{config.maxLength}
            </AtomicText>
          </View>
        </View>

        <InspirationChips
          chips={inspirationChips}
          title={t(config.inspirationTitleKey)}
          onSelect={handleInspirationSelect}
          t={t}
        />

        <StyleSelector
          styles={visualStyles}
          selectedStyle={selectedStyle}
          title={t(config.styleTitleKey)}
          onSelect={handleStyleSelect}
          t={t}
        />
      </ScreenLayout>
    </View>
  );
};
