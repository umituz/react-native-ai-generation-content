/**
 * CreationCardCompact Component
 * Compact 2-column grid card — image fills the card, badge overlay only
 */

import React, { useMemo, useCallback } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { CreationPreview } from "./CreationPreview";
import { CreationBadges } from "./CreationBadges";
import { getPreviewUrl } from "../../domain/utils";
import type { CreationCardData, CreationCardCallbacks } from "./CreationCard.types";
import type { CreationTypeId } from "../../domain/types";

interface CreationCardCompactProps {
  readonly creation: CreationCardData;
  readonly callbacks?: CreationCardCallbacks;
}

export function CreationCardCompact({ creation, callbacks }: CreationCardCompactProps) {
  const tokens = useAppDesignTokens();
  const previewUrl = getPreviewUrl(creation.output) || creation.uri;

  const handlePress = useCallback(() => {
    callbacks?.onPress?.(creation);
  }, [callbacks, creation]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        card: {
          flex: 1,
          borderRadius: 12,
          overflow: "hidden",
          aspectRatio: 3 / 4,
          backgroundColor: tokens.colors.surface,
        },
        previewWrapper: {
          width: "100%",
          height: "100%",
        },
      }),
    [tokens],
  );

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}
      activeOpacity={callbacks?.onPress ? 0.85 : 1}
      disabled={!callbacks?.onPress}
    >
      <View style={styles.previewWrapper}>
        <CreationPreview
          uri={previewUrl}
          thumbnailUrl={creation.output?.thumbnailUrl}
          status={creation.status}
          type={creation.type as CreationTypeId}
          aspectRatio={3 / 4}
          showLoadingIndicator
        />
      </View>
      {creation.status && (
        <CreationBadges
          status={creation.status}
          type={creation.type as CreationTypeId}
          showType={false}
        />
      )}
    </TouchableOpacity>
  );
}
