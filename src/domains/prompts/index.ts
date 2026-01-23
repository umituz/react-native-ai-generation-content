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

export type { FaceSwapConfig, FaceSwapTemplate, FaceSwapTemplateVariable, FaceSwapSafety, FaceSwapGenerationResult } from './domain/entities/FaceSwapConfig';
export { validateFaceSwapConfig, createFaceSwapVariable } from './domain/entities/FaceSwapConfig';

export type { PhotoRestorationConfig, PhotoRestorationTemplate, PhotoRestorationVariable, PhotoRestorationQuality, PhotoRestorationResult } from './domain/entities/PhotoRestorationConfig';
export { validatePhotoRestorationConfig, createPhotoRestorationVariable, getQualityLevel } from './domain/entities/PhotoRestorationConfig';

export type { ImageEnhancementConfig, ImageEnhancementTemplate, ImageEnhancementVariable, EnhancementSettings, ImageEnhancementResult, EnhancementAdjustments } from './domain/entities/ImageEnhancementConfig';
export { validateImageEnhancementConfig, createImageEnhancementVariable, calculateAdjustments } from './domain/entities/ImageEnhancementConfig';

export type { StyleTransferConfig, StyleTransferTemplate, StyleTransferVariable, StyleTransferSettings, StyleTransferResult } from './domain/entities/StyleTransferConfig';
export { validateStyleTransferConfig, createStyleTransferVariable, getStyleStrengthValue, getArtisticModeDescription } from './domain/entities/StyleTransferConfig';

export type { BackgroundRemovalConfig, BackgroundRemovalTemplate, BackgroundRemovalVariable, BackgroundRemovalSettings, BackgroundRemovalResult, DetectedObject } from './domain/entities/BackgroundRemovalConfig';
export { validateBackgroundRemovalConfig, createBackgroundRemovalVariable, getProcessingTime, getQualityScore } from './domain/entities/BackgroundRemovalConfig';

export type { TextGenerationConfig, TextGenerationTemplate, TextGenerationVariable, TextGenerationSettings, TextGenerationResult } from './domain/entities/TextGenerationConfig';
export { validateTextGenerationConfig, createTextGenerationVariable, getTokenCount, getTemperature, getTopP } from './domain/entities/TextGenerationConfig';

export type { ColorizationConfig, ColorizationTemplate, ColorizationVariable, ColorizationSettings, ColorizationResult } from './domain/entities/ColorizationConfig';
export { validateColorizationConfig, createColorizationVariable, getColorizationQuality, getEraDescription, getSuggestedColorPalette } from './domain/entities/ColorizationConfig';

export type { FuturePredictionConfig, FuturePredictionTemplate, FuturePredictionVariable, FuturePredictionSettings, FuturePredictionResult, FuturePredictionMetadata, FuturePredictionOutputType } from './domain/entities/FuturePredictionConfig';
export { validateFuturePredictionConfig, createFuturePredictionVariable, getFutureYear } from './domain/entities/FuturePredictionConfig';
export { IDENTITY_INSTRUCTION, createScenarioPrompt } from './infrastructure/services/FuturePredictionService';

export type { ITemplateRepository } from './domain/repositories/ITemplateRepository';
export type { IPromptHistoryRepository } from './domain/repositories/IPromptHistoryRepository';
export type { IFaceSwapService, IPhotoRestorationService, IImageEnhancementService, IStyleTransferService, IBackgroundRemovalService, ITextGenerationService, IColorizationService, IPromptGenerationService, IFuturePredictionService } from './domain/repositories/IAIPromptServices';

export { TemplateRepository } from './infrastructure/repositories/TemplateRepository';
export { PromptHistoryRepository } from './infrastructure/repositories/PromptHistoryRepository';

export { PromptGenerationService } from './infrastructure/services/PromptGenerationService';
export { FaceSwapService } from './infrastructure/services/FaceSwapService';
export { PhotoRestorationService } from './infrastructure/services/PhotoRestorationService';
export { ImageEnhancementService } from './infrastructure/services/ImageEnhancementService';
export { StyleTransferService } from './infrastructure/services/StyleTransferService';
export { BackgroundRemovalService } from './infrastructure/services/BackgroundRemovalService';
export { TextGenerationService } from './infrastructure/services/TextGenerationService';
export { ColorizationService } from './infrastructure/services/ColorizationService';
export { FuturePredictionService } from './infrastructure/services/FuturePredictionService';

export type { AsyncState, AsyncActions } from './presentation/hooks/useAsyncState';
export { useAsyncState } from './presentation/hooks/useAsyncState';

export type { UseTemplateState, UseTemplateActions } from './presentation/hooks/useTemplateRepository';
export { useTemplateRepository } from './presentation/hooks/useTemplateRepository';

export type { UseFaceSwapState, UseFaceSwapActions } from './presentation/hooks/useFaceSwap';
export { useFaceSwap } from './presentation/hooks/useFaceSwap';

export type { UsePhotoRestorationState, UsePhotoRestorationActions } from './presentation/hooks/usePhotoRestoration';
export { usePhotoRestoration } from './presentation/hooks/usePhotoRestoration';

export type { UseImageEnhancementState, UseImageEnhancementActions } from './presentation/hooks/useImageEnhancement';
export { useImageEnhancement } from './presentation/hooks/useImageEnhancement';

export type { UseStyleTransferState, UseStyleTransferActions } from './presentation/hooks/useStyleTransfer';
export { useStyleTransfer } from './presentation/hooks/useStyleTransfer';

export type { UseAIServicesState, UseAIServicesActions } from './presentation/hooks/useAIServices';
export { useAIServices } from './presentation/hooks/useAIServices';

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
  createPhotorealisticPrompt,
  createTransformationPrompt,
  enhanceExistingPrompt,
} from './domain/entities/BasePromptStructure';
export type { CreatePromptOptions } from './domain/entities/BasePromptStructure';

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

export { AIServiceProcessor } from './infrastructure/services/AIServiceProcessor';
export type { AIConfig, AIServices, ProcessResult } from './infrastructure/services/AIServiceProcessor';
