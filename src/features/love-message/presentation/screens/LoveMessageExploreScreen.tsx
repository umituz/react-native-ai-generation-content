/**
 * Love Message Explore Screen
 * Premium entry point for Love Message domain
 */

import { FC } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import {
  useAppDesignTokens,
  useSafeAreaInsets,
  AppNavigation,
} from "@umituz/react-native-design-system";
import { ExploreHeader } from "../components/ExploreHeader";
import { LoveMessageHeroSection } from "../components/LoveMessageHeroSection";
import { CategoryGrid } from "../components/CategoryGrid";
import { TrendingSection } from "../components/TrendingSection";

export const LoveMessageExploreScreen: FC = () => {
  const tokens = useAppDesignTokens();
  const { bottom } = useSafeAreaInsets();

  const handleNavigateToGenerator = () => {
    AppNavigation.navigate("MessageGenerator", {});
  };

  const handleNavigateToCategory = (categoryId: string) => {
    AppNavigation.navigate("MessageList", { categoryId });
  };

  const handleNavigateToTrending = () => {
    AppNavigation.navigate("MessageList", { categoryId: "trending" });
  };

  return (
    <View style={[styles.container, { backgroundColor: tokens.colors.backgroundPrimary }]}>
      <ExploreHeader onMagicPress={handleNavigateToGenerator} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottom + 120 }}
      >
        <LoveMessageHeroSection />
        <CategoryGrid onCategoryPress={handleNavigateToCategory} />
        <TrendingSection onViewAll={handleNavigateToTrending} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
