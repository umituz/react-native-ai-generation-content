/**
 * Text-to-Video Feature State Types
 * Refactored to use shared kernel types
 */

import type { BaseFeatureState } from '../../../../shared-kernel/base-types';

/**
 * Text-to-video feature state
 * Extends base feature state with video-specific fields
 */
export interface TextToVideoFeatureState extends BaseFeatureState {
  prompt: string;
  videoUrl: string | null;
  thumbnailUrl: string | null;
}

/**
 * Text-to-video form state
 * UI-specific state, separate from feature state
 */
export interface TextToVideoFormState {
  prompt: string;
  style: string;
  aspectRatio: string;
  duration: number;
  activeTab: string;
  soundEnabled: boolean;
  professionalMode: boolean;
}

/**
 * Frame data structure
 */
export interface FrameData {
  id: string;
  url: string;
  order: number;
}

/**
 * Initial form state
 */
export const INITIAL_FORM_STATE: TextToVideoFormState = {
  prompt: '',
  style: 'realistic',
  aspectRatio: '16:9',
  duration: 4,
  activeTab: 'text-to-video',
  soundEnabled: false,
  professionalMode: false,
};

