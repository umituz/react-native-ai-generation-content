/**
 * ResultImageCard Component
 * Displays AI generation result image with proper styling
 */

import React, { useMemo } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { AtomicImage, useAppDesignTokens } from "@umituz/react-native-design-system";
import type { ResultImageCardProps } from "../types/result-preview.types";

export const ResultImageCard: React.FC<ResultImageCardProps> = ({
  imageUrl,
  style,
  rounded = true,
}) => {
  const tokens = useAppDesignTokens();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          width: "100%",
          aspectRatio: 1,
          borderRadius: rounded ? tokens.borders.radius.md : 0,
          overflow: "hidden",
          backgroundColor: tokens.colors.backgroundSecondary,
        },
        image: {
          width: "100%",
          height: "100%",
        },
      }),
    [tokens, rounded],
  );

  const displayImageUrl = useMemo(() => {
    if (!imageUrl) return null;

    // If not a URL and not a data URL, assume it's base64
    if (
      !imageUrl.startsWith("http") &&
      !imageUrl.startsWith("data:image")
    ) {
      return `data:image/jpeg;base64,${imageUrl}`;
    }

    return imageUrl;
  }, [imageUrl]);

  if (!displayImageUrl) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <AtomicImage
        source={{ uri: displayImageUrl }}
        style={styles.image}
        rounded={rounded}
      />
    </View>
  );
};
