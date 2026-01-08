/**
 * Wardrobe Selector Component
 * Simplified placeholder for Phase 1
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import type { CoupleFeatureSelection } from "../../domain/types";

export interface WardrobeSelectorProps {
  selection: CoupleFeatureSelection;
  onSelectionChange: (selection: CoupleFeatureSelection) => void;
  translationPrefix: string;
  t: (key: string) => string;
}

export const WardrobeSelector: React.FC<WardrobeSelectorProps> = ({
  translationPrefix,
  t,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={s.container}>
      <View
        style={[
          s.card,
          {
            backgroundColor: tokens.colors.surface,
            borderColor: tokens.colors.borderLight,
          },
        ]}
      >
        <View
          style={[
            s.iconContainer,
            { backgroundColor: tokens.colors.surfaceVariant },
          ]}
        >
          <AtomicIcon name="checkroom" size="xl" color="textSecondary" />
        </View>

        <AtomicText
          type="headlineSmall"
          style={[s.title, { color: tokens.colors.textPrimary }]}
        >
          {t(`${translationPrefix}.title`)}
        </AtomicText>

        <AtomicText
          type="bodyMedium"
          style={[s.subtitle, { color: tokens.colors.textSecondary }]}
        >
          {t(`${translationPrefix}.comingSoon`)}
        </AtomicText>

        <View
          style={[
            s.badge,
            { backgroundColor: `${tokens.colors.primary}15` },
          ]}
        >
          <AtomicText
            type="labelSmall"
            style={{ color: tokens.colors.primary, fontWeight: "600" }}
          >
            {t("common.comingSoon")}
          </AtomicText>
        </View>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center" },
  card: { padding: 24, borderRadius: 16, borderWidth: 2, alignItems: "center" },
  iconContainer: { width: 80, height: 80, borderRadius: 40, alignItems: "center", justifyContent: "center", marginBottom: 16 },
  title: { fontWeight: "600", marginBottom: 8, textAlign: "center" },
  subtitle: { marginBottom: 16, textAlign: "center" },
  badge: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
});
