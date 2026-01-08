/**
 * Couple Feature Screen
 * Generic screen for couple feature selection with NavigationHeader pattern
 */

import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  NavigationHeader,
  ScreenLayout,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import type { CoupleFeatureId, CoupleFeatureSelection } from "../../domain/types";
import { COUPLE_FEATURE_CONFIGS } from "../../infrastructure/coupleFeatureRegistry";
import { RomanticMoodSelector } from "../components/RomanticMoodSelector";
import { ArtStyleSelector } from "../components/ArtStyleSelector";
import { ArtistStyleSelector } from "../components/ArtistStyleSelector";
import { WardrobeSelector } from "../components/WardrobeSelector";

export interface CoupleFeatureScreenProps {
  featureId: CoupleFeatureId;
  selection: CoupleFeatureSelection;
  onSelectionChange: (selection: CoupleFeatureSelection) => void;
  onContinue: () => void;
  onBack: () => void;
  t: (key: string) => string;
}

const FeatureComponentMap = {
  "romantic-mood": RomanticMoodSelector,
  "art-style": ArtStyleSelector,
  "artist-style": ArtistStyleSelector,
  "wardrobe": WardrobeSelector,
};

export const CoupleFeatureScreen: React.FC<CoupleFeatureScreenProps> = ({
  featureId,
  selection,
  onSelectionChange,
  onContinue,
  onBack,
  t,
}) => {
  const tokens = useAppDesignTokens();
  const config = COUPLE_FEATURE_CONFIGS[featureId];

  if (__DEV__) {
    console.log("[CoupleFeatureScreen] Render:", {
      featureId,
      hasConfig: !!config,
      hasComponent: !!FeatureComponentMap[featureId],
    });
  }

  if (!config) return null;

  const FeatureComponent = FeatureComponentMap[featureId];
  if (!FeatureComponent) return null;

  const selectorProps = {
    selection,
    onSelectionChange,
    translationPrefix: config.translationPrefix,
    t,
  };

  return (
    <View style={[styles.container, { backgroundColor: tokens.colors.backgroundPrimary }]}>
      <NavigationHeader
        title={t(`${config.translationPrefix}.title`)}
        onBackPress={onBack}
        rightElement={
          <TouchableOpacity
            onPress={onContinue}
            activeOpacity={0.7}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: tokens.colors.primary,
              paddingHorizontal: tokens.spacing.md,
              paddingVertical: tokens.spacing.xs,
              borderRadius: tokens.borders.radius.full,
            }}
          >
            <AtomicText
              type="bodyMedium"
              style={{ fontWeight: "800", color: tokens.colors.onPrimary, marginRight: 4 }}
            >
              {t("common.continue")}
            </AtomicText>
            <AtomicIcon name="arrow-forward" size="sm" color="onPrimary" />
          </TouchableOpacity>
        }
      />
      <ScreenLayout
        edges={["left", "right"]}
        backgroundColor="transparent"
        scrollable={true}
        contentContainerStyle={styles.scrollContent}
        hideScrollIndicator={true}
      >
        <FeatureComponent {...selectorProps} />
      </ScreenLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 24 },
});
