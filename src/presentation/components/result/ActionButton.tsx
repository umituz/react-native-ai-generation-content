/**
 * ActionButton Component
 * Individual action button for ResultActions
 */

import * as React from "react";
import { TouchableOpacity } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import type { ResultActionsStyles } from "./ResultActions.styles";
import { getButtonStyle } from "./button-style.utils";

interface ActionButtonProps {
  styles: ResultActionsStyles;
  onPress: () => void;
  isProcessing?: boolean;
  label?: string;
  processingLabel?: string;
  icon?: string;
  variant?: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  styles,
  onPress,
  isProcessing = false,
  label,
  processingLabel,
  icon,
  variant,
}) => {
  const tokens = useAppDesignTokens();
  const buttonStyle = getButtonStyle(variant, tokens);
  const displayLabel = isProcessing ? processingLabel : label;
  const displayIcon = isProcessing ? "hourglass" : icon;

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle]}
      onPress={onPress}
      disabled={isProcessing}
    >
      {displayIcon && (
        <AtomicIcon
          name={displayIcon}
          size="md"
          customColor={buttonStyle.textColor}
        />
      )}
      <AtomicText
        style={{
          fontSize: 15,
          fontWeight: "700",
          color: buttonStyle.textColor,
        }}
      >
        {displayLabel}
      </AtomicText>
    </TouchableOpacity>
  );
};
