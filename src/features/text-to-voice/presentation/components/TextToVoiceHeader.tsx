/**
 * TextToVoiceHeader Component
 * Header with icon and description
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-localization";
import type { TextToVoiceHeaderProps } from "../../domain/types";

export const TextToVoiceHeader: React.FC<TextToVoiceHeaderProps> = ({
  descriptionKey,
  iconName,
  headerContent,
  style,
}) => {
  const { t } = useLocalization();
  const tokens = useAppDesignTokens();

  return (
    <View style={[styles.container, style]}>
      {headerContent || (
        <View style={styles.content}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: `${tokens.colors.primary}20` },
            ]}
          >
            <AtomicIcon
              name={iconName as "Mic"}
              size="lg"
              color="primary"
            />
          </View>
          <AtomicText
            type="bodySmall"
            style={[styles.description, { color: tokens.colors.textSecondary }]}
          >
            {t(descriptionKey)}
          </AtomicText>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 16,
  },
  content: {
    alignItems: "center",
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  description: {
    marginTop: 8,
    textAlign: "center",
  },
});
