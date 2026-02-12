/**
 * Selector Component Types
 */

import type { ViewStyle } from "react-native";
import type { VideoStyleOption, AspectRatioOption, VideoDurationOption } from "./config.types";

export interface StyleSelectorProps {
  styles: VideoStyleOption[];
  selectedStyle: string;
  onStyleSelect: (styleId: string) => void;
  getLabel: (key: string) => string;
  title: string;
  style?: ViewStyle;
}

export interface AspectRatioSelectorProps {
  ratios: AspectRatioOption[];
  selectedRatio: string;
  onRatioSelect: (ratioId: string) => void;
  getLabel: (key: string) => string;
  style?: ViewStyle;
}

export interface DurationSelectorProps {
  durations: VideoDurationOption[];
  selectedDuration: number;
  onDurationSelect: (duration: number) => void;
  getLabel: (key: string) => string;
  style?: ViewStyle;
}
