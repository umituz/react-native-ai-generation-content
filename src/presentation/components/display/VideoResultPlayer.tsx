import React from "react";
import { View } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system/atoms";

interface VideoResultPlayerProps {
  uri: string;
  VideoPlayerComponent?: React.ComponentType<{ uri: string }>;
}

/**
 * Video Result Player Component
 *
 * This component displays video content. It accepts an optional VideoPlayerComponent prop
 * that should be passed in from the consumer application if video support is desired.
 *
 * If no VideoPlayerComponent is provided, it shows a fallback UI.
 *
 * @example With video player
 * import { VideoPlayer } from '@umituz/react-native-video-editor';
 * <VideoResultPlayer uri={videoUri} VideoPlayerComponent={VideoPlayer} />
 *
 * @example Without video player (fallback)
 * <VideoResultPlayer uri={videoUri} />
 */
export const VideoResultPlayer: React.FC<VideoResultPlayerProps> = ({
  uri,
  VideoPlayerComponent,
}) => {
  if (!VideoPlayerComponent) {
    return (
      <View style={{ width: "100%", aspectRatio: 2 / 3, borderRadius: 16, backgroundColor: "#000", justifyContent: "center", alignItems: "center" }}>
        <AtomicText style={{ color: "#fff" }}>Video not available</AtomicText>
      </View>
    );
  }

  return <VideoPlayerComponent uri={uri} />;
};
