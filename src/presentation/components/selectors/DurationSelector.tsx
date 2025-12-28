/**
 * Duration Selector Component
 * Generic, props-driven duration selection for video/audio generation
 */

import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import type { DurationValue } from "./types";

export interface DurationSelectorProps<T extends DurationValue> {
  duration: T;
  durationOptions: readonly T[];
  onDurationSelect: (duration: T) => void;
  title: string;
  formatLabel?: (duration: T) => string;
}

export function DurationSelector<T extends DurationValue>({
  duration,
  durationOptions,
  onDurationSelect,
  title,
  formatLabel = (d) => `${d}s`,
}: DurationSelectorProps<T>): React.ReactElement {
  const tokens = useAppDesignTokens();

  return (
    <View style={componentStyles.section}>
      <AtomicText
        type="bodyMedium"
        style={{
          color: tokens.colors.textPrimary,
          fontWeight: "600",
          marginBottom: 12,
        }}
      >
        {title}
      </AtomicText>
      <View style={componentStyles.durationGrid}>
        {durationOptions.map((sec) => (
          <TouchableOpacity
            key={sec}
            style={[
              componentStyles.durationButton,
              {
                backgroundColor:
                  duration === sec
                    ? tokens.colors.primary
                    : tokens.colors.surface,
                borderColor:
                  duration === sec
                    ? tokens.colors.primary
                    : tokens.colors.borderLight,
              },
            ]}
            onPress={() => onDurationSelect(sec)}
          >
            <AtomicText
              type="bodyLarge"
              style={{
                color:
                  duration === sec
                    ? tokens.colors.textInverse
                    : tokens.colors.textPrimary,
                fontWeight: duration === sec ? "700" : "400",
              }}
            >
              {formatLabel(sec)}
            </AtomicText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const componentStyles = StyleSheet.create({
  section: {
    padding: 16,
    marginBottom: 8,
  },
  durationGrid: {
    flexDirection: "row",
    gap: 12,
  },
  durationButton: {
    flex: 1,
    paddingVertical: 20,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
