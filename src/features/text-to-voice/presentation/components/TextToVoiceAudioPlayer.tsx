/**
 * TextToVoiceAudioPlayer Component
 * Audio player with play button
 */

import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-localization";
import type { TextToVoiceAudioPlayerProps } from "../../domain/types";

export const TextToVoiceAudioPlayer: React.FC<TextToVoiceAudioPlayerProps> = ({
  onPlay,
  successTextKey,
  playButtonTextKey,
  style,
}) => {
  const { t } = useLocalization();
  const tokens = useAppDesignTokens();

  return (
    <View
      style={[styles.card, { backgroundColor: tokens.colors.surface }, style]}
    >
      <View style={styles.header}>
        <AtomicIcon name="checkmark-circle" size="md" color="success" />
        <AtomicText
          type="bodyMedium"
          style={[styles.successText, { color: tokens.colors.success }]}
        >
          {t(successTextKey)}
        </AtomicText>
      </View>
      <TouchableOpacity
        style={[styles.playButton, { backgroundColor: tokens.colors.primary }]}
        onPress={onPlay}
      >
        <AtomicIcon name="play" size="md" color="onPrimary" />
        <AtomicText
          type="bodyMedium"
          style={[styles.buttonText, { color: tokens.colors.onPrimary }]}
        >
          {t(playButtonTextKey)}
        </AtomicText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  successText: {
    fontWeight: "600",
    marginLeft: 8,
  },
  playButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    fontWeight: "600",
    marginLeft: 8,
  },
});
