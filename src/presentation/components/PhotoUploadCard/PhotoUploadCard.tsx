/**
 * PhotoUploadCard Component
 * Beautiful photo upload card with validation status and responsive design
 *
 * @package @umituz/react-native-ai-generation-content
 */

import React, { useMemo } from "react";
import { View, Pressable } from "react-native";
import { useAppDesignTokens } from "@umituz/react-native-design-system";
import { ValidatingContent } from "./ValidatingContent";
import { ImageContent } from "./ImageContent";
import { PlaceholderContent } from "./PlaceholderContent";
import { useBorderColor } from "./useBorderColor";
import { createPhotoUploadCardStyles } from "./PhotoUploadCard.styles";
import type { PhotoUploadCardProps } from "./PhotoUploadCard.types";
import { DEFAULT_CONFIG } from "./PhotoUploadCard.types";

export const PhotoUploadCard: React.FC<PhotoUploadCardProps> = ({
  imageUri,
  onPress,
  isValidating = false,
  isValid = null,
  disabled = false,
  config,
  translations = {
    tapToUpload: "Tap to Upload",
    selectPhoto: "Select a photo",
    change: "Change",
    analyzing: "Analyzing...",
  },
  title,
  subtitle,
  icon,
  style,
}) => {
  const tokens = useAppDesignTokens();
  const cfg = { ...DEFAULT_CONFIG, ...config };
  const borderColor = useBorderColor({
    isValidating,
    isValid,
    showValidationStatus: cfg.showValidationStatus ?? true,
  });

  const styles = useMemo(
    () => createPhotoUploadCardStyles({ tokens, imageUri, config: cfg }),
    [tokens, imageUri, cfg]
  );

  return (
    <View style={[styles.container, style]}>
      <Pressable
        style={[styles.card, { borderColor }]}
        onPress={onPress}
        disabled={disabled || isValidating}
      >
        {isValidating ? (
          <ValidatingContent
            styles={styles}
            analyzingText={translations.analyzing}
          />
        ) : imageUri ? (
          <ImageContent
            styles={styles}
            imageUri={imageUri}
            allowChange={cfg.allowChange ?? true}
            changeText={translations.change}
            onPress={onPress}
          />
        ) : (
          <PlaceholderContent
            styles={styles}
            title={title || translations.tapToUpload}
            subtitle={subtitle || translations.selectPhoto}
            icon={icon || "camera"}
            iconSize={cfg.iconSize ?? 40}
          />
        )}
      </Pressable>
    </View>
  );
};

export type { PhotoUploadCardProps, PhotoUploadCardConfig } from "./PhotoUploadCard.types";
