/**
 * InspirationChips Component
 * Horizontal scrollable suggestion chips for Magic Prompt
 */

import React, { useMemo } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import type { InspirationChipData } from "../../domain/types";

export interface InspirationChipsProps {
  readonly chips: readonly InspirationChipData[];
  readonly title: string;
  readonly onSelect: (promptKey: string) => void;
  readonly t: (key: string) => string;
}

export const InspirationChips: React.FC<InspirationChipsProps> = ({
  chips,
  title,
  onSelect,
  t,
}) => {
  const tokens = useAppDesignTokens();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginBottom: tokens.spacing.lg,
        },
        sectionTitle: {
          fontWeight: "700",
          marginBottom: tokens.spacing.sm,
        },
        chipsContainer: {
          gap: tokens.spacing.sm,
          paddingBottom: 4,
        },
        chip: {
          paddingHorizontal: tokens.spacing.md,
          paddingVertical: 10,
          borderRadius: 999,
          borderWidth: 1,
          borderColor: tokens.colors.border,
          backgroundColor: tokens.colors.surface,
        },
      }),
    [tokens],
  );

  return (
    <View style={styles.container}>
      <AtomicText type="labelLarge" style={styles.sectionTitle}>
        {title}
      </AtomicText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsContainer}
      >
        {chips.map((chip) => (
          <TouchableOpacity
            key={chip.id}
            style={styles.chip}
            onPress={() => onSelect(chip.promptKey)}
          >
            <AtomicText
              type="bodySmall"
              style={{ color: tokens.colors.textPrimary }}
            >
              {t(chip.labelKey)}
            </AtomicText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
