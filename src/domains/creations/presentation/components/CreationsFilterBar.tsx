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

/**
 * Filter button configuration
 */
export interface FilterButton {
  /** Unique filter identifier */
  id: string;
  /** Display label */
  label: string;
  /** Icon name */
  icon?: string;
  /** Is this filter active */
  active: boolean;
  /** Handler when pressed */
  onPress: () => void;
}

interface CreationsFilterBarProps {
  /** Array of filter buttons */
  readonly filters: FilterButton[];
  /** Show clear button when any filter is active */
  readonly showClearButton?: boolean;
  /** Clear button label */
  readonly clearLabel?: string;
  /** Clear all filters handler */
  readonly onClear?: () => void;
  /** Has any active filters (for showing clear button) */
  readonly hasActiveFilters?: boolean;
}

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

/**
 * Helper to create filter buttons from filter state
 */
export function createMediaFilterButtons(
  activeFilter: string,
  onSelect: (filter: string) => void,
  labels: { all: string; images: string; videos: string; voice: string }
): FilterButton[] {
  return [
    {
      id: "all",
      label: labels.all,
      icon: "grid",
      active: activeFilter === "all",
      onPress: () => onSelect("all"),
    },
    {
      id: "image",
      label: labels.images,
      icon: "image",
      active: activeFilter === "image",
      onPress: () => onSelect("image"),
    },
    {
      id: "video",
      label: labels.videos,
      icon: "film",
      active: activeFilter === "video",
      onPress: () => onSelect("video"),
    },
    {
      id: "voice",
      label: labels.voice,
      icon: "mic",
      active: activeFilter === "voice",
      onPress: () => onSelect("voice"),
    },
  ];
}

/**
 * Helper to create status filter buttons
 */
export function createStatusFilterButtons(
  activeFilter: string,
  onSelect: (filter: string) => void,
  labels: {
    all: string;
    completed: string;
    pending: string;
    processing: string;
    failed: string;
  }
): FilterButton[] {
  return [
    {
      id: "all",
      label: labels.all,
      icon: "options",
      active: activeFilter === "all",
      onPress: () => onSelect("all"),
    },
    {
      id: "completed",
      label: labels.completed,
      icon: "checkmark-circle",
      active: activeFilter === "completed",
      onPress: () => onSelect("completed"),
    },
    {
      id: "processing",
      label: labels.processing,
      icon: "refresh",
      active: activeFilter === "processing",
      onPress: () => onSelect("processing"),
    },
    {
      id: "pending",
      label: labels.pending,
      icon: "time",
      active: activeFilter === "pending",
      onPress: () => onSelect("pending"),
    },
    {
      id: "failed",
      label: labels.failed,
      icon: "close-circle",
      active: activeFilter === "failed",
      onPress: () => onSelect("failed"),
    },
  ];
}
