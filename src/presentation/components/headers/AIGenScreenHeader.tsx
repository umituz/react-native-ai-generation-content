import React, { ReactNode } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";

export type NavigationButtonType = "back" | "close";

export interface AIGenScreenHeaderProps {
  readonly title: string;
  readonly description?: string;
  readonly navigationType?: NavigationButtonType;
  readonly onNavigationPress?: () => void;
  readonly headerContent?: ReactNode;
  readonly rightContent?: ReactNode;
  readonly titleType?: "headlineLarge" | "titleLarge";
  readonly showDescription?: boolean;
}

export const AIGenScreenHeader: React.FC<AIGenScreenHeaderProps> = ({
  title,
  description,
  navigationType = "back",
  onNavigationPress,
  headerContent,
  rightContent,
  titleType = "headlineLarge",
  showDescription = !!description,
}) => {
  const tokens = useAppDesignTokens();

  const isCloseButton = navigationType === "close";
  const buttonStyle = isCloseButton
    ? [
        styles.navigationButton,
        styles.closeButton,
        {
          backgroundColor: tokens.colors.surface,
          borderColor: tokens.colors.borderLight,
        },
      ]
    : [styles.navigationButton, styles.backButton];

  const iconName = isCloseButton ? "close-circle" : "chevron-back";
  const iconColor = isCloseButton ? "secondary" : "primary";

  return (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <View style={styles.titleContainer}>
          <AtomicText
            type={titleType}
            style={{
              color: tokens.colors.textPrimary,
              fontWeight: "700",
            }}
          >
            {title}
          </AtomicText>
        </View>
        <View style={styles.headerActions}>
          {rightContent}
          {onNavigationPress && (
            <TouchableOpacity
              onPress={onNavigationPress}
              style={buttonStyle}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <AtomicIcon name={iconName} size="md" color={iconColor} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {showDescription && description && (
        <AtomicText
          type="bodyMedium"
          style={[
            styles.description,
            { color: tokens.colors.textSecondary, marginTop: 4 },
          ]}
        >
          {description}
        </AtomicText>
      )}
      {headerContent && <View style={styles.headerContent}>{headerContent}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 60,
    width: "100%",
    marginBottom: 24,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  navigationButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    width: 40,
    height: 40,
  },
  closeButton: {
    borderWidth: 1,
  },
  description: {
    lineHeight: 20,
  },
  headerContent: {
    marginTop: 16,
  },
});
