/**
 * Generated Message Result Component
 */

import type { FC } from "react";
import { View, StyleSheet, Share } from "react-native";
import {
  AtomicText,
  AtomicButton,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-localization";

interface MessageResultProps {
  message: string;
}

export const MessageResult: FC<MessageResultProps> = ({ message }) => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();

  if (!message) return null;

  const handleShare = async () => {
    try {
      await Share.share({
        message: message,
      });
    } catch {
      // Handle error if needed
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: tokens.colors.surface,
          borderColor: tokens.colors.primary,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <AtomicIcon name="sparkles" color="primary" size="sm" />
          <AtomicText type="labelLarge" color="primary" style={styles.title}>
            {t("loveMessage.yourMessage")}
          </AtomicText>
        </View>
        <AtomicButton
          icon="share-social-outline"
          onPress={handleShare}
          variant="text"
          size="sm"
        />
      </View>
      <View
        style={[styles.divider, { backgroundColor: tokens.colors.borderLight }]}
      />
      <AtomicText
        type="bodyLarge"
        color="textPrimary"
        style={styles.messageText}
      >
        {message}
      </AtomicText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    borderRadius: 24,
    padding: 24,
    borderWidth: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    marginLeft: 8,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    marginBottom: 20,
    opacity: 0.5,
  },
  messageText: {
    lineHeight: 26,
    fontStyle: "italic",
    textAlign: "center",
  },
});
