/**
 * ResultHeader Component
 * Header with title and date badge
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";

export interface ResultHeaderProps {
  title?: string;
  date?: string;
}

export const ResultHeader: React.FC<ResultHeaderProps> = ({ title, date }) => {
  const tokens = useAppDesignTokens();
  const styles = createStyles(tokens);

  if (!title && !date) return null;

  return (
    <View style={styles.container}>
      {title && <AtomicText style={styles.title}>{title}</AtomicText>}
      {date && (
        <View style={styles.badge}>
          <AtomicIcon
            name="calendar-outline"
            size={14}
            customColor={tokens.colors.primary}
          />
          <AtomicText style={styles.dateText}>{date}</AtomicText>
        </View>
      )}
    </View>
  );
};

const createStyles = (tokens: any) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      paddingHorizontal: 24,
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      lineHeight: 32,
      fontWeight: "800",
      color: tokens.colors.textPrimary,
      textAlign: "center",
      marginBottom: 12,
    },
    badge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingHorizontal: 14,
      paddingVertical: 6,
      backgroundColor: `${tokens.colors.primary}15`,
      borderRadius: 16,
    },
    dateText: {
      fontSize: 12,
      fontWeight: "600",
      color: tokens.colors.primary,
    },
  });
