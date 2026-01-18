/**
 * SubCategoryScreen
 * Displays sub-categories for a selected main category
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
import type { ScenarioSubCategory } from "../../domain/scenario.types";

export interface SubCategoryScreenProps {
  readonly mainCategoryId: string;
  readonly subCategories: readonly ScenarioSubCategory[];
  readonly onSelectSubCategory: (subCategoryId: string) => void;
  readonly onBack: () => void;
  readonly t: (key: string) => string;
  readonly headerTitleKey?: string;
  readonly headerDescriptionKey?: string;
}

export const SubCategoryScreen: React.FC<SubCategoryScreenProps> = ({
  mainCategoryId,
  subCategories,
  onSelectSubCategory,
  onBack,
  t,
  headerTitleKey,
  headerDescriptionKey,
}) => {
  const tokens = useAppDesignTokens();
  const insets = useSafeAreaInsets();

  const filteredSubCategories = useMemo(() => {
    const filtered = subCategories.filter((sub) => sub.mainCategoryId === mainCategoryId);

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[SubCategoryScreen] Filtered sub-categories", {
        mainCategoryId,
        totalSubCategories: subCategories.length,
        filteredCount: filtered.length,
        sampleMainCategoryIds: subCategories.slice(0, 5).map(s => s.mainCategoryId),
      });
    }

    return filtered;
  }, [subCategories, mainCategoryId]);

  // Debug: Monitor component state
  useEffect(() => {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[SubCategoryScreen] Component mounted/updated", {
        mainCategoryId,
        filteredSubCategoriesCount: filteredSubCategories.length,
      });
    }
  }, [mainCategoryId, filteredSubCategories]);

  const styles = useMemo(() => createStyles(tokens), [tokens]);

  const handleSubCategoryPress = useCallback(
    (subCategoryId: string) => {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[SubCategoryScreen] Sub-category pressed", { subCategoryId });
      }
      onSelectSubCategory(subCategoryId);
    },
    [onSelectSubCategory]
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<ScenarioSubCategory>) => {
      const title = t(item.titleKey);
      const description = item.descriptionKey ? t(item.descriptionKey) : "";

      return (
        <AtomicCard
          image={item.image}
          leftIcon={item.icon}
          badge={item.emoji}
          title={title}
          subtitle={description}
          imageAspectRatio={item.image ? 1.5 : undefined}
          onPress={() => handleSubCategoryPress(item.id)}
          testID={`sub-category-${item.id}`}
          style={{ marginBottom: tokens.spacing.md }}
        />
      );
    },
    [t, tokens, handleSubCategoryPress]
  );

  return (
    <ScreenLayout
      scrollable={false}
      edges={["left", "right"]}
      backgroundColor={tokens.colors.backgroundPrimary}
    >
      <AIGenScreenHeader
        title={headerTitleKey ? t(headerTitleKey) : t("scenario.sub_category.title")}
        description={headerDescriptionKey ? t(headerDescriptionKey) : t("scenario.sub_category.subtitle")}
        onNavigationPress={onBack}
      />
      <FlatList
        data={filteredSubCategories}
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
        initialNumToRender={10}
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
