/**
 * SelectionScreen
 * Generic selection step for wizard flows (duration, style, etc.)
 * Uses design system: NavigationHeader + ScreenLayout
 */

import React, { useState, useCallback, useMemo } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
  ScreenLayout,
  NavigationHeader,
  type DesignTokens,
} from "@umituz/react-native-design-system";
import type { SelectionScreenProps } from "./SelectionScreen.types";

export type {
  SelectionOption,
  SelectionScreenTranslations,
  SelectionScreenConfig,
  SelectionScreenProps,
} from "./SelectionScreen.types";

export const SelectionScreen: React.FC<SelectionScreenProps> = ({
  stepId: _stepId,
  translations,
  options,
  config,
  initialValue,
  onBack,
  onContinue,
}) => {
  const tokens = useAppDesignTokens();
  const [selected, setSelected] = useState<string | string[]>(() => {
    if (initialValue) return initialValue;
    if (config?.multiSelect) return [];
    return "";
  });

  const isMultiSelect = config?.multiSelect ?? false;
  const isRequired = config?.required ?? true;

  const canContinue = isRequired
    ? isMultiSelect
      ? (selected as string[]).length > 0
      : selected !== ""
    : true;

  const handleSelect = useCallback(
    (optionId: string) => {
      if (isMultiSelect) {
        setSelected((prev) => {
          const arr = prev as string[];
          return arr.includes(optionId)
            ? arr.filter((id) => id !== optionId)
            : [...arr, optionId];
        });
      } else {
        setSelected(optionId);
      }
    },
    [isMultiSelect],
  );

  const handleContinue = useCallback(() => {
    if (canContinue) {
      onContinue(selected);
    }
  }, [canContinue, selected, onContinue]);

  const isOptionSelected = useCallback(
    (optionId: string): boolean => {
      if (isMultiSelect) {
        return (selected as string[]).includes(optionId);
      }
      return selected === optionId;
    },
    [isMultiSelect, selected],
  );

  const styles = useMemo(() => createStyles(tokens), [tokens]);

  return (
    <View style={{ flex: 1, backgroundColor: tokens.colors.backgroundPrimary }}>
      <NavigationHeader
        title=""
        onBackPress={onBack}
        rightElement={
          <TouchableOpacity
            onPress={handleContinue}
            activeOpacity={0.7}
            disabled={!canContinue}
            style={[
              styles.continueButton,
              {
                backgroundColor: canContinue ? tokens.colors.primary : tokens.colors.surfaceVariant,
                opacity: canContinue ? 1 : 0.5,
              },
            ]}
          >
            <AtomicText
              type="bodyMedium"
              style={[
                styles.continueText,
                { color: canContinue ? tokens.colors.onPrimary : tokens.colors.textSecondary },
              ]}
            >
              {translations.continueButton}
            </AtomicText>
            <AtomicIcon
              name="arrow-forward"
              size="sm"
              color={canContinue ? "onPrimary" : "textSecondary"}
            />
          </TouchableOpacity>
        }
      />
      <ScreenLayout
        scrollable={true}
        edges={["left", "right"]}
        hideScrollIndicator={true}
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

        <View style={styles.optionsGrid}>
          {options.map((option) => {
            const isSelected = isOptionSelected(option.id);
            return (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.optionCard,
                  {
                    backgroundColor: isSelected ? tokens.colors.primaryContainer : tokens.colors.backgroundSecondary,
                    borderColor: isSelected ? tokens.colors.primary : tokens.colors.border,
                  },
                ]}
                onPress={() => handleSelect(option.id)}
                activeOpacity={0.7}
              >
                {option.icon ? (
                  <AtomicIcon name={option.icon} size="lg" color={isSelected ? "primary" : "textSecondary"} />
                ) : null}
                <AtomicText type="labelLarge" color={isSelected ? "primary" : "textPrimary"} style={styles.optionLabel}>
                  {option.label}
                </AtomicText>
                {isSelected ? (
                  <View style={[styles.checkmark, { backgroundColor: tokens.colors.primary }]}>
                    <AtomicIcon name="checkmark" size="xs" color="onPrimary" />
                  </View>
                ) : null}
              </TouchableOpacity>
            );
          })}
        </View>
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
    optionsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: tokens.spacing.sm,
    },
    optionCard: {
      flex: 1,
      minWidth: "45%",
      padding: tokens.spacing.md,
      borderWidth: 2,
      borderRadius: tokens.borders.radius.md,
      alignItems: "center",
      justifyContent: "center",
      gap: tokens.spacing.xs,
      position: "relative",
    },
    optionLabel: {
      textAlign: "center",
    },
    checkmark: {
      position: "absolute",
      top: tokens.spacing.xs,
      right: tokens.spacing.xs,
      width: 20,
      height: 20,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    continueButton: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.xs,
      borderRadius: tokens.borders.radius.full,
    },
    continueText: {
      fontWeight: "800",
      marginRight: 4,
    },
  });
