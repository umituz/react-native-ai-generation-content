/**
 * DetailVideo Component
 * Video player with thumbnail and play controls for creation detail view
 */

import React, { useMemo } from "react";
import { View } from "react-native";
import { useResponsive } from "@umituz/react-native-design-system";
import { VideoPlayer } from "@umituz/react-native-video-editor";

interface DetailVideoProps {
  readonly videoUrl: string;
  readonly thumbnailUrl?: string;
}

export const DetailVideo: React.FC<DetailVideoProps> = ({
  videoUrl,
  thumbnailUrl,
}) => {
  const { width, horizontalPadding, spacingMultiplier } = useResponsive();
  const videoWidth = width - (horizontalPadding * 2);

  const containerStyle = useMemo(() => ({
    paddingHorizontal: horizontalPadding,
    marginVertical: 16 * spacingMultiplier,
  }), [horizontalPadding, spacingMultiplier]);

  return (
    <View style={containerStyle}>
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
