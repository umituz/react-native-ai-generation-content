/**
 * GenerationProgressContent
 * Content for the AI generation progress modal
 * Props-driven for 100+ apps compatibility
 */

import React from "react";
import { View } from "react-native";
import { useAppDesignTokens } from "@umituz/react-native-design-system";
import { ProgressCloseButton } from "./ProgressCloseButton";
import { ProgressHeader } from "./ProgressHeader";
import { ProgressHint } from "./ProgressHint";
import { ProgressDismissButton } from "./ProgressDismissButton";
import { ProgressBar } from "../../shared/components/common";
import { generationProgressContentStyles } from "./GenerationProgressContent.styles";
import type { GenerationProgressContentProps } from "./GenerationProgressContent.types";

export const GenerationProgressContent: React.FC<
  GenerationProgressContentProps
> = ({
  progress,
  icon,
  title,
  message,
  hint,
  dismissLabel,
  onDismiss,
  onClose,
  backgroundHint,
  backgroundColor,
  textColor,
  hintColor,
  progressColor,
  progressBackgroundColor,
  dismissButtonColor,
}) => {
  const tokens = useAppDesignTokens();
  const activeBgColor = backgroundColor || tokens.colors.surface;

  return (
    <View
      style={[
        generationProgressContentStyles.modal,
        {
          backgroundColor: activeBgColor,
          borderColor: tokens.colors.borderLight,
        },
      ]}
    >
      {onClose && <ProgressCloseButton onPress={onClose} />}

      <ProgressHeader
        icon={icon}
        title={title}
        message={message}
        textColor={textColor}
      />

      <ProgressBar
        progress={progress}
        showPercentage={true}
        textColor={tokens.colors.primary}
        progressColor={progressColor}
        backgroundColor={progressBackgroundColor}
        height={8}
        marginBottom={16}
      />

      <ProgressHint
        hint={hint}
        backgroundHint={backgroundHint}
        hintColor={hintColor}
        onBackgroundHintPress={onClose}
      />

      {onDismiss && (
        <ProgressDismissButton
          dismissLabel={dismissLabel}
          dismissButtonColor={dismissButtonColor}
          onDismiss={onDismiss}
        />
      )}
    </View>
  );
};

export type { GenerationProgressContentProps } from "./GenerationProgressContent.types";
