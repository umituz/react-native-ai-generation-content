/**
 * Message List Item Component
 */

import React from "react";
import { View, Pressable, ImageBackground, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicButton,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-localization";
import type { TemplateMessage } from "../../domain/constants";

interface MessageListItemProps {
  item: TemplateMessage;
  onShare: (text: string) => void;
}

export const MessageListItem: React.FC<MessageListItemProps> = ({ item, onShare }) => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();

  return (
    <View style={[styles.card, { backgroundColor: tokens.colors.surface, borderColor: tokens.colors.borderLight }]}>
      {item.imageUrl && (
        <ImageBackground 
          source={{ uri: item.imageUrl }} 
          style={styles.cardImage}
          imageStyle={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
        />
      )}
      <View style={styles.cardContent}>
        <AtomicText type="bodyLarge" color="textPrimary" style={styles.messageText}>
          {`"${item.text}"`}
        </AtomicText>
        
        <View style={[styles.cardFooter, { borderTopColor: tokens.colors.borderLight }]}>
          <View style={styles.actionRow}>
            <Pressable style={[styles.iconBtn, { backgroundColor: tokens.colors.surfaceSecondary }]}>
              <AtomicIcon name="copy-outline" color="textSecondary" size="xs" />
            </Pressable>
            <Pressable 
              onPress={() => onShare(item.text)}
              style={[styles.iconBtn, { backgroundColor: tokens.colors.surfaceSecondary }]}
            >
              <AtomicIcon name="share-social-outline" color="textSecondary" size="xs" />
            </Pressable>
            <Pressable style={[styles.iconBtn, { backgroundColor: tokens.colors.surfaceSecondary }]}>
              <AtomicIcon name="heart-outline" color="textSecondary" size="xs" />
            </Pressable>
          </View>
          
          <AtomicButton
            title={t("loveMessage.generator.sendNow")}
            onPress={() => {}}
            variant="primary"
            size="sm"
            style={styles.sendBtn}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { borderRadius: 16, borderWidth: 1, marginBottom: 20, overflow: 'hidden' },
  cardImage: { width: '100%', height: 180 },
  cardContent: { padding: 20 },
  messageText: { fontStyle: 'italic', lineHeight: 24, marginBottom: 20 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTopWidth: 1 },
  actionRow: { flexDirection: 'row', gap: 8 },
  iconBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  sendBtn: { minWidth: 100, height: 36, borderRadius: 18 },
});
