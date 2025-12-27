/**
 * Text-to-Image Generate Button Component
 * Button to trigger image generation with cost display
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicButton,
  AtomicIcon,
} from "@umituz/react-native-design-system";

export interface TextToImageGenerateButtonProps {
  onPress: () => void;
  onSettingsPress?: () => void;
  disabled: boolean;
  label: string;
  costLabel?: string;
  showSettings?: boolean;
}

export const TextToImageGenerateButton: React.FC<TextToImageGenerateButtonProps> = ({
  onPress,
  onSettingsPress,
  disabled,
  label,
  costLabel,
  showSettings = true,
}) => {

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <AtomicButton
          onPress={onPress}
          disabled={disabled}
          variant="primary"
          size="md"
          style={styles.generateButton}
        >
          <AtomicText type="bodyLarge" style={styles.buttonText}>
            {label}
            {costLabel && ` (${costLabel})`}
          </AtomicText>
        </AtomicButton>

        {showSettings && onSettingsPress && (
          <AtomicButton
            onPress={onSettingsPress}
            variant="secondary"
            size="md"
            style={styles.settingsButton}
          >
            <AtomicIcon name="settings-outline" size="md" color="primary" />
          </AtomicButton>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
  generateButton: {
    flex: 1,
    paddingVertical: 16,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  settingsButton: {
    width: 56,
    justifyContent: "center",
    alignItems: "center",
  },
});
