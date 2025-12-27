/**
 * CreationBadges Component
 * Displays status and type badges overlay
 */

import React, { useMemo } from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  useAppDesignTokens,
  AtomicIcon,
} from "@umituz/react-native-design-system";
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
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 12,
          backgroundColor: statusColor + "20",
        },
        statusDot: {
          width: 6,
          height: 6,
          borderRadius: 3,
          marginRight: 4,
          backgroundColor: statusColor,
        },
        statusText: {
          fontSize: 10,
          fontWeight: "600",
          textTransform: "capitalize",
          color: statusColor,
        },
        typeBadge: {
          position: "absolute",
          top: 8,
          left: 8,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 12,
          backgroundColor: "rgba(0,0,0,0.6)",
          gap: 4,
        },
        typeText: {
          fontSize: 10,
          fontWeight: "600",
          color: "white",
          textTransform: "capitalize",
        },
      }),
    [statusColor]
  );

  return (
    <>
      {showStatus && (
        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>{displayStatusText}</Text>
        </View>
      )}

      {showType && type && (
        <View style={styles.typeBadge}>
          <AtomicIcon name={typeIcon} color="textInverse" size="xs" />
          <Text style={styles.typeText}>{displayTypeText}</Text>
        </View>
      )}
    </>
  );
}
