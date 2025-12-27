/**
 * Generate Button Component
 * Generic generate button with loading state
 */

import React from "react";
import { View, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";

export interface GenerateButtonProps {
  onPress: () => void;
  isGenerating: boolean;
  isDisabled?: boolean;
  buttonText: string;
  generatingText: string;
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({
  onPress,
  isGenerating,
  isDisabled = false,
  buttonText,
  generatingText,
}) => {
  const tokens = useAppDesignTokens();
  const disabled = isGenerating || isDisabled;

  return (
    <View style={componentStyles.container}>
      <TouchableOpacity
        style={[
          componentStyles.button,
          {
            backgroundColor: disabled
              ? tokens.colors.primary + "60"
              : tokens.colors.primary,
          },
        ]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
      >
        {isGenerating ? (
          <>
            <ActivityIndicator
              size="small"
              color={tokens.colors.textInverse}
              style={componentStyles.loader}
            />
            <AtomicText
              type="bodyMedium"
              style={[componentStyles.text, { color: tokens.colors.textInverse }]}
            >
              {generatingText}
            </AtomicText>
          </>
        ) : (
          <>
            <AtomicIcon name="videocam-outline" size="md" color="onSurface" />
            <AtomicText
              type="bodyMedium"
              style={[componentStyles.text, { color: tokens.colors.textInverse }]}
            >
              {buttonText}
            </AtomicText>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

const componentStyles = StyleSheet.create({
  container: {
    padding: 16,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 16,
  },
  loader: {
    marginRight: 8,
  },
  text: {
    fontWeight: "600",
    marginLeft: 8,
  },
});
