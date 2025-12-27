/**
 * TextToVoiceGenerateButton Component
 * Generate button with loading state
 */

import React from "react";
import { TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-localization";
import type { TextToVoiceGenerateButtonProps } from "../../domain/types";

export const TextToVoiceGenerateButton: React.FC<
  TextToVoiceGenerateButtonProps
> = ({
  isGenerating,
  progress,
  disabled,
  onPress,
  buttonTextKey,
  generatingTextKey,
  style,
}) => {
  const { t } = useLocalization();
  const tokens = useAppDesignTokens();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: tokens.colors.primary,
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {isGenerating ? (
        <>
          <ActivityIndicator
            color={tokens.colors.onPrimary}
            style={styles.loader}
          />
          <AtomicText
            type="bodyMedium"
            style={[styles.buttonText, { color: tokens.colors.onPrimary }]}
          >
            {t(generatingTextKey)} {progress.toFixed(0)}%
          </AtomicText>
        </>
      ) : (
        <>
          <AtomicIcon name="Volume2" size="md" color="onPrimary" />
          <AtomicText
            type="bodyMedium"
            style={[styles.buttonText, { color: tokens.colors.onPrimary }]}
          >
            {t(buttonTextKey)}
          </AtomicText>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
  },
  loader: {
    marginRight: 8,
  },
  buttonText: {
    fontWeight: "600",
    marginLeft: 8,
  },
});
