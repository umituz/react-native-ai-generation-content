/**
 * Text-to-Video Configuration Types
 * Single Responsibility: Define configuration interfaces for flexibility
 */

export interface TabConfig {
  id: string;
  labelKey: string;
}

export interface VideoStyleOption {
  id: string;
  nameKey: string;
  descriptionKey?: string;
  thumbnail?: string;
}

export interface AspectRatioOption {
  id: string;
  value: string;
  labelKey: string;
  icon?: string;
}

export interface VideoDurationOption {
  value: number;
  labelKey: string;
}

export interface OptionToggleConfig {
  id: string;
  labelKey: string;
  badgeKey?: string;
  defaultValue?: boolean;
}

export interface TextToVideoConfig {
  model: string;
  creditCost: number;
  maxPromptLength?: number;
  enableFrames?: boolean;
  enableHints?: boolean;
  enableSound?: boolean;
  enableProfessionalMode?: boolean;
  tabs?: TabConfig[];
  styles?: VideoStyleOption[];
  aspectRatios?: AspectRatioOption[];
  durations?: VideoDurationOption[];
  options?: OptionToggleConfig[];
}

export interface HeroConfig {
  titleKey: string;
  subtitleKey: string;
  icon?: string;
}

export interface ProgressConfig {
  titleKey: string;
  hintKey: string;
}
