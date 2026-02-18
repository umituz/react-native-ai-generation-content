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

interface FrameContentProps {
  frame: { url: string; order: number } | undefined;
  imageStyle: object;
}

const FrameContent: React.FC<FrameContentProps> = ({ frame, imageStyle }) =>
  frame ? (
    <Image
      source={{ uri: frame.url }}
      style={imageStyle}
      resizeMode="cover"
    />
  ) : (
    <View style={placeholderStyle.container}>
      <AtomicIcon name="image-outline" size="xl" color="secondary" />
    </View>
  );

const placeholderStyle = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

interface FrameActionsProps {
  index: number;
  onFrameChange: (index: number) => void;
  onFrameDelete: (index: number) => void;
  changeLabel: string;
  deleteLabel: string;
  gap: number;
  buttonGap: number;
}

const FrameActions: React.FC<FrameActionsProps> = ({
  index,
  onFrameChange,
  onFrameDelete,
  changeLabel,
  deleteLabel,
  gap,
  buttonGap,
}) => (
  <View style={[frameActionStyles.actions, { gap }]}>
    <TouchableOpacity
      style={[frameActionStyles.actionButton, { gap: buttonGap }]}
      onPress={() => onFrameChange(index)}
    >
      <AtomicIcon name="pencil-outline" size="xs" color="primary" />
      <AtomicText type="labelSmall" color="primary">
        {changeLabel}
      </AtomicText>
    </TouchableOpacity>
    <TouchableOpacity
      style={[frameActionStyles.actionButton, { gap: buttonGap }]}
      onPress={() => onFrameDelete(index)}
    >
      <AtomicIcon name="trash-outline" size="xs" color="primary" />
      <AtomicText type="labelSmall" color="primary">
        {deleteLabel}
      </AtomicText>
    </TouchableOpacity>
  </View>
);

const frameActionStyles = StyleSheet.create({
  actions: {
    flexDirection: "row",
    justifyContent: "center",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
});

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
          <FrameContent frame={startFrame} imageStyle={styles.image} />
        </View>
        <FrameActions
          index={0}
          onFrameChange={onFrameChange}
          onFrameDelete={onFrameDelete}
          changeLabel={changeLabel}
          deleteLabel={deleteLabel}
          gap={tokens.spacing.md}
          buttonGap={tokens.spacing.xs}
        />
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
          <FrameContent frame={endFrame} imageStyle={styles.image} />
        </View>
        <FrameActions
          index={1}
          onFrameChange={onFrameChange}
          onFrameDelete={onFrameDelete}
          changeLabel={changeLabel}
          deleteLabel={deleteLabel}
          gap={tokens.spacing.md}
          buttonGap={tokens.spacing.xs}
        />
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
