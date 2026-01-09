/**
 * Message List Screen
 */

import { FC, useCallback, useMemo } from "react";
import { View, ScrollView, StyleSheet, Pressable, Share } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
  useSafeAreaInsets,
  AppNavigation,
  useAppRoute,
} from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-localization";
import { CATEGORY_TEMPLATES, MESSAGE_TYPES } from "../../domain/constants";
import { MessageListItem } from "../components/MessageListItem";
import type { MessageType } from "../../domain/types";

type RouteParams = { categoryId?: string };

export const MessageListScreen: FC = () => {
  const tokens = useAppDesignTokens();
  const { top, bottom } = useSafeAreaInsets();
  const { t } = useLocalization();
  const route = useAppRoute<{ params: RouteParams }, "params">();

  const categoryId = route.params?.categoryId ?? "romantic";
  const messages = useMemo(() => CATEGORY_TEMPLATES[categoryId] || [], [categoryId]);

  const categoryTitle = useMemo(() => {
    if (categoryId === "trending") return t("loveMessage.explore.trending");
    const config = MESSAGE_TYPES.find((c) => c.type === categoryId);
    return config ? t(config.labelKey) : categoryId;
  }, [categoryId, t]);

  const handleBack = () => AppNavigation.goBack();

  const handleNavigateToGenerator = (type?: string) => {
    AppNavigation.navigate("MessageGenerator", { initialType: type as MessageType });
  };

  const handleShare = useCallback(async (text: string) => {
    try {
      await Share.share({ message: text });
    } catch {
      /* Ignore */
    }
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: tokens.colors.backgroundPrimary }]}>
      <View style={[styles.header, { paddingTop: top + tokens.spacing.md }]}>
        <Pressable onPress={handleBack} style={styles.backBtn}>
          <AtomicIcon name="arrow-back" color="textPrimary" size="sm" />
        </Pressable>
        <AtomicText type="headlineSmall" color="textPrimary" style={styles.headerTitle}>
          {categoryTitle}
        </AtomicText>
        <View style={styles.spacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottom + 100, paddingHorizontal: 16 }}
      >
        <View style={styles.headlineContainer}>
          <AtomicText type="headlineMedium" color="textPrimary" style={styles.headline}>
            {`${messages.length} ${t("loveMessage.messages")}`}
          </AtomicText>
          <AtomicText type="bodySmall" color="textTertiary">
            {t("loveMessage.aiCrafted")}
          </AtomicText>
        </View>

        {messages.map((item) => (
          <MessageListItem key={item.id} item={item} onShare={handleShare} />
        ))}
      </ScrollView>

      <View style={[styles.fabContainer, { bottom: bottom + tokens.spacing.lg }]}>
        <Pressable
          onPress={() => handleNavigateToGenerator(categoryId !== "trending" ? categoryId : undefined)}
          style={[styles.fab, { backgroundColor: tokens.colors.primary }]}
        >
          <AtomicIcon name="sparkles" color="onPrimary" size="sm" />
          <AtomicText type="labelLarge" color="onPrimary" style={styles.fabText}>
            {t("loveMessage.generateMore")}
          </AtomicText>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  backBtn: { padding: 12 },
  headerTitle: { fontWeight: "bold" },
  spacer: { width: 44 },
  headlineContainer: { paddingVertical: 24 },
  headline: { fontWeight: "bold", marginBottom: 4 },
  fabContainer: {
    position: "absolute",
    left: 20,
    right: 20,
    alignItems: "center",
  },
  fab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 32,
    gap: 12,
  },
  fabText: { fontWeight: "bold", letterSpacing: 1 },
});
