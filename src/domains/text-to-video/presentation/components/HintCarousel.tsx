/**
 * HintCarousel Component
 * Single Responsibility: Display scrollable hint images for inspiration
 */

import React from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import type { HintCarouselProps } from "../../domain/types";

export const HintCarousel: React.FC<HintCarouselProps> = ({
  hints,
  onHintSelect,
  onRefresh,
  style,
}) => {
  const tokens = useAppDesignTokens();

  if (hints.length === 0) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {hints.map((hint) => (
          <TouchableOpacity
            key={hint.id}
            style={[
              styles.hintItem,
              { backgroundColor: tokens.colors.surface },
            ]}
            onPress={() => onHintSelect(hint)}
          >
            <Image
              source={{ uri: hint.imageUrl }}
              style={styles.hintImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
        {onRefresh && (
          <TouchableOpacity
            style={[
              styles.refreshButton,
              { backgroundColor: tokens.colors.surface },
            ]}
            onPress={onRefresh}
          >
            <AtomicIcon name="refresh-outline" size="md" color="primary" />
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  scrollContent: {
    paddingHorizontal: 4,
    gap: 12,
  },
  hintItem: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: "hidden",
  },
  hintImage: {
    width: "100%",
    height: "100%",
  },
  refreshButton: {
    width: 80,
    height: 80,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
