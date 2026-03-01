/**
 * ModerationSummary Component
 * Displays content moderation results including age rating and warnings
 */

import React from "react";
import { View, StyleSheet, type ViewStyle } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";

export interface ModerationSummaryProps {
  readonly ageRating?: string;
  readonly contentWarnings: readonly string[];
  readonly title?: string;
  readonly style?: ViewStyle;
}

export const ModerationSummary: React.FC<ModerationSummaryProps> = ({
  ageRating,
  contentWarnings,
  title = "Safety Check",
  style,
}) => {
  const tokens = useAppDesignTokens();

  if (!ageRating && (!contentWarnings || contentWarnings.length === 0)) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      {title && (
        <AtomicText
          type="bodyMedium"
          style={[styles.label, { color: tokens.colors.textPrimary }]}
        >
          {title}
        </AtomicText>
      )}
      {ageRating && (
        <View
          style={[
            styles.badge,
            {
              backgroundColor: tokens.colors.surface,
              borderColor: tokens.colors.borderLight,
            },
          ]}
        >
          <AtomicText
            type="bodySmall"
            style={[styles.badgeText, { color: tokens.colors.textPrimary }]}
          >
            Age Rating: {ageRating}
          </AtomicText>
        </View>
      )}
      {contentWarnings && contentWarnings.length > 0 && (
        <View style={styles.warningsContainer}>
          {contentWarnings.map((warning) => (
            <AtomicText
              key={warning}
              type="labelSmall"
              style={[styles.warningText, { color: tokens.colors.textSecondary }]}
            >
              • {warning}
            </AtomicText>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: "100%",
  },
  label: {
    fontWeight: "600",
    marginBottom: 12,
  },
  badge: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  badgeText: {
    fontWeight: "600",
  },
  warningsContainer: {
    marginTop: 4,
  },
  warningText: {
    marginBottom: 4,
    lineHeight: 16,
  },
});
