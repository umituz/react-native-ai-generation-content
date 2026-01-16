/**
 * SubCategoryScreen
 * Displays sub-categories for a selected main category
 */

import React, { useMemo, useCallback } from "react";
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
import type { ScenarioSubCategory } from "../../domain/types";

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

  const filteredSubCategories = useMemo(
    () => subCategories.filter((sub) => sub.mainCategoryId === mainCategoryId),
    [subCategories, mainCategoryId]
  );

  const styles = useMemo(() => createStyles(tokens), [tokens]);

  const handleSubCategoryPress = useCallback(
    (subCategoryId: string) => {
      onSelectSubCategory(subCategoryId);
    },
    [onSelectSubCategory]
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<ScenarioSubCategory>) => {
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
          onPress={() => handleSubCategoryPress(item.id)}
          activeOpacity={0.7}
          testID={`sub-category-${item.id}`}
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
    [t, tokens, styles, handleSubCategoryPress]
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
        onBack={onBack}
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
