/**
 * ImageContent Component
 * Displays uploaded image with change button
 */

import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import {
  AtomicIcon,
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import type { PhotoUploadCardStyles } from "./PhotoUploadCard.styles";

interface ImageContentProps {
  styles: PhotoUploadCardStyles;
  imageUri: string;
  allowChange: boolean;
  changeText: string;
  onPress: () => void;
}

export function ImageContent({
  styles,
  imageUri,
  allowChange,
  changeText,
  onPress,
}: ImageContentProps) {
  const tokens = useAppDesignTokens();

  return (
    <>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.imageOverlay} />
      {allowChange && (
        <TouchableOpacity style={styles.changeButton} onPress={onPress}>
          <AtomicIcon
            name="camera"
            size={18}
            customColor={tokens.colors.primary}
          />
          <AtomicText style={styles.changeText}>{changeText}</AtomicText>
        </TouchableOpacity>
      )}
    </>
  );
}
