/**
 * CreationThumbnail Component
 * Displays a single creation thumbnail
 */

import React, { useMemo, useState } from "react";
import { Image, TouchableOpacity, StyleSheet, View } from "react-native";
import { AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";

interface CreationThumbnailProps {
  readonly uri: string;
  readonly size?: number;
  readonly onPress?: () => void;
}

export function CreationThumbnail({
  uri,
  size = 72,
  onPress,
}: CreationThumbnailProps) {
  const tokens = useAppDesignTokens();
  const [isPressed, setIsPressed] = useState(false);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        thumbnail: {
          width: size,
          height: size,
          borderRadius: tokens.spacing.sm,
          backgroundColor: tokens.colors.backgroundSecondary,
        },
        overlay: {
          ...StyleSheet.absoluteFillObject,
          backgroundColor: tokens.colors.modalOverlay,
          borderRadius: tokens.spacing.sm,
          justifyContent: "center",
          alignItems: "center",
        },
      }),
    [tokens, size]
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      activeOpacity={1}
    >
      <Image source={{ uri }} style={styles.thumbnail} />
      {isPressed && onPress && (
        <View style={styles.overlay}>
          <AtomicIcon name="eye" size="lg" color="textInverse" />
        </View>
      )}
    </TouchableOpacity>
  );
}
