/**
 * PhotoStep Component
 * Configurable photo upload step using design system components
 *
 * @package @umituz/react-native-ai-generation-content
 */

import React, { useMemo } from "react";
import { View, StyleSheet, type ViewStyle, type StyleProp } from "react-native";
import {
  StepHeader,
  PhotoUploadCard,
} from "@umituz/react-native-design-system";
import type { PhotoStepConfig } from "../../types/flow-config.types";

export interface PhotoStepProps {
  /** Step configuration */
  config: PhotoStepConfig;
  /** Current photo URI */
  imageUri: string | null;
  /** Photo preview URL */
  previewUrl?: string;
  /** Whether photo is being validated */
  isValidating?: boolean;
  /** Whether photo is valid */
  isValid?: boolean | null;
  /** Handler for photo selection */
  onPhotoSelect: () => void;
  /** Whether photo selection is disabled */
  disabled?: boolean;
  /** Step title */
  title: string;
  /** Step subtitle */
  subtitle?: string;
  /** Translation strings for photo upload card */
  translations: {
    tapToUpload: string;
    selectPhoto: string;
    change: string;
    analyzing?: string;
  };
  /** Additional content to render below photo card */
  children?: React.ReactNode;
  /** Container style */
  style?: StyleProp<ViewStyle>;
}

export const PhotoStep: React.FC<PhotoStepProps> = ({
  config,
  imageUri,
  previewUrl,
  isValidating = false,
  isValid = null,
  onPhotoSelect,
  disabled = false,
  title,
  subtitle,
  translations,
  children,
  style,
}) => {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
        },
      }),
    [],
  );

  return (
    <View style={[styles.container, style]}>
      {/* Step Header */}
      <StepHeader
        title={title}
        subtitle={subtitle}
        config={config.header}
      />

      {/* Photo Upload Card */}
      <PhotoUploadCard
        imageUri={previewUrl || imageUri}
        onPress={onPhotoSelect}
        isValidating={isValidating}
        isValid={config.enableValidation ? isValid : null}
        disabled={disabled}
        config={config.photoCard}
        translations={translations}
      />

      {/* Additional content (e.g., name input, tips, etc.) */}
      {children}
    </View>
  );
};
