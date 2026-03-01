/**
 * ProgressCloseButton Component
 * Close button for progress modal
 */

import React from "react";
import { TouchableOpacity } from "react-native";
import { AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { generationProgressContentStyles } from "./GenerationProgressContent.styles";

interface ProgressCloseButtonProps {
  onPress: () => void;
}

export const ProgressCloseButton: React.FC<ProgressCloseButtonProps> = ({
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={generationProgressContentStyles.closeButton}
      onPress={onPress}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <AtomicIcon name="close" size="md" color="secondary" />
    </TouchableOpacity>
  );
};
