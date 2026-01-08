/**
 * Message Type Selector Component
 * Premium icon-based selector
 */

import type { FC } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-localization";
import { MESSAGE_TYPES } from "../../domain/constants";
import type { MessageType } from "../../domain/types";

interface TypeSelectorProps {
  selectedType: MessageType;
  onSelectType: (type: MessageType) => void;
}

export const TypeSelector: FC<TypeSelectorProps> = ({
  selectedType,
  onSelectType,
}) => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();

  return (
    <View style={styles.container}>
      <AtomicText type="labelLarge" color="textPrimary" style={styles.label}>
        {t("loveMessage.messageType")}
      </AtomicText>
      <View style={styles.grid}>
        {MESSAGE_TYPES.map((config) => {
          const isSelected = selectedType === config.type;
          return (
            <Pressable
              key={config.type}
              onPress={() => onSelectType(config.type)}
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
                name={config.icon as any}
                color={isSelected ? "onPrimary" : "secondary"}
                size="md"
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
      </View>
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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    minWidth: "47%",
    flex: 1,
  },
  icon: {
    marginRight: 8,
  },
});
