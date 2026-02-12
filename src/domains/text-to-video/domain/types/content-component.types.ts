/**
 * Content Component Types
 */

import type { ViewStyle } from "react-native";

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
