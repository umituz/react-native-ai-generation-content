/**
 * RetryButton Component
 * Retry button for ResultActions
 */

import * as React from "react";
import { TouchableOpacity } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import type { ResultActionsStyles } from "./ResultActions.styles";

interface RetryButtonProps {
  styles: ResultActionsStyles;
  onPress: () => void;
  label?: string;
  icon?: string;
}

export const RetryButton: React.FC<RetryButtonProps> = ({
  styles,
  onPress,
  label,
  icon,
}) => {
  return (
    <TouchableOpacity style={styles.retryButton} onPress={onPress}>
      <AtomicIcon
        name={icon ?? "refresh"}
        size="sm"
        color="primary"
      />
      <AtomicText style={styles.retryText}>
        {label}
      </AtomicText>
    </TouchableOpacity>
  );
};
