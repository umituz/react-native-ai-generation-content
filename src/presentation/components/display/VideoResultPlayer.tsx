import React from "react";
import { useVideoPlayer, VideoView } from "expo-video";

interface VideoResultPlayerProps {
  uri: string;
}

export const VideoResultPlayer: React.FC<VideoResultPlayerProps> = ({ uri }) => {
  const player = useVideoPlayer(uri, (player) => {
    player.loop = true;
    player.play();
  });

  return (
    <VideoView
      style={{ width: "100%", aspectRatio: 2 / 3, borderRadius: 16 }}
      player={player}
      contentFit="cover"
      nativeControls
    />
  );
};
