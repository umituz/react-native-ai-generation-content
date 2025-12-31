/**
 * Text-to-Video Callback Types
 * Single Responsibility: Define callback function signatures
 */

import type { TextToVideoResult } from "./request.types";

export interface VideoModerationResult {
  allowed: boolean;
  warnings: string[];
}

export interface ProjectData {
  videoUrl: string;
  thumbnailUrl?: string;
  prompt: string;
  aspectRatio: string;
  duration: number;
  style: string;
}

export interface TextToVideoCallbacks {
  onCreditCheck?: (cost: number) => boolean | Promise<boolean>;
  onAuthCheck?: () => boolean;
  onModeration?: (prompt: string) => Promise<VideoModerationResult>;
  onProjectCreate?: (data: ProjectData) => Promise<void>;
  onGenerate?: (result: TextToVideoResult) => void;
  onError?: (error: string) => void;
  onProgress?: (progress: number) => void;
  onPromptChange?: (prompt: string) => void;
  onStyleChange?: (style: string) => void;
  onTabChange?: (tab: string) => void;
  onShowPaywall?: (cost: number) => void;
  onShowModerationWarning?: (
    warnings: string[],
    onCancel: () => void,
    onProceed: () => void,
  ) => void;
  onNavigateToProjects?: () => void;
  onNavigateToEditor?: (videoUrl: string) => void;
}

export interface TextToVideoTranslations {
  promptPlaceholder: string;
  generateButtonText: string;
  processingText: string;
  successText: string;
  missingPromptTitle: string;
  missingPromptMessage: string;
}
