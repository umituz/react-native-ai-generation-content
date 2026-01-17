/**
 * Message Tone Selector Component
 * Premium icon-based selector
 */

import type { FC } from "react";
import { View, Pressable, StyleSheet, ScrollView } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
  type IconName,
} from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-localization";
import { MESSAGE_TONES } from "../../domain/constants";
import type { MessageTone } from "../../domain/types";

interface ToneSelectorProps {
  selectedTone: MessageTone;
  onSelectTone: (tone: MessageTone) => void;
}

export const ToneSelector: FC<ToneSelectorProps> = ({
  selectedTone,
  onSelectTone,
}) => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();

  return (
    <View style={styles.container}>
      <AtomicText type="labelLarge" color="textPrimary" style={styles.label}>
        {t("loveMessage.tone")}
      </AtomicText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {MESSAGE_TONES.map((config) => {
          const isSelected = selectedTone === config.tone;
          return (
            <Pressable
              key={config.tone}
              onPress={() => onSelectTone(config.tone)}
              style={[
                styles.item,
                {
                  backgroundColor: isSelected
                    ? tokens.colors.primary
                    : tokens.colors.surfaceSecondary,
                  borderColor: isSelected
                    ? tokens.colors.primary
                    : tokens.colors.borderLight,
                },
              ]}
            >
              <AtomicIcon
                name={config.icon as IconName}
                color={isSelected ? "onPrimary" : "secondary"}
                size="sm"
                style={styles.icon}
              />
              <AtomicText
                type="labelSmall"
                color={isSelected ? "onPrimary" : "textSecondary"}
              >
                {t(config.labelKey)}
              </AtomicText>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    marginBottom: 12,
  },
  scrollContent: {
    gap: 8,
    paddingRight: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  icon: {
    marginRight: 6,
  },
});
