/**
 * MainCategoryScreen
 * Displays main categories for hierarchical scenario selection
 */

import React, { useMemo, useCallback, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  type ListRenderItemInfo,
} from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
  ScreenLayout,
  type DesignTokens,
} from "@umituz/react-native-design-system";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AIGenScreenHeader } from "../../../../presentation/components";
import type { ScenarioMainCategory } from "../../domain/scenario.types";

export interface MainCategoryScreenProps {
  readonly mainCategories: readonly ScenarioMainCategory[];
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
    ({ item }: ListRenderItemInfo<ScenarioMainCategory>) => {
      const title = t(item.titleKey);
      const description = item.descriptionKey ? t(item.descriptionKey) : "";

      return (
        <TouchableOpacity
          style={[
            styles.card,
            {
              backgroundColor: tokens.colors.surface,
              borderColor: tokens.colors.border,
            },
          ]}
          onPress={() => handleCategoryPress(item.id)}
          activeOpacity={0.7}
          testID={`main-category-${item.id}`}
        >
          <View style={styles.cardContent}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: tokens.colors.surfaceVariant },
              ]}
            >
              {item.emoji ? (
                <AtomicText style={styles.emoji}>{item.emoji}</AtomicText>
              ) : (
                <AtomicIcon name={item.icon as never} size="lg" color="primary" />
              )}
            </View>
            <View style={styles.textContent}>
              <AtomicText
                style={[styles.title, { color: tokens.colors.textPrimary }]}
              >
                {title}
              </AtomicText>
              {description ? (
                <AtomicText
                  style={[
                    styles.description,
                    { color: tokens.colors.textSecondary },
                  ]}
                  numberOfLines={2}
                >
                  {description}
                </AtomicText>
              ) : null}
            </View>
            <AtomicIcon
              name="chevron-forward"
              size="md"
              color="textSecondary"
            />
          </View>
        </TouchableOpacity>
      );
    },
    [t, tokens, styles, handleCategoryPress]
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
    card: {
      borderRadius: tokens.borders.radius.lg,
      borderWidth: 1,
      overflow: "hidden",
    },
    cardContent: {
      flexDirection: "row",
      alignItems: "center",
      padding: tokens.spacing.md,
    },
    iconContainer: {
      width: 56,
      height: 56,
      borderRadius: 28,
      justifyContent: "center",
      alignItems: "center",
      marginRight: tokens.spacing.md,
    },
    emoji: {
      fontSize: 28,
    },
    textContent: {
      flex: 1,
      marginRight: tokens.spacing.sm,
    },
    title: {
      fontSize: 17,
      fontWeight: "700",
      marginBottom: 2,
    },
    description: {
      fontSize: 14,
      lineHeight: 18,
    },
  });
