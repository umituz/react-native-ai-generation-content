/**
 * @umituz/react-native-ai-prompts - Public API
 */

export type { AIPromptCategory, AIPromptVariableType, AIPromptError, AIPromptResult } from './domain/entities/types';
export type { AIPromptVariable, AIPromptSafety, AIPromptVersion } from './domain/entities/value-objects';
export { createPromptVersion, formatVersion } from './domain/entities/value-objects';

export type { AIPromptTemplate, CreateAIPromptTemplateParams } from './domain/entities/AIPromptTemplate';
export { createAIPromptTemplate, updateTemplateVersion, getTemplateString } from './domain/entities/AIPromptTemplate';

export type { GeneratedPrompt, CreateGeneratedPromptParams } from './domain/entities/GeneratedPrompt';
export { createGeneratedPrompt, isPromptRecent } from './domain/entities/GeneratedPrompt';

// Repository interfaces and implementations
export type { ITemplateRepository } from './domain/repositories/ITemplateRepository';
export type { IPromptHistoryRepository } from './domain/repositories/IPromptHistoryRepository';
export type { IPromptGenerationService } from './domain/repositories/IAIPromptServices';

export { TemplateRepository } from './infrastructure/repositories/TemplateRepository';
export { PromptHistoryRepository } from './infrastructure/repositories/PromptHistoryRepository';
export { PromptGenerationService } from './infrastructure/services/PromptGenerationService';

// Async state hook
export type { AsyncState, AsyncActions } from './presentation/hooks/useAsyncState';
export { useAsyncState } from './presentation/hooks/useAsyncState';

// Template repository hook
export type { UseTemplateState, UseTemplateActions } from './presentation/hooks/useTemplateRepository';
export { useTemplateRepository } from './presentation/hooks/useTemplateRepository';

// Prompt generation hook
export type { UsePromptGenerationState, UsePromptGenerationActions } from './presentation/hooks/usePromptGeneration';
export { usePromptGeneration } from './presentation/hooks/usePromptGeneration';

export { IDENTITY_SEGMENTS, IDENTITY_NEGATIVE_SEGMENTS, ANIME_STYLE_SEGMENTS, QUALITY_SEGMENTS, QUALITY_NEGATIVE_SEGMENTS, ANTI_REALISM_SEGMENTS, ANATOMY_NEGATIVE_SEGMENTS, PRESET_COLLECTIONS } from './domain/entities/image-prompt-segments';
export type { IdentitySegment, AnimeStyleSegment, QualitySegment } from './domain/entities/image-prompt-segments';

export { ImagePromptBuilder, createAnimeSelfiePrompt, createStyleTransferPrompt } from './infrastructure/services/ImagePromptBuilder';
export type { ImagePromptResult, ImagePromptBuilderOptions, AnimeSelfiePromptResult } from './infrastructure/services/ImagePromptBuilder';

export {
  IDENTITY_PRESERVATION_CORE,
  PHOTOREALISTIC_RENDERING,
  NATURAL_POSE_GUIDELINES,
  MASTER_BASE_PROMPT,
} from './domain/base/constants';
export {
  createPhotorealisticPrompt,
  createTransformationPrompt,
  enhanceExistingPrompt,
} from './domain/base/creators';
export type { CreatePromptOptions } from './domain/base/types';

export {
  MULTI_PERSON_PRESERVATION_RULES,
  createMultiPersonPrompt,
} from './domain/entities/MultiPersonPromptStructure';
export type { MultiPersonPreservationRules } from './domain/entities/MultiPersonPromptStructure';

export {
  buildFacePreservationPrompt,
  buildMinimalFacePreservationPrompt,
} from './infrastructure/builders/face-preservation-builder';
export type { FacePreservationOptions } from './infrastructure/builders/face-preservation-builder';

export {
  buildInteractionStylePrompt,
  buildMinimalInteractionStylePrompt,
  getInteractionRules,
  getInteractionForbidden,
} from './infrastructure/builders/interaction-style-builder';
export type { InteractionStyle, InteractionStyleOptions } from './infrastructure/builders/interaction-style-builder';
