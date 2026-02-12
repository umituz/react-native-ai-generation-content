/**
 * Panel Component Types
 */

import type { ViewStyle } from "react-native";

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
