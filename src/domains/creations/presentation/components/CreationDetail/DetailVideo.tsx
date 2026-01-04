/**
 * DetailVideo Component
 * Video player with thumbnail and play controls for creation detail view
 */

import React from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { VideoPlayer } from "@umituz/react-native-video-editor";

interface DetailVideoProps {
  readonly videoUrl: string;
  readonly thumbnailUrl?: string;
}

const HORIZONTAL_PADDING = 16;

export const DetailVideo: React.FC<DetailVideoProps> = ({
  videoUrl,
  thumbnailUrl,
}) => {
  const { width } = useWindowDimensions();
  const videoWidth = width - (HORIZONTAL_PADDING * 2);

  return (
    <View style={styles.container}>
      <VideoPlayer
        source={videoUrl}
        thumbnailUrl={thumbnailUrl}
        loop
        nativeControls
        contentFit="cover"
        style={{ width: videoWidth }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: HORIZONTAL_PADDING,
    marginVertical: 16,
  },
});
