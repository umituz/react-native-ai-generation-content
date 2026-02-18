/**
 * GalleryScreenHeader Component
 * Header component for the gallery screen
 */

import React, { useMemo } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useAppDesignTokens, AtomicIcon, AtomicText, type DesignTokens } from "@umituz/react-native-design-system";

interface GalleryScreenHeaderProps {
  readonly title: string;
  readonly onBack: () => void;
}

export const GalleryScreenHeader: React.FC<GalleryScreenHeaderProps> = ({ title, onBack }) => {
  const tokens = useAppDesignTokens();
  const styles = useMemo(() => createStyles(tokens), [tokens]);

  return (
    <View style={styles.screenHeader}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <AtomicIcon
          name="chevron-left"
          customSize={28}
          customColor={tokens.colors.textPrimary}
        />
      </TouchableOpacity>
      <AtomicText
        type="titleLarge"
        style={{ color: tokens.colors.textPrimary }}
      >
        {title}
      </AtomicText>
      <View style={styles.placeholder} />
    </View>
  );
};

const createStyles = (tokens: DesignTokens) =>
  StyleSheet.create({
    screenHeader: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
      gap: tokens.spacing.md,
    },
    backButton: {
      padding: tokens.spacing.xs,
    },
    placeholder: {
      width: 36,
    },
  });
