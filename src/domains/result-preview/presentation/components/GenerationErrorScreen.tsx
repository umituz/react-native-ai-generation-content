/**
 * GenerationErrorScreen
 * Generic error screen for AI generation failures
 */

import React, { useMemo } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import {
  ScreenLayout,
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
  AtomicButton,
  type DesignTokens,
} from "@umituz/react-native-design-system";

/**
 * Error screen translations
 */
export interface GenerationErrorTranslations {
  /** Error title */
  readonly title: string;
  /** Try again button */
  readonly tryAgain: string;
  /** Choose another button */
  readonly chooseAnother: string;
  /** Credit info message */
  readonly noCreditCharged: string;
}

/**
 * Error screen config
 */
export interface GenerationErrorConfig {
  /** Show credit info message */
  readonly showCreditInfo?: boolean;
  /** Icon name */
  readonly iconName?: string;
  /** Icon size */
  readonly iconSize?: number;
}

/**
 * Error screen props
 */
export interface GenerationErrorScreenProps {
  /** Error message to display */
  readonly errorMessage?: string;
  /** Translations */
  readonly translations: GenerationErrorTranslations;
  /** Configuration */
  readonly config?: GenerationErrorConfig;
  /** Try again callback */
  readonly onTryAgain: () => void;
  /** Choose another scenario callback */
  readonly onChooseAnother: () => void;
  /** Optional custom style */
  readonly style?: StyleProp<ViewStyle>;
}

const DEFAULT_CONFIG: GenerationErrorConfig = {
  showCreditInfo: true,
  iconName: "alert-circle",
  iconSize: 56,
};

export const GenerationErrorScreen: React.FC<GenerationErrorScreenProps> = ({
  errorMessage,
  translations,
  config = DEFAULT_CONFIG,
  onTryAgain,
  onChooseAnother,
  style,
}) => {
  const tokens = useAppDesignTokens();
  const styles = useMemo(() => createStyles(tokens), [tokens]);
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: tokens.colors.backgroundPrimary },
        style,
      ]}
    >
      <ScreenLayout
        scrollable={false}
        edges={["top", "bottom"]}
        backgroundColor="transparent"
      >
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <AtomicIcon
              name={mergedConfig.iconName || "alert-circle"}
              size={mergedConfig.iconSize || 56}
              customColor={tokens.colors.error}
            />
          </View>

          <AtomicText style={styles.title}>{translations.title}</AtomicText>

          <AtomicText style={styles.message}>
            {errorMessage || translations.title}
          </AtomicText>

          {mergedConfig.showCreditInfo && (
            <View style={styles.infoContainer}>
              <AtomicIcon
                name="information-circle-outline"
                size={16}
                customColor={tokens.colors.textSecondary}
              />
              <AtomicText style={styles.infoText}>
                {translations.noCreditCharged}
              </AtomicText>
            </View>
          )}

          <View style={styles.spacer} />

          <View style={styles.actionsContainer}>
            <AtomicButton
              title={translations.tryAgain}
              onPress={onTryAgain}
              variant="primary"
              size="lg"
              fullWidth
            />

            <View style={styles.secondaryButtonContainer}>
              <AtomicButton
                title={translations.chooseAnother}
                onPress={onChooseAnother}
                variant="text"
                size="md"
                fullWidth
              />
            </View>
          </View>
        </View>
      </ScreenLayout>
    </View>
  );
};

const createStyles = (tokens: DesignTokens) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
      alignItems: "center",
      paddingHorizontal: 32,
      paddingTop: 80,
      paddingBottom: 40,
    },
    iconContainer: {
      marginBottom: 24,
    },
    title: {
      ...tokens.typography.headingMedium,
      color: tokens.colors.textPrimary,
      fontWeight: "700",
      marginBottom: 12,
      textAlign: "center",
    },
    message: {
      ...tokens.typography.bodyMedium,
      color: tokens.colors.textSecondary,
      textAlign: "center",
      lineHeight: 22,
      marginBottom: 24,
    },
    infoContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      opacity: 0.7,
    },
    infoText: {
      ...tokens.typography.bodySmall,
      color: tokens.colors.textSecondary,
    },
    spacer: {
      flex: 1,
    },
    actionsContainer: {
      width: "100%",
      gap: 16,
    },
    secondaryButtonContainer: {
      marginTop: 4,
    },
  });
