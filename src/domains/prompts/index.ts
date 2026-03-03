/**
 * Prompts - Public API
 * Core prompt building blocks for AI image generation
 */

export {
  IDENTITY_PRESERVATION_CORE,
  PHOTOREALISTIC_RENDERING,
  NATURAL_POSE_GUIDELINES,
} from './domain/base/constants';

export {
  createPhotorealisticPrompt,
} from './domain/base/creators';

export type { CreatePromptOptions } from './domain/base/types';
