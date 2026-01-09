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
import { LoveMessageHeroSection } from "../components/LoveMessageHeroSection";
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
        contentContainerStyle={{ paddingBottom: bottom + 120 }}
      >
        <LoveMessageHeroSection />
        
        <CategoryGrid 
          onCategoryPress={onNavigateToCategory} 
        />

        <TrendingSection 
          onViewAll={onNavigateToTrending} 
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  fabContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
});
