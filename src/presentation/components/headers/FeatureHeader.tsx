/**
 * FeatureHeader Component
 * Generic feature header with hero image and description
 * Props-driven for 100+ apps compatibility
 */

import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import type { ImageSourcePropType } from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";

export interface FeatureHeaderProps {
  readonly imageSource: ImageSourcePropType;
  readonly description: string;
  readonly minHeight?: number;
}

export const FeatureHeader: React.FC<FeatureHeaderProps> = ({
  imageSource,
  description,
  minHeight = 200,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <>
      <View
        style={[
          styles.headerContainer,
          { borderColor: tokens.colors.border },
        ]}
      >
        <ImageBackground
          source={imageSource}
          style={[styles.heroImage, { minHeight }]}
          imageStyle={styles.heroImageStyle}
        >
          <View
            style={[
              styles.overlay,
              {
                minHeight,
                backgroundColor: tokens.colors.modalOverlay,
              },
            ]}
          />
        </ImageBackground>
      </View>
      <AtomicText
        type="bodyLarge"
        style={[
          styles.description,
          {
            color: tokens.colors.textSecondary,
            marginTop: tokens.spacing.md,
            marginBottom: tokens.spacing.md,
          },
        ]}
      >
        {description}
      </AtomicText>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 8,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
  },
  heroImage: {
    width: "100%",
  },
  heroImageStyle: {
    borderRadius: 20,
  },
  overlay: {
    flex: 1,
  },
  description: {
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 16,
    fontWeight: "500",
  },
});
