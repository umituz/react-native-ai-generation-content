/**
 * Indeterminate Progress Bar Component
 * Pulses left to right to indicate ongoing progress without specific percentage
 * Uses setInterval + state updates (not Animated API) for compatibility
 */

import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";

interface IndeterminateProgressBarProps {
  readonly backgroundColor: string;
  readonly fillColor: string;
}

export const IndeterminateProgressBar: React.FC<IndeterminateProgressBarProps> = ({
  backgroundColor,
  fillColor,
}) => {
  const [position, setPosition] = useState(0);
  const directionRef = useRef(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        const next = prev + directionRef.current * 2;
        if (next >= 70) {
          directionRef.current = -1;
          return 70;
        }
        if (next <= 0) {
          directionRef.current = 1;
          return 0;
        }
        return next;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={[styles.progressBar, { backgroundColor }]}>
      <View
        style={[
          styles.progressFill,
          {
            backgroundColor: fillColor,
            left: `${position}%`,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
    position: "relative",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
    position: "absolute",
    width: "30%",
  },
});
