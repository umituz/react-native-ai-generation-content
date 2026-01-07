/**
 * CreationCardMeta Component
 * Displays metadata (date, provider) for CreationCard
 */

import React, { useMemo } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useAppDesignTokens } from "@umituz/react-native-design-system";

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
      <Text style={styles.metaText}>{formattedDate}</Text>
      {provider && (
        <>
          <Text style={[styles.metaText, styles.metaDot]}>•</Text>
          <Text style={styles.metaText}>{provider}</Text>
        </>
      )}
    </View>
  );
}
