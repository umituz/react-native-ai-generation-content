/**
 * ResultHeader Component
 * Header with title and date badge - fully configurable
 */

import * as React from "react";
import { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import type { ResultHeaderConfig } from "../../types/result-config.types";
import { DEFAULT_RESULT_CONFIG } from "../../types/result-config.types";

export interface ResultHeaderProps {
  title?: string;
  date?: string;
  config?: ResultHeaderConfig;
}

export const ResultHeader: React.FC<ResultHeaderProps> = ({
  title,
  date,
  config = DEFAULT_RESULT_CONFIG.header,
}) => {
  const tokens = useAppDesignTokens();
  const cfg = { ...DEFAULT_RESULT_CONFIG.header, ...config };

  const styles = useMemo(() => {
    const badgeStyles =
      cfg.dateBadgeStyle === "outline"
        ? {
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: tokens.colors.primary,
          }
        : cfg.dateBadgeStyle === "minimal"
          ? {
              backgroundColor: "transparent",
            }
          : {
              backgroundColor: tokens.colors.primaryContainer,
            };

    return StyleSheet.create({
      container: {
        alignItems:
          cfg.titleAlignment === "left"
            ? "flex-start"
            : cfg.titleAlignment === "right"
              ? "flex-end"
              : "center",
        paddingHorizontal: cfg.spacing?.paddingHorizontal ?? 24,
        marginBottom: cfg.spacing?.marginBottom ?? 20,
      },
      title: {
        fontSize: cfg.titleFontSize ?? 24,
        lineHeight: (cfg.titleFontSize ?? 24) * 1.33,
        fontWeight: cfg.titleFontWeight ?? "800",
        color: tokens.colors.textPrimary,
        textAlign: cfg.titleAlignment ?? "center",
        marginBottom: cfg.spacing?.titleMarginBottom ?? 12,
      },
      badge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 16,
        ...badgeStyles,
      },
      dateText: {
        fontSize: 12,
        fontWeight: "600",
        color: tokens.colors.primary,
      },
    });
  }, [tokens, cfg]);

  if (!title && !date) return null;
  if (!cfg.showTitle && !cfg.showDate) return null;

  return (
    <View style={styles.container}>
      {cfg.showTitle && title && (
        <AtomicText style={styles.title}>{title}</AtomicText>
      )}
      {cfg.showDate && date && (
        <View style={styles.badge}>
          {cfg.showDateIcon && (
            <AtomicIcon name="calendar-outline" size="sm" color="primary" />
          )}
          <AtomicText style={styles.dateText}>{date}</AtomicText>
        </View>
      )}
    </View>
  );
};
