/**
 * PhotoUploadCard Component
 * Beautiful photo upload card with validation status and responsive design
 *
 * @package @umituz/react-native-ai-generation-content
 */

import React, { useMemo } from "react";
import {
  View,
  Image,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  type ViewStyle,
  type StyleProp,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  AtomicText,
  AtomicIcon,
  AtomicSpinner,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";

export interface PhotoUploadCardConfig {
  aspectRatio?: number;
  borderRadius?: number;
  iconSize?: number;
  showValidationStatus?: boolean;
  allowChange?: boolean;
  borderStyle?: "solid" | "dashed";
}

export interface PhotoUploadCardProps {
  imageUri: string | null;
  onPress: () => void;
  isValidating?: boolean;
  isValid?: boolean | null;
  disabled?: boolean;
  config?: PhotoUploadCardConfig;
  translations?: {
    tapToUpload: string;
    selectPhoto: string;
    change: string;
    analyzing?: string;
  };
  title?: string;
  subtitle?: string;
  icon?: string;
  style?: StyleProp<ViewStyle>;
}

const DEFAULT_CONFIG: PhotoUploadCardConfig = {
  aspectRatio: 1,
  borderRadius: 28,
  iconSize: 40,
  showValidationStatus: true,
  allowChange: true,
  borderStyle: "dashed",
};

export const PhotoUploadCard: React.FC<PhotoUploadCardProps> = ({
  imageUri,
  onPress,
  isValidating = false,
  isValid = null,
  disabled = false,
  config = DEFAULT_CONFIG,
  translations = {
    tapToUpload: "Tap to Upload",
    selectPhoto: "Select a photo",
    change: "Change",
    analyzing: "Analyzing...",
  },
  title,
  subtitle,
  icon,
  style,
}) => {
  const tokens = useAppDesignTokens();
  const cfg = { ...DEFAULT_CONFIG, ...config };

  const borderColor = useMemo(() => {
    if (!cfg.showValidationStatus) {
      return `${tokens.colors.primary}40`;
    }
    if (isValidating) return tokens.colors.primary;
    if (isValid === true) return tokens.colors.success;
    if (isValid === false) return tokens.colors.error;
    return `${tokens.colors.primary}40`;
  }, [isValidating, isValid, tokens, cfg.showValidationStatus]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginHorizontal: 24,
          marginBottom: 24,
        },
        card: {
          aspectRatio: cfg.aspectRatio,
          backgroundColor: tokens.colors.surfaceSecondary,
          borderRadius: cfg.borderRadius,
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          borderWidth: 2,
          borderStyle: imageUri ? "solid" : cfg.borderStyle,
        },
        placeholder: {
          alignItems: "center",
          padding: 32,
        },
        iconCircle: {
          width: 88,
          height: 88,
          borderRadius: 44,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
          borderWidth: 2,
          borderColor: `${tokens.colors.primary}30`,
        },
        iconGradient: {
          width: 88,
          height: 88,
          borderRadius: 44,
          justifyContent: "center",
          alignItems: "center",
        },
        title: {
          fontSize: 20,
          fontWeight: "700",
          color: tokens.colors.textPrimary,
          marginBottom: 8,
          letterSpacing: 0.3,
        },
        subtitle: {
          fontSize: 14,
          color: tokens.colors.textSecondary,
          textAlign: "center",
          lineHeight: 20,
          maxWidth: 240,
        },
        image: {
          width: "100%",
          height: "100%",
          resizeMode: "cover",
        },
        imageOverlay: {
          ...StyleSheet.absoluteFillObject,
          backgroundColor: "rgba(0,0,0,0.15)",
        },
        changeButton: {
          position: "absolute",
          bottom: 20,
          right: 20,
          backgroundColor: tokens.colors.surface,
          paddingHorizontal: 18,
          paddingVertical: 12,
          borderRadius: 28,
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        },
        changeText: {
          fontSize: 14,
          fontWeight: "700",
          color: tokens.colors.primary,
        },
        validatingContainer: {
          alignItems: "center",
          padding: 32,
        },
        validatingText: {
          fontSize: 16,
          fontWeight: "600",
          color: tokens.colors.primary,
          marginTop: 20,
        },
        pulseRing: {
          position: "absolute",
          width: 100,
          height: 100,
          borderRadius: 50,
          borderWidth: 2,
          borderColor: `${tokens.colors.primary}30`,
        },
      }),
    [tokens, imageUri, cfg],
  );

  return (
    <View style={[styles.container, style]}>
      <Pressable
        style={[styles.card, { borderColor }]}
        onPress={onPress}
        disabled={disabled || isValidating}
      >
        {isValidating ? (
          <View style={styles.validatingContainer}>
            <View style={styles.pulseRing} />
            <AtomicSpinner size="lg" color="primary" />
            <AtomicText style={styles.validatingText}>
              {translations.analyzing || "Analyzing..."}
            </AtomicText>
          </View>
        ) : imageUri ? (
          <>
            <Image source={{ uri: imageUri }} style={styles.image} />
            <View style={styles.imageOverlay} />
            {cfg.allowChange && (
              <TouchableOpacity style={styles.changeButton} onPress={onPress}>
                <AtomicIcon
                  name="camera"
                  size={18}
                  customColor={tokens.colors.primary}
                />
                <AtomicText style={styles.changeText}>
                  {translations.change}
                </AtomicText>
              </TouchableOpacity>
            )}
          </>
        ) : (
          <View style={styles.placeholder}>
            <View style={styles.iconCircle}>
              <LinearGradient
                colors={[
                  `${tokens.colors.primary}20`,
                  `${tokens.colors.primary}10`,
                ]}
                style={styles.iconGradient}
              >
                <AtomicIcon
                  name={(icon as string) || "camera"}
                  size={cfg.iconSize}
                  customColor={tokens.colors.primary}
                />
              </LinearGradient>
            </View>
            <AtomicText style={styles.title}>
              {title || translations.tapToUpload}
            </AtomicText>
            <AtomicText style={styles.subtitle}>
              {subtitle || translations.selectPhoto}
            </AtomicText>
          </View>
        )}
      </Pressable>
    </View>
  );
};

