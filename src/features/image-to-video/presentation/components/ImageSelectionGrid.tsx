/**
 * Image Selection Grid Component
 * Generic component for image selection display
 */

import React from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";

export interface ImageSelectionGridTranslations {
  selectedImages: string;
  selectImages: string;
  chooseUpTo: string;
  addMore: string;
}

export interface ImageSelectionGridProps {
  images: string[];
  maxImages: number;
  onSelectImages: () => void;
  onRemoveImage: (index: number) => void;
  translations: ImageSelectionGridTranslations;
}

export const ImageSelectionGrid: React.FC<ImageSelectionGridProps> = ({
  images,
  maxImages,
  onSelectImages,
  onRemoveImage,
  translations,
}) => {
  const tokens = useAppDesignTokens();

  if (images.length === 0) {
    return (
      <View style={componentStyles.section}>
        <AtomicText
          type="bodyMedium"
          style={[componentStyles.label, { color: tokens.colors.textPrimary }]}
        >
          {translations.selectedImages} (0/{maxImages})
        </AtomicText>
        <TouchableOpacity
          style={[
            componentStyles.uploadBox,
            {
              backgroundColor: tokens.colors.surface,
              borderColor: tokens.colors.borderLight,
            },
          ]}
          onPress={onSelectImages}
          activeOpacity={0.7}
        >
          <AtomicIcon name="Upload" size="xl" color="primary" />
          <AtomicText
            type="bodyMedium"
            style={[
              componentStyles.uploadText,
              { color: tokens.colors.primary },
            ]}
          >
            {translations.selectImages}
          </AtomicText>
          <AtomicText
            type="labelSmall"
            style={{ color: tokens.colors.textSecondary }}
          >
            {translations.chooseUpTo.replace("{max}", String(maxImages))}
          </AtomicText>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={componentStyles.section}>
      <AtomicText
        type="bodyMedium"
        style={[componentStyles.label, { color: tokens.colors.textPrimary }]}
      >
        {translations.selectedImages} ({images.length}/{maxImages})
      </AtomicText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={componentStyles.scroll}
      >
        {images.map((uri, index) => (
          <View key={index} style={componentStyles.imageCard}>
            <Image
              source={{ uri }}
              style={componentStyles.imagePreview}
              resizeMode="cover"
            />
            <TouchableOpacity
              style={[
                componentStyles.removeButton,
                { backgroundColor: tokens.colors.error },
              ]}
              onPress={() => onRemoveImage(index)}
            >
              <AtomicIcon name="close-circle" size="sm" color="onSurface" />
            </TouchableOpacity>
            <View
              style={[
                componentStyles.imageBadge,
                { backgroundColor: tokens.colors.primary },
              ]}
            >
              <AtomicText
                type="labelSmall"
                style={[
                  componentStyles.badgeText,
                  { color: tokens.colors.textInverse },
                ]}
              >
                {index + 1}
              </AtomicText>
            </View>
          </View>
        ))}

        {images.length < maxImages && (
          <TouchableOpacity
            style={[
              componentStyles.addMoreCard,
              {
                backgroundColor: tokens.colors.surface,
                borderColor: tokens.colors.borderLight,
              },
            ]}
            onPress={onSelectImages}
            activeOpacity={0.7}
          >
            <AtomicIcon name="add" size="lg" color="primary" />
            <AtomicText
              type="labelSmall"
              style={[
                componentStyles.addMoreText,
                { color: tokens.colors.primary },
              ]}
            >
              {translations.addMore}
            </AtomicText>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

const componentStyles = StyleSheet.create({
  section: {
    padding: 16,
    marginBottom: 8,
  },
  label: {
    fontWeight: "600",
    marginBottom: 12,
  },
  uploadBox: {
    padding: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderStyle: "dashed",
  },
  uploadText: {
    fontWeight: "600",
    marginTop: 12,
  },
  scroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  imageCard: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginRight: 12,
    position: "relative",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  removeButton: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  imageBadge: {
    position: "absolute",
    bottom: 6,
    left: 6,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    fontSize: 10,
  },
  addMoreCard: {
    width: 120,
    height: 120,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderStyle: "dashed",
  },
  addMoreText: {
    marginTop: 4,
  },
});
