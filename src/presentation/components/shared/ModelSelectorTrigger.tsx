/**
 * ModelSelectorTrigger Component
 * Single Responsibility: Render the trigger button for model selection
 */

import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import {
  useAppDesignTokens,
  AtomicText,
  AtomicIcon,
} from "@umituz/react-native-design-system";

interface ModelSelectorTriggerProps {
  readonly displayName: string;
  readonly isLoading: boolean;
  readonly onPress: () => void;
}

export const ModelSelectorTrigger: React.FC<ModelSelectorTriggerProps> = ({
  displayName,
  isLoading,
  onPress,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <TouchableOpacity
      style={[
        styles.trigger,
        {
          backgroundColor: tokens.colors.surface,
          borderRadius: tokens.borders.radius.md,
        },
      ]}
      onPress={onPress}
      disabled={isLoading}
    >
      <AtomicText type="labelMedium" color="textPrimary">
        {displayName}
      </AtomicText>
      <AtomicIcon name="chevron-down" size="xs" color="secondary" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 4,
  },
});
