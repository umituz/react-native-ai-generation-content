/**
 * DetailVideo Component
 * Video player with thumbnail and play controls for creation detail view
 */

import React, { useMemo } from "react";
import { View } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";
import { useResponsive } from "@umituz/react-native-design-system";

interface DetailVideoProps {
  readonly videoUrl: string;
  readonly _thumbnailUrl?: string;
}

export const DetailVideo: React.FC<DetailVideoProps> = ({
  videoUrl,
  _thumbnailUrl,
}) => {
  const { width, horizontalPadding, spacingMultiplier } = useResponsive();
  const videoWidth = width - (horizontalPadding * 2);

  const player = useVideoPlayer(videoUrl, (player) => {
    player.loop = true;
  });

  const containerStyle = useMemo(() => ({
    paddingHorizontal: horizontalPadding,
    marginVertical: 16 * spacingMultiplier,
  }), [horizontalPadding, spacingMultiplier]);

  const videoStyle = useMemo(() => ({
    width: videoWidth,
    height: (videoWidth * 9) / 16, // 16:9 aspect ratio
  }), [videoWidth]);

  return (
    <View style={containerStyle}>
      <VideoView
        style={videoStyle}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
        nativeControls
      />
    </View>
  );
};
