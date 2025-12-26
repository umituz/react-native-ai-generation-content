/**
 * ResultImageCard Component
 * Displays generated image with AI badge - fully configurable
 */

import * as React from "react";
import { useMemo } from "react";
import { View, Image, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { LinearGradient } from "expo-linear-gradient";
import type { ResultImageConfig } from "../../types/result-config.types";
import { DEFAULT_RESULT_CONFIG } from "../../types/result-config.types";

export interface ResultImageCardProps {
  imageUrl: string;
  badgeText: string;
  config?: ResultImageConfig;
}

export const ResultImageCard: React.FC<ResultImageCardProps> = ({
  imageUrl,
  badgeText,
  config = DEFAULT_RESULT_CONFIG.image,
}) => {
  const tokens = useAppDesignTokens();
  const cfg = { ...DEFAULT_RESULT_CONFIG.image, ...config };

  const badgePosition = useMemo(() => {
    switch (cfg.badgePosition) {
      case "top-left":
        return { top: 12, left: 12 };
      case "bottom-left":
        return { bottom: 12, left: 12 };
      case "bottom-right":
        return { bottom: 12, right: 12 };
      case "top-right":
      default:
        return { top: 12, right: 12 };
    }
  }, [cfg.badgePosition]);

  const badgeBackground = useMemo(() => {
    if (cfg.badgeStyle === "light") {
      return "rgba(255, 255, 255, 0.9)";
    } else if (cfg.badgeStyle === "dark") {
      return "rgba(0, 0, 0, 0.6)";
    }
    return null;
  }, [cfg.badgeStyle]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          paddingHorizontal: cfg.spacing?.paddingHorizontal ?? 20,
          marginBottom: cfg.spacing?.marginBottom ?? 20,
        },
        frame: {
          borderRadius: cfg.borderRadius ?? 20,
          overflow: "hidden",
          backgroundColor: tokens.colors.surface,
        },
        image: {
          width: "100%",
          aspectRatio: cfg.aspectRatio ?? 1,
        },
        badge: {
          position: "absolute",
          ...badgePosition,
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          paddingHorizontal: 10,
          paddingVertical: 5,
          backgroundColor: badgeBackground ?? undefined,
          borderRadius: 12,
          overflow: "hidden",
        },
        gradientBadge: {
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          paddingHorizontal: 10,
          paddingVertical: 5,
        },
        badgeText: {
          fontSize: 10,
          fontWeight: "700",
          color:
            cfg.badgeStyle === "light"
              ? tokens.colors.textPrimary
              : "#FFFFFF",
          letterSpacing: 0.5,
        },
      }),
    [tokens, cfg, badgePosition, badgeBackground],
  );

  const renderBadge = () => {
    if (!cfg.showBadge) return null;

    const iconColor =
      cfg.badgeStyle === "light" ? tokens.colors.primary : "#FFFFFF";

    const badgeContent = (
      <>
        <AtomicIcon
          name={cfg.badgeIcon ?? "sparkles"}
          size="xs"
          customColor={iconColor}
        />
        <AtomicText style={styles.badgeText}>{badgeText}</AtomicText>
      </>
    );

    if (cfg.badgeStyle === "gradient") {
      return (
        <View style={styles.badge}>
          <LinearGradient
            colors={[tokens.colors.primary, tokens.colors.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientBadge}
          >
            {badgeContent}
          </LinearGradient>
        </View>
      );
    }

    return <View style={styles.badge}>{badgeContent}</View>;
  };

  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        {renderBadge()}
      </View>
    </View>
  );
};
