/**
 * ResultImageCard Component
 * Displays generated image with AI badge
 */

import * as React from "react";
import { useMemo } from "react";
import { View, Image, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";

export interface ResultImageCardProps {
  imageUrl: string;
  badgeText: string;
}

export const ResultImageCard: React.FC<ResultImageCardProps> = ({
  imageUrl,
  badgeText,
}) => {
  const tokens = useAppDesignTokens();

  const styles = useMemo(() => StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    frame: {
      borderRadius: 20,
      overflow: "hidden",
      backgroundColor: tokens.colors.surface,
    },
    image: {
      width: "100%",
      aspectRatio: 1,
    },
    badge: {
      position: "absolute",
      top: 12,
      right: 12,
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      paddingHorizontal: 10,
      paddingVertical: 5,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      borderRadius: 12,
    },
    badgeText: {
      fontSize: 10,
      fontWeight: "700",
      color: "#FFFFFF",
      letterSpacing: 0.5,
    },
  }), [tokens]);

  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
        <View style={styles.badge}>
          <AtomicIcon name="sparkles" size="xs" color="onPrimary" />
          <AtomicText style={styles.badgeText}>{badgeText}</AtomicText>
        </View>
      </View>
    </View>
  );
};
