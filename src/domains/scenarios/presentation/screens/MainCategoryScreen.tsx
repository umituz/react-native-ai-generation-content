/**
 * MainCategoryScreen
 * Displays main categories for hierarchical scenario selection
 */

import React, { useMemo, useCallback, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  type ListRenderItemInfo,
} from "react-native";
import {
  AtomicCard,
  useAppDesignTokens,
  ScreenLayout,
  type DesignTokens,
} from "@umituz/react-native-design-system";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AIGenScreenHeader } from "../../../../presentation/components";
import type { MainCategory } from "../../domain/category.types";

export interface MainCategoryScreenProps {
  readonly mainCategories: readonly MainCategory[];
  readonly onSelectCategory: (categoryId: string) => void;
  readonly onBack?: () => void;
  readonly t: (key: string) => string;
  readonly headerTitle?: string;
  readonly headerDescription?: string;
}

export const MainCategoryScreen: React.FC<MainCategoryScreenProps> = ({
  mainCategories,
  onSelectCategory,
  onBack,
  t,
  headerTitle,
  headerDescription,
}) => {
  const tokens = useAppDesignTokens();
  const insets = useSafeAreaInsets();

  // Debug: Monitor component state
  useEffect(() => {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[MainCategoryScreen] Component mounted/updated", {
        mainCategoriesCount: mainCategories.length,
      });
    }
  }, [mainCategories]);

  const styles = useMemo(() => createStyles(tokens), [tokens]);

  const handleCategoryPress = useCallback(
    (categoryId: string) => {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[MainCategoryScreen] Category pressed", { categoryId });
      }
      onSelectCategory(categoryId);
    },
    [onSelectCategory]
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<MainCategory>) => {
      const title = t(item.titleKey);
      const description = item.descriptionKey ? t(item.descriptionKey) : "";

      // Always use AtomicCard now as we moved to visual cards
      return (
        <AtomicCard
          image={item.image}
          leftIcon={item.icon}
          title={title}
          subtitle={description}
          imageAspectRatio={1.5}
          onPress={() => handleCategoryPress(item.id)}
          testID={`main-category-${item.id}`}
          style={{ marginBottom: tokens.spacing.md }}
        />
      );
    },
    [t, tokens, handleCategoryPress]
  );

  return (
    <ScreenLayout
      scrollable={false}
      edges={["top", "left", "right"]}
      backgroundColor={tokens.colors.backgroundPrimary}
    >
      <AIGenScreenHeader
        title={headerTitle || t("scenario.main_category.title")}
        description={headerDescription || t("scenario.main_category.subtitle")}
        onNavigationPress={onBack}
      />
      <FlatList
        data={mainCategories}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom + 100 },
        ]}
        removeClippedSubviews
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        initialNumToRender={7}
        windowSize={11}
      />
    </ScreenLayout>
  );
};
const createStyles = (tokens: DesignTokens) =>
  StyleSheet.create({
    listContent: {
      paddingHorizontal: tokens.spacing.md,
      paddingBottom: tokens.spacing.xl,
      gap: tokens.spacing.sm,
    },
  });
