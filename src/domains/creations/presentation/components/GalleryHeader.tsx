
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
}

const EMPTY_FILTER_BUTTONS: FilterButtonConfig[] = [];

export const GalleryHeader: React.FC<GalleryHeaderProps> = ({
  title,
  count,
  countLabel,
  filterButtons = EMPTY_FILTER_BUTTONS,
  showFilter = true,
  style,
}: GalleryHeaderProps) => {
  const tokens = useAppDesignTokens();
  const styles = useStyles(tokens);

  return (
    <View style={[styles.headerArea, style]}>
      <View>
        {title ? (
          <View style={styles.titleRow}>
            <AtomicText style={styles.title}>{title}</AtomicText>
          </View>
        ) : null}
        <AtomicText style={styles.subtitle}>
          {countLabel}
        </AtomicText>
      </View>
      {showFilter && filterButtons.length > 0 && (
        <View style={styles.filterRow}>
          {filterButtons.map((btn: FilterButtonConfig) => (
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
