/**
 * ProgressDismissButton Component
 * Dismiss button for progress modal
 */

import React from "react";
import { TouchableOpacity } from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { generationProgressContentStyles } from "./GenerationProgressContent.styles";

interface ProgressDismissButtonProps {
  dismissLabel?: string;
  dismissButtonColor?: string;
  onDismiss: () => void;
}

export const ProgressDismissButton: React.FC<ProgressDismissButtonProps> = ({
  dismissLabel,
  dismissButtonColor,
  onDismiss,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <TouchableOpacity
      style={[
        generationProgressContentStyles.dismissButton,
        {
          backgroundColor: dismissButtonColor || tokens.colors.primary,
        },
      ]}
      onPress={onDismiss}
    >
      <AtomicText
        type="bodyMedium"
        style={[
          generationProgressContentStyles.dismissText,
          { color: tokens.colors.textInverse },
        ]}
      >
        {dismissLabel || "OK"}
      </AtomicText>
    </TouchableOpacity>
  );
};
