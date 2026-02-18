/**
 * ProgressHeader Component
 * Icon, title, and message section for progress modal
 */

import React from "react";
import { View } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { generationProgressContentStyles } from "./GenerationProgressContent.styles";

interface ProgressHeaderProps {
  icon?: string;
  title?: string;
  message?: string;
  textColor?: string;
}

export const ProgressHeader: React.FC<ProgressHeaderProps> = ({
  icon,
  title,
  message,
  textColor,
}) => {
  const tokens = useAppDesignTokens();
  const activeTextColor = textColor || tokens.colors.textPrimary;

  return (
    <>
      {icon && (
        <View style={generationProgressContentStyles.iconContainer}>
          <AtomicIcon name={icon} size="xl" color="primary" />
        </View>
      )}

      {title && (
        <AtomicText
          type="headlineSmall"
          style={[
            generationProgressContentStyles.title,
            { color: activeTextColor },
          ]}
        >
          {title}
        </AtomicText>
      )}

      {message && (
        <AtomicText
          type="bodyMedium"
          style={[
            generationProgressContentStyles.message,
            { color: tokens.colors.textSecondary },
          ]}
        >
          {message}
        </AtomicText>
      )}
    </>
  );
};
