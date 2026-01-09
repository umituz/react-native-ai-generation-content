/**
 * CreationCardMeta Component
 * Displays metadata (date, provider) for CreationCard
 */

import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { useAppDesignTokens, AtomicText } from "@umituz/react-native-design-system";

interface CreationCardMetaProps {
  readonly formattedDate: string;
  readonly provider?: string;
}

export function CreationCardMeta({
  formattedDate,
  provider,
}: CreationCardMetaProps) {
  const tokens = useAppDesignTokens();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        meta: {
          flexDirection: "row",
          alignItems: "center",
        },
        metaText: {
          fontSize: 12,
          color: tokens.colors.textSecondary,
        },
        metaDot: {
          marginHorizontal: 4,
        },
      }),
    [tokens]
  );

  return (
    <View style={styles.meta}>
      <AtomicText style={styles.metaText}>{formattedDate}</AtomicText>
      {provider && (
        <>
          <AtomicText style={[styles.metaText, styles.metaDot]}>•</AtomicText>
          <AtomicText style={styles.metaText}>{provider}</AtomicText>
        </>
      )}
    </View>
  );
}
