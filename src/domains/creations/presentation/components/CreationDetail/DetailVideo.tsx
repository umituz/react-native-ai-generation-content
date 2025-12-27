/**
 * DetailVideo Component
 * Video player with thumbnail and play controls for creation detail view
 */

import React, { useState, useCallback } from "react";
import { View, StyleSheet, TouchableOpacity, useWindowDimensions } from "react-native";
import { useAppDesignTokens, AtomicIcon } from "@umituz/react-native-design-system";
import { Image } from "expo-image";
import { useVideoPlayer, VideoView } from "expo-video";

interface DetailVideoProps {
  readonly videoUrl: string;
  readonly thumbnailUrl?: string;
}

const HORIZONTAL_PADDING = 16;
const ASPECT_RATIO = 16 / 9;

export const DetailVideo: React.FC<DetailVideoProps> = ({
  videoUrl,
  thumbnailUrl,
}) => {
  const tokens = useAppDesignTokens();
  const { width } = useWindowDimensions();
  const videoWidth = width - (HORIZONTAL_PADDING * 2);
  const videoHeight = videoWidth / ASPECT_RATIO;
  const [isPlaying, setIsPlaying] = useState(false);

  const player = useVideoPlayer(videoUrl, (p) => {
    p.loop = true;
  });

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
    player.play();
  }, [player]);

  return (
    <View style={styles.container}>
      <View style={[styles.frame, { width: videoWidth, height: videoHeight, backgroundColor: tokens.colors.surface }]}>
        {isPlaying ? (
          <VideoView
            player={player}
            style={styles.video}
            contentFit="cover"
            nativeControls
          />
        ) : (
          <TouchableOpacity
            style={styles.thumbnailContainer}
            onPress={handlePlay}
            activeOpacity={0.8}
          >
            {thumbnailUrl ? (
              <Image
                source={{ uri: thumbnailUrl }}
                style={styles.thumbnail}
                contentFit="cover"
              />
            ) : (
              <View style={[styles.placeholder, { backgroundColor: tokens.colors.surfaceSecondary }]} />
            )}
            <View style={styles.playButtonContainer}>
              <View style={[styles.playButton, { backgroundColor: tokens.colors.primary }]}>
                <AtomicIcon name="play" customSize={32} color="onPrimary" />
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: HORIZONTAL_PADDING,
    marginVertical: 16,
  },
  frame: {
    borderRadius: 16,
    overflow: "hidden",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  thumbnailContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    width: "100%",
    height: "100%",
  },
  playButtonContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 4,
  },
});
