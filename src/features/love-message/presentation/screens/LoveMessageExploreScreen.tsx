/**
 * Love Message Explore Screen
 * Premium entry point for Love Message domain
 */

import { FC, useCallback } from "react";
import { View, ScrollView, StyleSheet, Pressable } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
  useSafeAreaInsets,
} from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-localization";
import { useNavigation } from "@react-navigation/native";
import { ExploreHeader } from "../components/ExploreHeader";
import { HeroSection } from "../components/HeroSection";
import { CategoryGrid } from "../components/CategoryGrid";
import { TrendingSection } from "../components/TrendingSection";

interface LoveMessageExploreScreenProps {
  onNavigateToGenerator: () => void;
  onNavigateToCategory: (categoryId: string) => void;
  onNavigateToTrending: () => void;
}

export const LoveMessageExploreScreen: FC<LoveMessageExploreScreenProps> = ({
  onNavigateToGenerator,
  onNavigateToCategory,
  onNavigateToTrending,
}) => {
  const tokens = useAppDesignTokens();
  const { bottom } = useSafeAreaInsets();
  const { t } = useLocalization();

  return (
    <View style={[styles.container, { backgroundColor: tokens.colors.backgroundPrimary }]}>
      <ExploreHeader onMagicPress={onNavigateToGenerator} />

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottom + 100 }}
      >
        <HeroSection />
        
        <CategoryGrid 
          onCategoryPress={onNavigateToCategory} 
        />

        <TrendingSection 
          onViewAll={onNavigateToTrending} 
        />
      </ScrollView>

      {/* Floating Action Button */}
      <View style={[styles.fabContainer, { bottom: bottom + tokens.spacing.lg }]}>
        <Pressable 
          onPress={onNavigateToGenerator}
          style={[styles.fab, { backgroundColor: tokens.colors.primary }]}
        >
          <AtomicIcon name="sparkles" color="onPrimary" size="sm" />
          <AtomicText type="labelLarge" color="onPrimary" style={styles.fabText}>
            {t("loveMessage.explore.generateMagic")}
          </AtomicText>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  fabContainer: {
    position: 'absolute',
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  fab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 32,
    gap: 12,
  },
  fabText: { fontWeight: 'bold', letterSpacing: 1 },
});
