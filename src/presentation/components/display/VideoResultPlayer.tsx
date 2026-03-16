import React from "react";
import { ActivityIndicator, View } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system/atoms";

interface VideoResultPlayerProps {
  uri: string;
}

export const VideoResultPlayer: React.FC<VideoResultPlayerProps> = ({ uri }) => {
  const [VideoPlayer, setVideoPlayer] = React.useState<any>(null);

  React.useEffect(() => {
    // Lazy load video player only when needed
    import("@umituz/react-native-video-editor").then((module) => {
      setVideoPlayer(() => module.VideoPlayer);
    }).catch(() => {
      // Video player not available, will show fallback
    });
  }, []);

  if (!VideoPlayer) {
    return (
      <View style={{ width: "100%", aspectRatio: 2 / 3, borderRadius: 16, backgroundColor: "#000", justifyContent: "center", alignItems: "center" }}>
        <AtomicText style={{ color: "#fff" }}>Video not available</AtomicText>
      </View>
    );
  }

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
