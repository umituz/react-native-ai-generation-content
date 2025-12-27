/**
 * GenerationProgressModal
 * Generic AI generation progress modal using BaseModal
 * Props-driven for 100+ apps compatibility
 */

import React from "react";
import { StyleSheet } from "react-native";
import {
  BaseModal,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import {
  GenerationProgressContent,
  type GenerationProgressContentProps,
} from "./GenerationProgressContent";

export interface GenerationProgressRenderProps {
  readonly progress: number;
  readonly icon?: string;
  readonly title?: string;
  readonly message?: string;
  readonly hint?: string;
  readonly onDismiss?: () => void;
}

export interface GenerationProgressModalProps
  extends Omit<GenerationProgressContentProps, "backgroundColor"> {
  readonly visible: boolean;
  readonly modalBackgroundColor?: string;
  readonly renderContent?: (
    props: GenerationProgressRenderProps
  ) => React.ReactNode;
}

export const GenerationProgressModal: React.FC<
  GenerationProgressModalProps
> = ({
  visible,
  progress,
  icon,
  title,
  message,
  hint,
  dismissLabel,
  onDismiss,
  modalBackgroundColor,
  textColor,
  hintColor,
  progressColor,
  progressBackgroundColor,
  dismissButtonColor,
  renderContent,
}) => {
  const tokens = useAppDesignTokens();
  const clampedProgress = Math.max(0, Math.min(100, progress));

  const handleClose = React.useCallback(() => {
    onDismiss?.();
  }, [onDismiss]);

  const content = renderContent ? (
    renderContent({
      progress: clampedProgress,
      icon,
      title,
      message,
      hint,
      onDismiss,
    })
  ) : (
    <GenerationProgressContent
      progress={clampedProgress}
      icon={icon}
      title={title}
      message={message}
      hint={hint}
      dismissLabel={dismissLabel}
      onDismiss={onDismiss}
      backgroundColor={modalBackgroundColor || tokens.colors.surface}
      textColor={textColor || tokens.colors.textPrimary}
      hintColor={hintColor || tokens.colors.textTertiary}
      progressColor={progressColor || tokens.colors.primary}
      progressBackgroundColor={
        progressBackgroundColor || tokens.colors.surfaceVariant
      }
      dismissButtonColor={dismissButtonColor || tokens.colors.primary}
    />
  );

  return (
    <BaseModal
      visible={visible}
      onClose={handleClose}
      dismissOnBackdrop={false}
      contentStyle={styles.modalContent}
    >
      {content}
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 24,
    width: "100%",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
});
