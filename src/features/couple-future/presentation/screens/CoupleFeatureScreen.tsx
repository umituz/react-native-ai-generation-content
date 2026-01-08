/**
 * Couple Feature Screen
 * Generic screen for couple feature selection
 */

import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  AtomicButton,
  AtomicText,
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
    <View
      style={[
        styles.container,
        { backgroundColor: tokens.colors.backgroundPrimary },
      ]}
    >
      <View style={styles.header}>
        <AtomicText
          type="headlineMedium"
          style={{ color: tokens.colors.textPrimary }}
        >
          {t(`${config.translationPrefix}.title`)}
        </AtomicText>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <FeatureComponent {...selectorProps} />
      </ScrollView>

      <View
        style={[
          styles.footer,
          { borderTopColor: tokens.colors.borderLight },
        ]}
      >
        <AtomicButton
          title={t("common.back")}
          onPress={onBack}
          variant="secondary"
          style={styles.backButton}
        />
        <AtomicButton
          title={t("common.continue")}
          onPress={onContinue}
          variant="primary"
          style={styles.continueButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingTop: 20,
  },
  content: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    gap: 12,
  },
  backButton: {
    flex: 1,
  },
  continueButton: {
    flex: 2,
  },
});
