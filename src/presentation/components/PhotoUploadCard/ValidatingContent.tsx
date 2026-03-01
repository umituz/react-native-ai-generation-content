/**
 * ValidatingContent Component
 * Displays validation progress animation
 */

import React from "react";
import { View } from "react-native";
import { AtomicText, AtomicSpinner } from "@umituz/react-native-design-system/atoms";
import type { PhotoUploadCardStyles } from "./PhotoUploadCard.styles";

interface ValidatingContentProps {
  styles: PhotoUploadCardStyles;
  analyzingText?: string;
}

export function ValidatingContent({
  styles,
  analyzingText,
}: ValidatingContentProps) {
  return (
    <View style={styles.validatingContainer}>
      <View style={styles.pulseRing} />
      <AtomicSpinner size="lg" color="primary" />
      <AtomicText style={styles.validatingText}>
        {analyzingText || "Analyzing..."}
      </AtomicText>
    </View>
  );
}
