import type { AIPromptVariableType } from './types';

export interface AIPromptVariable {
  name: string;
  type: AIPromptVariableType;
  description: string;
  required: boolean;
  defaultValue?: string | number | boolean;
  options?: string[];
}

export interface AIPromptSafety {
  contentFilter: boolean;
  adultContentFilter: boolean;
  violenceFilter: boolean;
  hateSpeechFilter: boolean;
  copyrightFilter: boolean;
}

export interface AIPromptVersion {
  major: number;
  minor: number;
  patch: number;
}

export const createPromptVersion = (version: string): AIPromptVersion => {
  const [major, minor, patch] = version.split('.').map(Number);
  return { major: major || 1, minor: minor || 0, patch: patch || 0 };
};

export const formatVersion = (version: AIPromptVersion): string => {
  return `${version.major}.${version.minor}.${version.patch}`;
};