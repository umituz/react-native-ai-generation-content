/**
 * Explore Header Component
 */

import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
  useSafeAreaInsets,
} from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-localization";

interface ExploreHeaderProps {
  onMagicPress: () => void;
}

export const ExploreHeader: React.FC<ExploreHeaderProps> = ({ onMagicPress }) => {
  const tokens = useAppDesignTokens();
  const { top } = useSafeAreaInsets();
  const { t } = useLocalization();

  return (
    <View style={[styles.header, { paddingTop: top + tokens.spacing.md }]}>
      <View>
        <AtomicText type="labelSmall" color="textTertiary" style={styles.welcomeText}>
          {t("loveMessage.explore.welcomeBack")}
        </AtomicText>
        <AtomicText type="headlineSmall" color="textPrimary" style={styles.brandTitle}>
          {t("loveMessage.explore.title")}
        </AtomicText>
      </View>
      <Pressable 
        onPress={onMagicPress}
        style={[styles.magicBtn, { backgroundColor: `${tokens.colors.primary}20` }]}
      >
        <AtomicIcon name="sparkles" color="primary" size="sm" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  welcomeText: {
    letterSpacing: 1,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  brandTitle: {
    fontWeight: '900',
  },
  magicBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
