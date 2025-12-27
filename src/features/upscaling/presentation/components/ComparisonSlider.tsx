/**
 * Comparison Slider Component
 * Before/After comparison slider for upscaled images
 */

import * as React from "react";
import { memo, useState, useRef, useMemo } from "react";
import {
  View,
  StyleSheet,
  Image,
  PanResponder,
  Dimensions,
} from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export interface ComparisonSliderProps {
  originalUri: string;
  processedUri: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export const ComparisonSlider: React.FC<ComparisonSliderProps> = memo(
  function ComparisonSlider({
    originalUri,
    processedUri,
    beforeLabel = "Before",
    afterLabel = "After",
  }) {
    const tokens = useAppDesignTokens();
    const [sliderPosition, setSliderPosition] = useState(50);
    const containerWidth = useRef(SCREEN_WIDTH - 48);

    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
          const newPosition =
            ((gestureState.moveX - 24) / containerWidth.current) * 100;
          setSliderPosition(Math.max(5, Math.min(95, newPosition)));
        },
      })
    ).current;

    const themedStyles = useMemo(
      () =>
        StyleSheet.create({
          container: {
            width: "100%",
            aspectRatio: 1,
            borderRadius: 20,
            overflow: "hidden",
            backgroundColor: tokens.colors.surfaceSecondary,
          },
          originalContainer: {
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            overflow: "hidden",
            borderRightWidth: 3,
            borderRightColor: tokens.colors.surface,
          },
          sliderHandle: {
            position: "absolute",
            top: "50%",
            left: -20,
            width: 40,
            height: 40,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            marginTop: -20,
            backgroundColor: tokens.colors.surface,
            borderWidth: 3,
            borderColor: tokens.colors.primary,
          },
          labelLeft: {
            backgroundColor: tokens.colors.surface,
          },
          labelRight: {
            backgroundColor: tokens.colors.primary,
          },
        }),
      [tokens]
    );

    return (
      <View
        style={themedStyles.container}
        onLayout={(e) => {
          containerWidth.current = e.nativeEvent.layout.width;
        }}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: processedUri }}
            style={styles.image}
            resizeMode="cover"
          />

          <View
            style={[
              themedStyles.originalContainer,
              { width: `${sliderPosition}%` },
            ]}
          >
            <Image
              source={{ uri: originalUri }}
              style={[styles.image, { width: containerWidth.current }]}
              resizeMode="cover"
            />
          </View>

          <View
            style={[styles.sliderLine, { left: `${sliderPosition}%` }]}
            {...panResponder.panHandlers}
          >
            <View style={themedStyles.sliderHandle}>
              <View style={styles.handleBars}>
                <View
                  style={[
                    styles.handleBar,
                    { backgroundColor: tokens.colors.primary },
                  ]}
                />
                <View
                  style={[
                    styles.handleBar,
                    { backgroundColor: tokens.colors.primary },
                  ]}
                />
              </View>
            </View>
          </View>

          <View
            style={[styles.label, styles.labelLeft, themedStyles.labelLeft]}
          >
            <AtomicText type="labelSmall" style={{ color: tokens.colors.text }}>
              {beforeLabel}
            </AtomicText>
          </View>

          <View
            style={[styles.label, styles.labelRight, themedStyles.labelRight]}
          >
            <AtomicText
              type="labelSmall"
              style={{ color: tokens.colors.onPrimary }}
            >
              {afterLabel}
            </AtomicText>
          </View>
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  sliderLine: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 3,
    marginLeft: -1.5,
  },
  handleBars: {
    flexDirection: "row",
    gap: 4,
  },
  handleBar: {
    width: 3,
    height: 16,
    borderRadius: 2,
  },
  label: {
    position: "absolute",
    top: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  labelLeft: {
    left: 12,
  },
  labelRight: {
    right: 12,
  },
});
