/**
 * ImagePickerBox Component
 * Generic image picker box with gradient design
 * Props-driven for 100+ apps compatibility
 */

import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  type ViewStyle,
} from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
  AtomicIcon,
} from "@umituz/react-native-design-system";
import { LinearGradient } from "expo-linear-gradient";

export interface ImagePickerBoxProps {
  readonly imageUri: string | null;
  readonly isDisabled?: boolean;
  readonly onPress: () => void;
  readonly placeholderText: string;
  readonly gradientColors?: readonly [string, string, ...string[]];
  readonly variant?: "portrait" | "square" | "landscape";
  readonly size?: "sm" | "md" | "lg";
  readonly uploadIcon?: string;
  readonly editIcon?: string;
}

const VARIANT_STYLES: Record<string, ViewStyle> = {
  portrait: { width: 200, height: 280, borderRadius: 20 },
  square: { width: "100%", aspectRatio: 1, borderRadius: 24 },
  landscape: { width: "100%", aspectRatio: 16 / 9, borderRadius: 16 },
};

const SIZE_MULTIPLIERS = { sm: 0.7, md: 1, lg: 1.3 };

export const ImagePickerBox: React.FC<ImagePickerBoxProps> = ({
  imageUri,
  isDisabled = false,
  onPress,
  placeholderText,
  gradientColors = ["#667eea", "#764ba2"],
  variant = "portrait",
  size = "md",
  uploadIcon = "cloud-upload-outline",
  editIcon = "image-outline",
}) => {
  const tokens = useAppDesignTokens();
  const multiplier = SIZE_MULTIPLIERS[size];
  const baseStyle = VARIANT_STYLES[variant];
  const iconSize = Math.round(32 * multiplier);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.box,
          baseStyle,
          { backgroundColor: tokens.colors.backgroundSecondary },
        ]}
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.8}
      >
        {imageUri ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: imageUri }} style={styles.image} />
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.3)"]}
              style={styles.imageOverlay}
            >
              <View
                style={[
                  styles.editBadge,
                  { backgroundColor: `${gradientColors[1]}E6` },
                ]}
              >
                <AtomicIcon
                  name={editIcon}
                  customSize={Math.round(16 * multiplier)}
                  customColor="#FFFFFF"
                />
              </View>
            </LinearGradient>
          </View>
        ) : (
          <LinearGradient colors={gradientColors} style={styles.placeholder}>
            <View style={styles.placeholderContent}>
              <View style={styles.uploadIconContainer}>
                <AtomicIcon
                  name={uploadIcon}
                  customSize={iconSize}
                  customColor="#FFFFFF"
                />
              </View>
              <AtomicText
                type="bodyMedium"
                style={[styles.placeholderText, { color: "#FFFFFF" }]}
              >
                {placeholderText}
              </AtomicText>
            </View>
          </LinearGradient>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    alignItems: "center",
  },
  box: {
    overflow: "hidden",
  },
  imageContainer: {
    flex: 1,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "30%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 12,
  },
  editBadge: {
    borderRadius: 20,
    padding: 8,
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  uploadIconContainer: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 40,
    padding: 16,
    marginBottom: 12,
  },
  placeholderText: {
    textAlign: "center",
    fontWeight: "600",
  },
});
