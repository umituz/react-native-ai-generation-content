/**
 * FrameSelector Component
 * Single Responsibility: Display and manage start/end frames
 */

import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import type { FrameSelectorProps } from "../../domain/types";

export const FrameSelector: React.FC<FrameSelectorProps> = ({
  frames,
  onFrameChange,
  onFrameDelete,
  startLabel,
  endLabel,
  changeLabel,
  deleteLabel,
  style,
}) => {
  const tokens = useAppDesignTokens();

  const startFrame = frames.find((f) => f.order === 0);
  const endFrame = frames.find((f) => f.order === 1);

  const renderFrameContent = (frame: typeof startFrame) =>
    frame ? (
      <Image
        source={{ uri: frame.url }}
        style={styles.image}
        resizeMode="cover"
      />
    ) : (
      <View style={styles.placeholder}>
        <AtomicIcon name="image-outline" size="xl" color="secondary" />
      </View>
    );

  const renderActions = (index: number) => (
    <View style={[styles.actions, { gap: tokens.spacing.md }]}>
      <TouchableOpacity
        style={[styles.actionButton, { gap: tokens.spacing.xs }]}
        onPress={() => onFrameChange(index)}
      >
        <AtomicIcon name="pencil-outline" size="xs" color="primary" />
        <AtomicText type="labelSmall" color="primary">
          {changeLabel}
        </AtomicText>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.actionButton, { gap: tokens.spacing.xs }]}
        onPress={() => onFrameDelete(index)}
      >
        <AtomicIcon name="trash-outline" size="xs" color="primary" />
        <AtomicText type="labelSmall" color="primary">
          {deleteLabel}
        </AtomicText>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { gap: tokens.spacing.md }, style]}>
      <View style={[styles.frameContainer, { gap: tokens.spacing.sm }]}>
        <AtomicText type="labelMedium" color="textSecondary">
          {startLabel}
        </AtomicText>
        <View
          style={[
            styles.imageWrapper,
            { backgroundColor: tokens.colors.surface },
          ]}
        >
          {renderFrameContent(startFrame)}
        </View>
        {renderActions(0)}
      </View>

      <View style={styles.separatorContainer}>
        <View
          style={[styles.separator, { backgroundColor: tokens.colors.surface }]}
        >
          <AtomicIcon name="arrow-forward-outline" size="sm" color="primary" />
        </View>
      </View>

      <View style={[styles.frameContainer, { gap: tokens.spacing.sm }]}>
        <AtomicText type="labelMedium" color="textSecondary">
          {endLabel}
        </AtomicText>
        <View
          style={[
            styles.imageWrapper,
            { backgroundColor: tokens.colors.surface },
          ]}
        >
          {renderFrameContent(endFrame)}
        </View>
        {renderActions(1)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  frameContainer: {
    flex: 1,
  },
  imageWrapper: {
    width: "100%",
    aspectRatio: 9 / 16,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    alignItems: "center",
    justifyContent: "center",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  separatorContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 80,
  },
  separator: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});
