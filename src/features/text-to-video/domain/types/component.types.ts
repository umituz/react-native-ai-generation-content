/**
 * Text-to-Video Component Prop Types
 * Single Responsibility: Define component prop interfaces
 */

import type { ViewStyle } from "react-native";
import type { FrameData } from "./state.types";
import type { TabConfig, VideoStyleOption, AspectRatioOption, VideoDurationOption } from "./config.types";

export interface GenerationTabsProps {
  tabs: TabConfig[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  getLabel: (key: string) => string;
  style?: ViewStyle;
}

export interface FrameSelectorProps {
  frames: FrameData[];
  onFrameChange: (index: number) => void;
  onFrameDelete: (index: number) => void;
  startLabel: string;
  endLabel: string;
  changeLabel: string;
  deleteLabel: string;
  style?: ViewStyle;
}

export interface OptionsPanelProps {
  soundEnabled: boolean;
  onSoundToggle: (value: boolean) => void;
  professionalMode: boolean;
  onProfessionalModeToggle: (value: boolean) => void;
  duration: number;
  soundLabel: string;
  soundBadge?: string;
  professionalLabel: string;
  style?: ViewStyle;
}

export interface HeroSectionProps {
  title: string;
  subtitle: string;
  icon?: string;
  style?: ViewStyle;
}

export interface HintCarouselProps {
  hints: HintItem[];
  onHintSelect: (hint: HintItem) => void;
  onRefresh?: () => void;
  style?: ViewStyle;
}

export interface HintItem {
  id: string;
  imageUrl: string;
  prompt?: string;
}

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

export interface GenerateButtonProps {
  isGenerating: boolean;
  isDisabled: boolean;
  onPress: () => void;
  credits?: number;
  label: string;
  generatingLabel: string;
  style?: ViewStyle;
}

export interface ExamplePromptsProps {
  prompts: ExamplePrompt[];
  onPromptSelect: (prompt: string) => void;
  style?: ViewStyle;
}

export interface ExamplePrompt {
  id: string;
  text: string;
  emoji?: string;
}
