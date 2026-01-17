/**
 * Category Grid Component
 */

import React from "react";
import { View, Pressable, StyleSheet, Dimensions } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
  type IconName,
} from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-localization";
import { MESSAGE_TYPES } from "../../domain/constants";

const { width } = Dimensions.get("window");

interface CategoryGridProps {
  onCategoryPress: (type: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategoryPress }) => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();

  return (
    <View>
      <View style={styles.sectionHeader}>
        <AtomicText type="headlineSmall" color="textPrimary" style={styles.sectionTitle}>
          {t("loveMessage.explore.categories")}
        </AtomicText>
      </View>

      <View style={styles.categoriesGrid}>
        {MESSAGE_TYPES.map((cat) => (
          <Pressable
            key={cat.type}
            onPress={() => onCategoryPress(cat.type)}
            style={[styles.categoryCard, { 
              backgroundColor: tokens.colors.surface,
              borderColor: tokens.colors.borderLight 
            }]}
          >
            <View style={[styles.categoryIconContainer, { backgroundColor: `${tokens.colors.primary}15` }]}>
              <AtomicIcon name={cat.icon as IconName} color="primary" size="md" />
            </View>
            <AtomicText type="labelLarge" color="textPrimary">
              {t(cat.labelKey)}
            </AtomicText>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 32,
  },
  categoryCard: {
    width: (width - 32 - 12) / 2,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  categoryIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
