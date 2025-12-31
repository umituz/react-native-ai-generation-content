import React, { PropsWithChildren } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import {
  useAppDesignTokens,
  AtomicText,
  AtomicButton,
} from "@umituz/react-native-design-system";

export interface AIGenerationResultAction {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  icon?: string;
}

export interface AIGenerationResultTranslations {
  successText?: string;
}

export interface AIGenerationResultProps extends PropsWithChildren {
  /** Success message shown at the top */
  successText?: string;
  /** Primary action (usually Save/Download) */
  primaryAction?: AIGenerationResultAction;
  /** Secondary action (usually Try Again/Reset) */
  secondaryAction?: AIGenerationResultAction;
  /** Additional actions */
  extraActions?: AIGenerationResultAction[];
  /** Standard translations */
  translations?: AIGenerationResultTranslations;
  /** Custom style for the content container */
  contentStyle?: any;
}

/**
 * Standardized AI Generation Result View
 * Handles success message, content display (children), and action buttons.
 */
export const AIGenerationResult: React.FC<AIGenerationResultProps> = ({
  successText,
  primaryAction,
  secondaryAction,
  extraActions = [],
  translations,
  contentStyle,
  children,
}) => {
  const tokens = useAppDesignTokens();
  const screenWidth = Dimensions.get("window").width;
  const contentSize = screenWidth - 48;

  const displaySuccessText = successText || translations?.successText;

  return (
    <View style={styles.container}>
      {displaySuccessText && (
        <AtomicText
          type="headlineMedium"
          style={[styles.successText, { color: tokens.colors.success }]}
        >
          {displaySuccessText}
        </AtomicText>
      )}

      <View style={[styles.contentContainer, { width: contentSize }, contentStyle]}>
        {children}
      </View>

      <View style={styles.actionsContainer}>
        {primaryAction && (
          <AtomicButton
            title={primaryAction.label}
            onPress={primaryAction.onPress}
            variant="primary"
            size="lg"
            leftIcon={primaryAction.icon}
          />
        )}

        {secondaryAction && (
          <AtomicButton
            title={secondaryAction.label}
            onPress={secondaryAction.onPress}
            variant="secondary"
            size="lg"
            leftIcon={secondaryAction.icon}
          />
        )}

        {extraActions.map((action, index) => (
          <AtomicButton
            key={`extra-action-${index}`}
            title={action.label}
            onPress={action.onPress}
            variant={action.variant || "outline"}
            size="lg"
            leftIcon={action.icon}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
  },
  successText: {
    textAlign: "center",
    marginBottom: 24,
  },
  contentContainer: {
    alignSelf: "center",
    marginBottom: 24,
    borderRadius: 16,
    overflow: "hidden",
  },
  actionsContainer: {
    marginHorizontal: 24,
    gap: 12,
  },
});
