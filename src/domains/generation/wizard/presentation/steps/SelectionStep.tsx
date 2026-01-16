/**
 * Generic Selection Step
 * Used by ANY feature that needs selection
 * (style, duration, aspect ratio, quality, etc.)
 */

import React, { useState, useCallback } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useAppDesignTokens, AtomicText } from "@umituz/react-native-design-system";
import type { SelectionStepConfig } from "../../domain/entities/wizard-config.types";

export interface SelectionStepProps {
  readonly config: SelectionStepConfig;
  readonly onContinue: (selected: string | string[]) => void;
  readonly onBack: () => void;
  readonly t: (key: string) => string;
  readonly translations?: Record<string, string>;
}

export const SelectionStep: React.FC<SelectionStepProps> = ({
  config,
  onContinue,
  onBack,
  t,
  translations,
}) => {
  const tokens = useAppDesignTokens();
  const [selectedIds, setSelectedIds] = useState<string[]>(
    config.defaultValue
      ? Array.isArray(config.defaultValue)
        ? config.defaultValue
        : [config.defaultValue]
      : [],
  );

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[SelectionStep] Rendering", {
      stepId: config.id,
      selectionType: config.selectionType,
      multiSelect: config.multiSelect,
      selectedCount: selectedIds.length,
    });
  }

  const handleOptionPress = useCallback(
    (optionId: string) => {
      if (config.multiSelect) {
        // Multi-select: toggle option
        setSelectedIds((prev) => {
          if (prev.includes(optionId)) {
            return prev.filter((id) => id !== optionId);
          }
          return [...prev, optionId];
        });
      } else {
        // Single-select: replace selection
        setSelectedIds([optionId]);
      }
    },
    [config.multiSelect],
  );

  const handleContinue = useCallback(() => {
    if (selectedIds.length === 0) {
      return; // Don't allow continue without selection
    }

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[SelectionStep] Continue", {
        stepId: config.id,
        selected: config.multiSelect ? selectedIds : selectedIds[0],
      });
    }

    // Return single value for single-select, array for multi-select
    onContinue(config.multiSelect ? selectedIds : selectedIds[0]);
  }, [selectedIds, config, onContinue]);

  return (
    <View style={[styles.container, { backgroundColor: tokens.colors.backgroundPrimary }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <AtomicText type="body">{t("common.back")}</AtomicText>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
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

        {/* Options */}
        <View style={styles.optionsContainer}>
          {config.options.map((option) => {
            const isSelected = selectedIds.includes(option.id);
            return (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.optionCard,
                  {
                    backgroundColor: isSelected
                      ? tokens.colors.primaryContainer
                      : tokens.colors.backgroundSecondary,
                    borderColor: isSelected ? tokens.colors.primary : tokens.colors.border,
                  },
                ]}
                onPress={() => handleOptionPress(option.id)}
              >
                {/* Option Icon (if provided) */}
                {option.icon && (
                  <View style={styles.iconContainer}>
                    <AtomicText type="heading3">{option.icon}</AtomicText>
                  </View>
                )}

                {/* Option Label */}
                <AtomicText
                  type="body"
                  style={[
                    styles.optionLabel,
                    {
                      color: isSelected ? tokens.colors.onPrimaryContainer : tokens.colors.textPrimary,
                    },
                  ]}
                >
                  {option.label}
                </AtomicText>

                {/* Selection Indicator */}
                {isSelected && (
                  <View
                    style={[
                      styles.selectedIndicator,
                      {
                        backgroundColor: tokens.colors.primary,
                      },
                    ]}
                  >
                    <AtomicText type="caption" style={{ color: tokens.colors.textOnPrimary }}>
                      ✓
                    </AtomicText>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            {
              backgroundColor: selectedIds.length > 0 ? tokens.colors.primary : tokens.colors.disabled,
            },
          ]}
          onPress={handleContinue}
          disabled={selectedIds.length === 0}
        >
          <AtomicText
            type="buttonLarge"
            style={{
              color: selectedIds.length > 0 ? tokens.colors.textOnPrimary : tokens.colors.textDisabled,
            }}
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
  optionsContainer: {
    gap: 12,
  },
  optionCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  optionLabel: {
    flex: 1,
  },
  selectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
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
