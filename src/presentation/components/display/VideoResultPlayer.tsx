import React from "react";
import { VideoPlayer } from "@umituz/react-native-video-editor/player";

interface VideoResultPlayerProps {
  uri: string;
}

export const VideoResultPlayer: React.FC<VideoResultPlayerProps> = ({ uri }) => {
  return (
    <VideoPlayer
      source={uri}
      loop
      autoPlay
      showControls
      contentFit="cover"
      style={{ width: "100%", aspectRatio: 2 / 3, borderRadius: 16 }}
    />
  );
};
