/**
 * ResultActions Component
 * Action buttons for generation results - fully configurable
 */

import * as React from "react";
import { useMemo } from "react";
import { View } from "react-native";
import { useAppDesignTokens } from "@umituz/react-native-design-system";
import { RetryButton } from "./RetryButton";
import { ActionButton } from "./ActionButton";
import { createResultActionsStyles } from "./ResultActions.styles";
import type { ResultActionsProps } from "./ResultActions.types";
import { DEFAULT_RESULT_CONFIG } from "../../types/result-config.types";

export const ResultActions: React.FC<ResultActionsProps> = ({
  onShare,
  onSave,
  onRetry,
  isSharing = false,
  isSaving = false,
  translations,
  config = DEFAULT_RESULT_CONFIG.actions,
}) => {
  const tokens = useAppDesignTokens();
  const cfg = { ...DEFAULT_RESULT_CONFIG.actions, ...config };

  const styles = useMemo(
    () => createResultActionsStyles({ tokens, config: cfg }),
    [tokens, cfg]
  );

  const topActions = cfg.retry?.enabled && cfg.retry?.position === "top" && onRetry;
  const bottomActions =
    cfg.retry?.enabled && cfg.retry?.position === "bottom" && onRetry;

  return (
    <View style={styles.container}>
      {topActions && (
        <RetryButton
          styles={styles}
          onPress={onRetry}
          label={cfg.retry?.label ?? translations.retry}
          icon={cfg.retry?.icon ?? "refresh"}
        />
      )}

      <View style={styles.buttons}>
        {cfg.share?.enabled && (
          <ActionButton
            styles={styles}
            onPress={onShare!}
            isProcessing={isSharing}
            label={cfg.share?.label ?? translations.share}
            processingLabel={translations.sharing}
            icon={cfg.share?.icon ?? "share-social"}
            variant={cfg.share?.variant}
          />
        )}

        {cfg.save?.enabled && (
          <ActionButton
            styles={styles}
            onPress={onSave!}
            isProcessing={isSaving}
            label={cfg.save?.label ?? translations.save}
            processingLabel={translations.save}
            icon={cfg.save?.icon ?? "download"}
            variant={cfg.save?.variant}
          />
        )}
      </View>

      {bottomActions && (
        <RetryButton
          styles={styles}
          onPress={onRetry}
          label={cfg.retry?.label ?? translations.retry}
          icon={cfg.retry?.icon ?? "refresh"}
        />
      )}
    </View>
  );
};

export type { ResultActionsProps } from "./ResultActions.types";
