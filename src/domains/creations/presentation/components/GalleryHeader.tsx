declare const __DEV__: boolean;

import React from "react";
import { View, TouchableOpacity, StyleSheet, type ViewStyle } from "react-native";
import { AtomicText, AtomicIcon, useAppDesignTokens, type DesignTokens } from "@umituz/react-native-design-system";

interface FilterButtonConfig {
  readonly id: string;
  readonly label: string;
  readonly icon: string;
  readonly isActive: boolean;
  readonly onPress: () => void;
}

interface GalleryHeaderProps {
  readonly title: string;
  readonly count: number;
  readonly countLabel: string;
  readonly filterButtons?: FilterButtonConfig[];
  readonly showFilter?: boolean;
  readonly style?: ViewStyle;
  /** Number of pending/processing jobs to show as badge */
  readonly pendingCount?: number;
  /** Label for pending badge tooltip */
  readonly pendingLabel?: string;
}

export const GalleryHeader: React.FC<GalleryHeaderProps> = ({
  title,
  count,
  countLabel,
  filterButtons = [],
  showFilter = true,
  style,
  pendingCount = 0,
  pendingLabel,
}) => {
  const tokens = useAppDesignTokens();
  const styles = useStyles(tokens);

  return (
    <View style={[styles.headerArea, style]}>
      <View>
        <View style={styles.titleRow}>
          <AtomicText style={styles.title}>{title}</AtomicText>
          {pendingCount > 0 && (
            <View style={[styles.pendingBadge, { backgroundColor: tokens.colors.primary }]}>
              <AtomicIcon name="Loader" size="xs" color="onPrimary" />
              <AtomicText style={[styles.pendingBadgeText, { color: tokens.colors.onPrimary }]}>
                {pendingCount}
              </AtomicText>
            </View>
          )}
        </View>
        <AtomicText style={styles.subtitle}>
          {count} {countLabel}
          {pendingCount > 0 && pendingLabel ? ` · ${pendingCount} ${pendingLabel}` : ""}
        </AtomicText>
      </View>
      {showFilter && filterButtons.length > 0 && (
        <View style={styles.filterRow}>
          {filterButtons.map((btn) => (
            <TouchableOpacity
              key={btn.id}
              onPress={() => {
                if (__DEV__) {
                   
                  console.log(`[GalleryHeader] ${btn.id} filter pressed`);
                }
                btn.onPress();
              }}
              style={[styles.filterButton, btn.isActive && styles.filterButtonActive]}
              activeOpacity={0.7}
            >
              <AtomicIcon
                name={btn.icon}
                size="sm"
                color={btn.isActive ? "primary" : "secondary"}
              />
              <AtomicText
                style={[styles.filterText, { color: btn.isActive ? tokens.colors.primary : tokens.colors.textSecondary }]}
              >
                {btn.label}
              </AtomicText>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const useStyles = (tokens: DesignTokens) =>
  StyleSheet.create({
    headerArea: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
      marginBottom: tokens.spacing.sm,
    },
    titleRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: tokens.spacing.sm,
      marginBottom: 4,
    },
    title: {
      fontSize: 20,
      fontWeight: "700",
      color: tokens.colors.textPrimary,
    },
    pendingBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    pendingBadgeText: {
      fontSize: 12,
      fontWeight: "600",
    },
    subtitle: {
      fontSize: 14,
      color: tokens.colors.textSecondary,
      opacity: 0.6,
    },
    filterRow: {
      flexDirection: "row",
      gap: tokens.spacing.xs,
    },
    filterButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: tokens.spacing.xs,
      paddingVertical: tokens.spacing.xs,
      paddingHorizontal: tokens.spacing.sm,
      borderRadius: 999,
      backgroundColor: tokens.colors.surfaceVariant,
      borderWidth: 1,
      borderColor: "transparent",
    },
    filterButtonActive: {
      backgroundColor: tokens.colors.primary + "15",
      borderColor: tokens.colors.primary + "30",
    },
    filterText: {
      fontSize: 13,
      fontWeight: "500",
    },
  });
