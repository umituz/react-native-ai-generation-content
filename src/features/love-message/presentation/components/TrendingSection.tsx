/**
 * Trending Section Component
 */

import React from "react";
import { View, Pressable, ImageBackground, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-localization";

interface TrendingSectionProps {
  onViewAll: () => void;
}

export const TrendingSection: React.FC<TrendingSectionProps> = ({ onViewAll }) => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();

  return (
    <View>
      <View style={styles.sectionHeader}>
        <AtomicText type="headlineSmall" color="textPrimary" style={styles.sectionTitle}>
          {t("loveMessage.explore.trending")}
        </AtomicText>
        <Pressable onPress={onViewAll}>
          <AtomicText type="labelMedium" color="primary">{t("loveMessage.explore.viewAll")}</AtomicText>
        </Pressable>
      </View>

      <View style={styles.trendingContainer}>
        <Pressable 
          onPress={onViewAll}
          style={[styles.trendingCard, { backgroundColor: tokens.colors.surface, borderColor: tokens.colors.borderLight }]}
        >
          <ImageBackground 
            source={{ uri: 'https://images.unsplash.com/photo-1516589174184-c68526614488?q=80&w=200&auto=format&fit=crop' }} 
            style={styles.trendingThumb}
            imageStyle={{ borderRadius: 12 }}
          />
          <View style={styles.trendingContent}>
            <AtomicText type="labelLarge" color="textPrimary">Deep Connection</AtomicText>
            <AtomicText type="bodySmall" color="textTertiary" numberOfLines={1}>
              Thoughtful AI generated notes for partners.
            </AtomicText>
            <View style={styles.trendingTagRow}>
              <View style={[styles.trendingTag, { backgroundColor: `${tokens.colors.primary}20` }]}>
                <AtomicText type="bodySmall" color="primary" style={styles.tagText}>5K SENT</AtomicText>
              </View>
            </View>
          </View>
          <AtomicIcon name="chevron-forward" color="textTertiary" size="sm" />
        </Pressable>

        <Pressable 
          onPress={onViewAll}
          style={[styles.trendingCard, { backgroundColor: tokens.colors.surface, borderColor: tokens.colors.borderLight }]}
        >
          <ImageBackground 
            source={{ uri: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=200&auto=format&fit=crop' }} 
            style={styles.trendingThumb}
            imageStyle={{ borderRadius: 12 }}
          />
          <View style={styles.trendingContent}>
            <AtomicText type="labelLarge" color="textPrimary">Short & Sweet</AtomicText>
            <AtomicText type="bodySmall" color="textTertiary" numberOfLines={1}>
              Quick texts to make their heart skip a beat.
            </AtomicText>
            <View style={styles.trendingTagRow}>
              <View style={[styles.trendingTag, { backgroundColor: `${tokens.colors.primary}20` }]}>
                <AtomicText type="bodySmall" color="primary" style={styles.tagText}>12K SENT</AtomicText>
              </View>
            </View>
          </View>
          <AtomicIcon name="chevron-forward" color="textTertiary" size="sm" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
  },
  trendingContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  trendingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
  },
  trendingThumb: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#333',
    marginRight: 12,
  },
  trendingContent: {
    flex: 1,
    justifyContent: 'center',
  },
  trendingTagRow: {
    flexDirection: 'row',
    marginTop: 6,
  },
  trendingTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 9,
    fontWeight: 'bold',
  },
});
