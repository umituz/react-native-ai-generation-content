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
  readonly onNavigationPress: () => void;
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
  titleType = "titleLarge",
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
        <View style={styles.leftContainer}>
          <TouchableOpacity
            onPress={onNavigationPress}
            style={buttonStyle}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <AtomicIcon name={iconName} size="md" color={iconColor} />
          </TouchableOpacity>
          <AtomicText
            type={titleType}
            style={{
              color: tokens.colors.textPrimary,
              fontWeight: "700",
              marginLeft: navigationType === "back" ? 8 : 0,
            }}
          >
            {title}
          </AtomicText>
        </View>
        <View style={styles.headerActions}>{rightContent}</View>
      </View>
      {showDescription && description && (
        <AtomicText
          type="bodyMedium"
          style={[
            styles.description,
            { color: tokens.colors.textSecondary, marginTop: 8 },
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
    padding: 16,
    paddingTop: 60,
    width: "100%",
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  navigationButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {},
  closeButton: {
    borderRadius: 20,
    borderWidth: 1,
  },
  description: {
    lineHeight: 20,
  },
  headerContent: {
    marginTop: 16,
  },
});
