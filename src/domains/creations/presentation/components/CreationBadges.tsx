/**
 * CreationBadges Component
 * Displays status and type badges overlay
 */

import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { AtomicIcon, AtomicText } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import type { CreationStatus, CreationTypeId } from "../../domain/types";
import { getStatusColorKey, getStatusText, getTypeIcon, getTypeText } from "../../domain/utils";

interface CreationBadgesProps {
  /** Creation status */
  readonly status: CreationStatus;
  /** Creation type */
  readonly type?: CreationTypeId;
  /** Show status badge */
  readonly showStatus?: boolean;
  /** Show type badge */
  readonly showType?: boolean;
  /** Custom status text (for i18n) */
  readonly statusText?: string;
  /** Custom type text (for i18n) */
  readonly typeText?: string;
}

export function CreationBadges({
  status,
  type,
  showStatus = true,
  showType = true,
  statusText,
  typeText,
}: CreationBadgesProps) {
  const tokens = useAppDesignTokens();
  const colorKey = getStatusColorKey(status);
  const statusColor = (tokens.colors as unknown as Record<string, string>)[colorKey] || tokens.colors.textSecondary;
  const displayStatusText = statusText || getStatusText(status);
  const displayTypeText = typeText || (type ? getTypeText(type) : "");
  const typeIcon = type ? getTypeIcon(type) : "image";

  const styles = useMemo(
    () =>
      StyleSheet.create({
        statusBadge: {
          position: "absolute",
          top: 8,
          right: 8,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 12,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        },
        statusDot: {
          width: 6,
          height: 6,
          borderRadius: 3,
          marginRight: 5,
          backgroundColor: statusColor,
        },
        statusText: {
          fontSize: 11,
          fontWeight: "700",
          textTransform: "capitalize",
          color: statusColor,
        },
        typeBadge: {
          position: "absolute",
          top: 8,
          left: 8,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 12,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          gap: 4,
          maxWidth: "70%",
        },
        typeText: {
          fontSize: 11,
          fontWeight: "700",
          color: "#FFFFFF",
        },
      }),
    [statusColor, tokens]
  );

  return (
    <>
      {showStatus && (
        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />
          <AtomicText style={styles.statusText}>{displayStatusText}</AtomicText>
        </View>
      )}

      {showType && type && (
        <View style={styles.typeBadge}>
          <AtomicIcon name={typeIcon} color="textInverse" size="xs" />
          <AtomicText style={styles.typeText} numberOfLines={1}>{displayTypeText}</AtomicText>
        </View>
      )}
    </>
  );
}
