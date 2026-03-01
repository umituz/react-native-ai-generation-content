/**
 * Image Selection Grid Component
 * Generic component for image selection display
 */

import React, { useMemo } from "react";
import { View, ScrollView } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { EmptyGridState } from "./EmptyGridState";
import { GridImageItem } from "./GridImageItem";
import { AddMoreCard } from "./AddMoreCard";
import { createImageSelectionGridStyles } from "./ImageSelectionGrid.styles";
import type { ImageSelectionGridProps } from "./ImageSelectionGrid.types";

export const ImageSelectionGrid: React.FC<ImageSelectionGridProps> = ({
  images,
  maxImages,
  onSelectImages,
  onRemoveImage,
  translations,
}) => {
  const tokens = useAppDesignTokens();
  const styles = useMemo(
    () => createImageSelectionGridStyles(tokens),
    [tokens]
  );

  if (images.length === 0) {
    return (
      <EmptyGridState
        styles={styles}
        maxImages={maxImages}
        translations={translations}
        onSelectImages={onSelectImages}
      />
    );
  }

  return (
    <View style={styles.section}>
      <AtomicText
        type="bodyMedium"
        style={[styles.label, { color: tokens.colors.textPrimary }]}
      >
        {translations.selectedImages} ({images.length}/{maxImages})
      </AtomicText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scroll}
      >
        {images.map((uri, index) => (
          <GridImageItem
            key={uri}
            styles={styles}
            uri={uri}
            index={index}
            onRemove={() => onRemoveImage(index)}
          />
        ))}

        {images.length < maxImages && (
          <AddMoreCard
            styles={styles}
            addMoreText={translations.addMore}
            onPress={onSelectImages}
          />
        )}
      </ScrollView>
    </View>
  );
};

export type { ImageSelectionGridProps, ImageSelectionGridTranslations } from "./ImageSelectionGrid.types";
