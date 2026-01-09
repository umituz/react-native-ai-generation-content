/**
 * Hero Section Component
 */

import React from "react";
import { View, Pressable, ImageBackground, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-localization";

export const LoveMessageHeroSection: React.FC = () => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();

  return (
    <View style={styles.heroSection}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?q=80&w=600&auto=format&fit=crop' }}
        style={styles.heroImage}
        imageStyle={styles.heroImageBorder}
      >
        <View style={styles.heroOverlay}>
          <View style={[styles.glassCard, { backgroundColor: `${tokens.colors.surface}B0` }]}>
            <View style={styles.quoteHeader}>
              <AtomicText type="labelSmall" color="primary" style={styles.quoteTag}>
                {t("loveMessage.explore.heroTag")}
              </AtomicText>
              <AtomicIcon name="quote-outline" color="primary" size="xs" />
            </View>
            <AtomicText type="bodyMedium" color="textPrimary" style={styles.quoteText}>
              {`"Love is not about how many days, months, or years you have been together, but about how much you love each other every single day."`}
            </AtomicText>
            <View style={styles.heroActions}>
              <Pressable style={[styles.shareBtn, { backgroundColor: tokens.colors.primary }]}>
                <AtomicIcon name="share-social-outline" color="onPrimary" size="xs" />
                <AtomicText type="labelSmall" color="onPrimary" style={styles.shareText}>
                  {t("loveMessage.explore.shareNow")}
                </AtomicText>
              </Pressable>
              <Pressable style={[styles.favBtn, { backgroundColor: `${tokens.colors.textPrimary}15` }]}>
                <AtomicIcon name="heart-outline" color="textPrimary" size="xs" />
              </Pressable>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  heroSection: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  heroImage: {
    width: '100%',
    height: 300,
    justifyContent: 'flex-end',
  },
  heroImageBorder: {
    borderRadius: 24,
  },
  heroOverlay: {
    padding: 12,
  },
  glassCard: {
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  quoteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  quoteTag: {
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  quoteText: {
    fontStyle: 'italic',
    lineHeight: 22,
    marginBottom: 16,
  },
  heroActions: {
    flexDirection: 'row',
    gap: 8,
  },
  shareBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 20,
    gap: 8,
  },
  shareText: {
    fontWeight: 'bold',
  },
  favBtn: {
    width: 44,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
