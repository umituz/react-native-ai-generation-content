/**
 * Step Progress Indicator
 * Simple and premium dot-based progress
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { useAppDesignTokens } from "@umituz/react-native-design-system";

interface ProgressDotsProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressDots: React.FC<ProgressDotsProps> = ({ currentStep, totalSteps }) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            { 
              backgroundColor: index <= currentStep ? tokens.colors.primary : tokens.colors.surfaceSecondary,
              width: index === currentStep ? 24 : 8,
              opacity: index <= currentStep ? 1 : 0.5
            }
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 24,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
});
