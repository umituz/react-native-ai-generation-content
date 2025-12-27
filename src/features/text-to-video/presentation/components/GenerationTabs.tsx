/**
 * GenerationTabs Component
 * Single Responsibility: Tab navigation for generation modes
 */

import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import type { GenerationTabsProps } from "../../domain/types";

export const GenerationTabs: React.FC<GenerationTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  getLabel,
  style,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: tokens.colors.background },
        style,
      ]}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              isActive && { backgroundColor: tokens.colors.secondary },
            ]}
            onPress={() => onTabChange(tab.id)}
          >
            <AtomicText
              type="labelMedium"
              color={isActive ? "textInverse" : "textSecondary"}
              style={styles.text}
            >
              {getLabel(tab.labelKey)}
            </AtomicText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 4,
    borderRadius: 8,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
  text: {
    fontWeight: "600",
  },
});
