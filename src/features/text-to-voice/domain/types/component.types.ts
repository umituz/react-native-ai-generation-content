/**
 * Text-to-Voice Component Types
 * Props types for UI components
 */

import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

export interface TextToVoiceTextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  maxLength?: number;
  labelKey: string;
  placeholderKey: string;
  characterCountKey: string;
  style?: StyleProp<ViewStyle>;
}

export interface TextToVoiceOptionalInputProps {
  title: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  hint: string;
  style?: StyleProp<ViewStyle>;
}

export interface TextToVoiceExamplePromptsProps {
  prompts: string[];
  onSelectPrompt: (prompt: string) => void;
  labelKey: string;
  style?: StyleProp<ViewStyle>;
}

export interface TextToVoiceGenerateButtonProps {
  isGenerating: boolean;
  progress: number;
  disabled: boolean;
  onPress: () => void;
  buttonTextKey: string;
  generatingTextKey: string;
  style?: StyleProp<ViewStyle>;
}

export interface TextToVoiceAudioPlayerProps {
  audioUrl: string;
  onPlay: () => void;
  successTextKey: string;
  playButtonTextKey: string;
  style?: StyleProp<ViewStyle>;
}

export interface TextToVoiceErrorMessageProps {
  message: string;
  style?: StyleProp<ViewStyle>;
}

export interface TextToVoiceHeaderProps {
  titleKey: string;
  descriptionKey: string;
  iconName: string;
  navigationType?: "back" | "close";
  headerContent?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export interface TextToVoiceScreenConfig {
  maxTextLength: number;
  creditCost: number;
  defaultModel?: string;
  defaultVoice?: string;
  defaultSpeed?: number;
  defaultStability?: number;
  defaultSimilarityBoost?: number;
}

export interface TextToVoiceTranslationKeys {
  title: string;
  description: string;
  textInputLabel: string;
  textInputPlaceholder: string;
  characterCount: string;
  voiceLabel: string;
  voicePlaceholder: string;
  voiceHint: string;
  examplesLabel: string;
  generateButton: string;
  generatingText: string;
  successText: string;
  playButton: string;
}
