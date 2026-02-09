/**
 * CreationsFilterBar Component
 * Filter buttons with dropdown-style appearance
 */

import React, { useMemo } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import {
  useAppDesignTokens,
  AtomicText,
  AtomicIcon,
} from "@umituz/react-native-design-system";
import type { CreationsFilterBarProps } from "./CreationsFilterBar.types";

export function CreationsFilterBar({
  filters,
  showClearButton = true,
  clearLabel = "Clear",
  onClear,
  hasActiveFilters = false,
}: CreationsFilterBarProps) {
  const tokens = useAppDesignTokens();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginTop: 8,
        },
        scrollContent: {
          paddingHorizontal: 16,
          gap: 8,
          flexDirection: "row",
        },
        filterButton: {
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 20,
          minHeight: 36,
          gap: 6,
        },
        filterButtonActive: {
          backgroundColor: tokens.colors.primary + "15",
          borderWidth: 1,
          borderColor: tokens.colors.primary,
        },
        filterButtonInactive: {
          backgroundColor: tokens.colors.backgroundSecondary,
        },
        filterText: {
          fontSize: 14,
        },
        clearButton: {
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: tokens.colors.primary,
          minHeight: 36,
        },
        clearText: {
          marginLeft: 4,
        },
      }),
    [tokens]
  );

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterButton,
              filter.active
                ? styles.filterButtonActive
                : styles.filterButtonInactive,
            ]}
            onPress={filter.onPress}
          >
            {filter.icon && (
              <AtomicIcon
                name={filter.icon}
                size="sm"
                color={filter.active ? "primary" : "secondary"}
              />
            )}
            <AtomicText
              type="bodyMedium"
              style={[
                styles.filterText,
                {
                  color: filter.active
                    ? tokens.colors.primary
                    : tokens.colors.textPrimary,
                  fontWeight: filter.active ? "600" : "400",
                },
              ]}
            >
              {filter.label}
            </AtomicText>
            <AtomicIcon
              name="chevron-down"
              size="xs"
              color={filter.active ? "primary" : "secondary"}
            />
          </TouchableOpacity>
        ))}

        {showClearButton && hasActiveFilters && onClear && (
          <TouchableOpacity style={styles.clearButton} onPress={onClear}>
            <AtomicIcon name="close" size="sm" color="primary" />
            <AtomicText
              type="bodySmall"
              style={[styles.clearText, { color: tokens.colors.primary }]}
            >
              {clearLabel}
            </AtomicText>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

export type { FilterButton, CreationsFilterBarProps } from "./CreationsFilterBar.types";
export {
  createMediaFilterButtons,
  createStatusFilterButtons,
} from "./filter-bar-utils";
