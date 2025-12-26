/**
 * ResultActions Component
 * Action buttons for generation results - fully configurable
 */

import * as React from "react";
import { useMemo } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import type { ResultActionsConfig } from "../../types/result-config.types";
import { DEFAULT_RESULT_CONFIG } from "../../types/result-config.types";

export interface ResultActionsProps {
  onShare?: () => void;
  onSave?: () => void;
  onRetry?: () => void;
  isSharing?: boolean;
  isSaving?: boolean;
  translations: {
    share: string;
    sharing: string;
    save: string;
    retry: string;
  };
  config?: ResultActionsConfig;
}

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
    () =>
      StyleSheet.create({
        container: {
          paddingHorizontal: cfg.spacing?.paddingHorizontal ?? 20,
          paddingBottom: cfg.spacing?.paddingBottom ?? 20,
        },
        retryButton: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          paddingVertical: 12,
          marginBottom: cfg.retry?.position === "top" ? 16 : 0,
          marginTop: cfg.retry?.position === "bottom" ? 16 : 0,
        },
        retryText: {
          fontSize: 14,
          fontWeight: "600",
          color: tokens.colors.primary,
        },
        buttons: {
          flexDirection:
            cfg.layout === "vertical" ? "column" : "row",
          gap: cfg.buttonSpacing ?? 10,
        },
        button: {
          flex: cfg.layout === "horizontal" ? 1 : undefined,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          paddingVertical: 14,
          borderRadius: 14,
        },
      }),
    [tokens, cfg],
  );

  const getButtonStyle = (variant?: string) => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: tokens.colors.primary,
          color: tokens.colors.onPrimary,
          textColor: tokens.colors.onPrimary,
        };
      case "secondary":
        return {
          backgroundColor: tokens.colors.surface,
          borderWidth: 2,
          borderColor: tokens.colors.primary,
          color: tokens.colors.primary,
          textColor: tokens.colors.primary,
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: tokens.colors.borderLight,
          color: tokens.colors.textPrimary,
          textColor: tokens.colors.textPrimary,
        };
      case "text":
        return {
          backgroundColor: "transparent",
          color: tokens.colors.primary,
          textColor: tokens.colors.primary,
        };
      default:
        return {
          backgroundColor: tokens.colors.primary,
          color: tokens.colors.onPrimary,
          textColor: tokens.colors.onPrimary,
        };
    }
  };

  const renderButton = (
    key: string,
    onPress?: () => void,
    isProcessing?: boolean,
    label?: string,
    processingLabel?: string,
    icon?: string,
    variant?: string,
  ) => {
    if (!onPress) return null;

    const buttonStyle = getButtonStyle(variant);
    const displayLabel = isProcessing ? processingLabel : label;
    const displayIcon = isProcessing ? "hourglass" : icon;

    return (
      <TouchableOpacity
        key={key}
        style={[styles.button, buttonStyle]}
        onPress={onPress}
        disabled={isProcessing}
      >
        {displayIcon && (
          <AtomicIcon
            name={displayIcon}
            size="md"
            customColor={buttonStyle.textColor}
          />
        )}
        <AtomicText
          style={{
            fontSize: 15,
            fontWeight: "700",
            color: buttonStyle.textColor,
          }}
        >
          {displayLabel}
        </AtomicText>
      </TouchableOpacity>
    );
  };

  const topActions = cfg.retry?.enabled && cfg.retry?.position === "top" && onRetry;
  const bottomActions =
    cfg.retry?.enabled && cfg.retry?.position === "bottom" && onRetry;

  return (
    <View style={styles.container}>
      {topActions && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <AtomicIcon
            name={cfg.retry?.icon ?? "refresh"}
            size="sm"
            color="primary"
          />
          <AtomicText style={styles.retryText}>
            {cfg.retry?.label ?? translations.retry}
          </AtomicText>
        </TouchableOpacity>
      )}

      <View style={styles.buttons}>
        {cfg.share?.enabled &&
          renderButton(
            "share",
            onShare,
            isSharing,
            cfg.share?.label ?? translations.share,
            translations.sharing,
            cfg.share?.icon ?? "share-social",
            cfg.share?.variant,
          )}

        {cfg.save?.enabled &&
          renderButton(
            "save",
            onSave,
            isSaving,
            cfg.save?.label ?? translations.save,
            translations.save,
            cfg.save?.icon ?? "download",
            cfg.save?.variant,
          )}
      </View>

      {bottomActions && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <AtomicIcon
            name={cfg.retry?.icon ?? "refresh"}
            size="sm"
            color="primary"
          />
          <AtomicText style={styles.retryText}>
            {cfg.retry?.label ?? translations.retry}
          </AtomicText>
        </TouchableOpacity>
      )}
    </View>
  );
};
