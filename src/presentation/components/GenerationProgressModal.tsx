/**
 * GenerationProgressModal
 * Generic AI generation progress modal with customizable rendering
 */

import React from "react";
import { Modal, View, StyleSheet } from "react-native";
import { useAppDesignTokens } from "@umituz/react-native-design-system";
import {
  GenerationProgressContent,
  GenerationProgressContentProps,
} from "./GenerationProgressContent";

export interface GenerationProgressRenderProps {
  progress: number;
  title?: string;
  message?: string;
  hint?: string;
  onDismiss?: () => void;
}

export interface GenerationProgressModalProps
  extends Omit<GenerationProgressContentProps, "backgroundColor"> {
  visible: boolean;
  overlayColor?: string;
  modalBackgroundColor?: string;
  renderContent?: (props: GenerationProgressRenderProps) => React.ReactNode;
}

export const GenerationProgressModal: React.FC<
  GenerationProgressModalProps
> = ({
  visible,
  progress,
  title,
  message,
  hint,
  dismissLabel,
  onDismiss,
  overlayColor = "rgba(0, 0, 0, 0.7)",
  modalBackgroundColor,
  textColor,
  progressColor,
  progressBackgroundColor,
  dismissButtonColor,
  renderContent,
}) => {
    const tokens = useAppDesignTokens();
    const clampedProgress = Math.max(0, Math.min(100, progress));

    const content = renderContent ? (
      renderContent({
        progress: clampedProgress,
        title,
        message,
        hint,
        onDismiss,
      })
    ) : (
      <GenerationProgressContent
        progress={clampedProgress}
        title={title}
        message={message}
        hint={hint}
        dismissLabel={dismissLabel}
        onDismiss={onDismiss}
        backgroundColor={modalBackgroundColor || tokens.colors.surface}
        textColor={textColor || tokens.colors.textPrimary}
        progressColor={progressColor || tokens.colors.primary}
        progressBackgroundColor={
          progressBackgroundColor || tokens.colors.borderLight
        }
        dismissButtonColor={dismissButtonColor || tokens.colors.primary}
      />
    );

    return (
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        statusBarTranslucent
      >
        <View style={[styles.overlay, { backgroundColor: overlayColor }]}>
          {content}
        </View>
      </Modal>
    );
  };

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
