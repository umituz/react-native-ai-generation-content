/**
 * GridImageItem Component
 * Displays a single image in the grid with remove button and badge
 */

import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import {
  AtomicIcon,
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import type { ImageSelectionGridStyles } from "./ImageSelectionGrid.styles";

interface GridImageItemProps {
  styles: ImageSelectionGridStyles;
  uri: string;
  index: number;
  onRemove: () => void;
}

export const GridImageItem: React.FC<GridImageItemProps> = ({
  styles,
  uri,
  index,
  onRemove,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={styles.imageCard}>
      <Image
        source={{ uri }}
        style={styles.imagePreview}
        resizeMode="cover"
      />
      <TouchableOpacity
        style={[
          styles.removeButton,
          { backgroundColor: tokens.colors.error },
        ]}
        onPress={onRemove}
      >
        <AtomicIcon name="close-circle" size="sm" color="onSurface" />
      </TouchableOpacity>
      <View
        style={[
          styles.imageBadge,
          { backgroundColor: tokens.colors.primary },
        ]}
      >
        <AtomicText
          type="labelSmall"
          style={[
            styles.badgeText,
            { color: tokens.colors.textInverse },
          ]}
        >
          {index + 1}
        </AtomicText>
      </View>
    </View>
  );
}
