/**
 * FilterChips Component
 * Displays filter chips for creation types
 */

import React, { useMemo } from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView, type ViewStyle } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import type { CreationType } from "../../domain/value-objects/CreationsConfig";

interface FilterChipsProps {
  readonly types: readonly CreationType[];
  readonly availableTypes: string[];
  readonly selectedType: string;
  readonly allLabel: string;
  readonly onSelect: (type: string) => void;
  readonly style?: ViewStyle;
}

export function FilterChips({
  types,
  availableTypes,
  selectedType,
  allLabel,
  onSelect,
  style,
}: FilterChipsProps) {
  const tokens = useAppDesignTokens();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginBottom: tokens.spacing.md,
        },
        scrollContent: {
          paddingHorizontal: tokens.spacing.md,
          gap: tokens.spacing.sm,
          flexDirection: "row",
        },
        chip: {
          paddingHorizontal: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
          borderRadius: tokens.borders.radius.lg,
          backgroundColor: tokens.colors.backgroundSecondary,
        },
        chipSelected: {
          backgroundColor: tokens.colors.primary,
        },
        chipText: {
          ...tokens.typography.bodySmall,
          color: tokens.colors.textSecondary,
        },
        chipTextSelected: {
          color: tokens.colors.textInverse,
        },
      }),
    [tokens],
  );

  const safeAvailableTypes = availableTypes ?? [];
  const visibleTypes = types.filter((t) => safeAvailableTypes.includes(t.id));

  return (
    <View style={[styles.container, style]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TouchableOpacity
          style={[styles.chip, selectedType === "all" && styles.chipSelected]}
          onPress={() => onSelect("all")}
        >
          <AtomicText
            style={[
              styles.chipText,
              selectedType === "all" && styles.chipTextSelected,
            ]}
          >
            {allLabel}
          </AtomicText>
        </TouchableOpacity>
        {visibleTypes.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={[
              styles.chip,
              selectedType === type.id && styles.chipSelected,
            ]}
            onPress={() => onSelect(type.id)}
          >
            <AtomicText
              style={[
                styles.chipText,
                selectedType === type.id && styles.chipTextSelected,
              ]}
            >
              {type.icon} {type.labelKey}
            </AtomicText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
