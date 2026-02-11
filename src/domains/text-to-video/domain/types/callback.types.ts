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

export interface CreationData {
  type: "text-to-video";
  videoUrl: string;
  thumbnailUrl?: string;
  prompt: string;
  metadata?: Record<string, unknown>;
}

export interface GenerationStartData {
  creationId: string;
  type: "text-to-video";
  prompt: string;
  metadata?: Record<string, unknown>;
}

export interface TextToVideoCallbacks {
  onCreditCheck?: (cost: number) => Promise<boolean>;
  onCreditDeduct?: (cost: number) => Promise<void>;
  onAuthCheck?: () => boolean;
  onModeration?: (prompt: string) => Promise<VideoModerationResult>;
  /** Called when generation starts - save a "processing" creation */
  onGenerationStart?: (data: GenerationStartData) => Promise<void>;
  /** Called when generation completes - update creation to "completed" */
  onCreationSave?: (data: CreationData & { creationId: string }) => Promise<void>;
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
