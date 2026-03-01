import React from "react";

// expo-video is optional — module-level lazy require with null stubs
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let useVideoPlayer: (...args: any[]) => any = () => null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let VideoView: React.ComponentType<any> = () => null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const expoVideo = require("expo-video");
  useVideoPlayer = expoVideo.useVideoPlayer;
  VideoView = expoVideo.VideoView;
} catch {
  // expo-video not installed in consuming app
}

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
