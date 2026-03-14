import React from "react";
import { View, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from "react-native";
import {
  AtomicText,
  AtomicIcon,
} from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";

export interface SuccessRedirectionCardProps {
  onPress: () => void;
  title: string;
  description: string;
  buttonText: string;
  iconName?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * SuccessRedirectionCard Component
 * A card displayed after successful generation to redirect users to their creations
 */
export const SuccessRedirectionCard: React.FC<SuccessRedirectionCardProps> = ({
  onPress,
  title,
  description,
  buttonText,
  iconName = "images-outline",
  style,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: tokens.colors.surfaceSecondary,
          borderColor: tokens.colors.borderLight,
        },
        style,
      ]}
    >
      <View
        style={[
          styles.iconWrap,
          { backgroundColor: tokens.colors.backgroundPrimary },
        ]}
      >
        <AtomicIcon name={iconName as any} size="xl" color="primary" />
      </View>

      <AtomicText type="titleSmall" color="textPrimary" style={styles.title}>
        {title}
      </AtomicText>

      <AtomicText
        type="bodySmall"
        color="textSecondary"
        style={styles.description}
      >
        {description}
      </AtomicText>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: tokens.colors.primary }]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <AtomicText
          type="labelMedium"
          color="onPrimary"
          style={styles.buttonText}
        >
          {buttonText}
        </AtomicText>
        <AtomicIcon name="arrow-forward" size="sm" color="onPrimary" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    gap: 8,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  title: {
    fontWeight: "700",
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 8,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 24,
    gap: 4,
    width: "100%",
  },
  buttonText: {
    fontWeight: "700",
  },
});
