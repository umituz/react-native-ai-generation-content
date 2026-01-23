import type { AIPromptTemplate } from '../entities/AIPromptTemplate';
import type { AIPromptResult } from '../entities/types';
import type { FaceSwapConfig } from '../entities/FaceSwapConfig';
import type {
  PhotoRestorationConfig
} from '../entities/PhotoRestorationConfig';
import type {
  ImageEnhancementConfig,
  EnhancementAdjustments
} from '../entities/ImageEnhancementConfig';
import type {
  StyleTransferConfig
} from '../entities/StyleTransferConfig';
import type {
  BackgroundRemovalConfig
} from '../entities/BackgroundRemovalConfig';
import type {
  TextGenerationConfig
} from '../entities/TextGenerationConfig';
import type {
  ColorizationConfig
} from '../entities/ColorizationConfig';
import type {
  FuturePredictionConfig,
  FuturePredictionResult,
} from '../entities/FuturePredictionConfig';

export interface IFaceSwapService {
  generateTemplate(config: FaceSwapConfig): Promise<AIPromptResult<AIPromptTemplate>>;
  generatePrompt(template: AIPromptTemplate, config: FaceSwapConfig): Promise<AIPromptResult<string>>;
  validateConfig(config: FaceSwapConfig): boolean;
  getAvailableStyles(): Promise<string[]>;
}

export interface IPhotoRestorationService {
  generateTemplate(config: PhotoRestorationConfig): Promise<AIPromptResult<AIPromptTemplate>>;
  generatePrompt(template: AIPromptTemplate, config: PhotoRestorationConfig): Promise<AIPromptResult<string>>;
  validateConfig(config: PhotoRestorationConfig): boolean;
  estimateQuality(config: PhotoRestorationConfig): number;
}

export interface IImageEnhancementService {
  generateTemplate(config: ImageEnhancementConfig): Promise<AIPromptResult<AIPromptTemplate>>;
  generatePrompt(template: AIPromptTemplate, config: ImageEnhancementConfig): Promise<AIPromptResult<string>>;
  validateConfig(config: ImageEnhancementConfig): boolean;
  calculateAdjustments(config: ImageEnhancementConfig): EnhancementAdjustments;
}

export interface IStyleTransferService {
  generateTemplate(config: StyleTransferConfig): Promise<AIPromptResult<AIPromptTemplate>>;
  generatePrompt(template: AIPromptTemplate, config: StyleTransferConfig): Promise<AIPromptResult<string>>;
  validateConfig(config: StyleTransferConfig): boolean;
  getAvailableStyles(): Promise<string[]>;
}

export interface IBackgroundRemovalService {
  generateTemplate(config: BackgroundRemovalConfig): Promise<AIPromptResult<AIPromptTemplate>>;
  generatePrompt(template: AIPromptTemplate, config: BackgroundRemovalConfig): Promise<AIPromptResult<string>>;
  validateConfig(config: BackgroundRemovalConfig): boolean;
  estimateProcessingTime(config: BackgroundRemovalConfig): number;
}

export interface ITextGenerationService {
  generateTemplate(config: TextGenerationConfig): Promise<AIPromptResult<AIPromptTemplate>>;
  generatePrompt(template: AIPromptTemplate, config: TextGenerationConfig): Promise<AIPromptResult<string>>;
  validateConfig(config: TextGenerationConfig): boolean;
  estimateTokens(config: TextGenerationConfig): number;
  getGenerationParameters(config: TextGenerationConfig): Record<string, number>;
}

export interface IColorizationService {
  generateTemplate(config: ColorizationConfig): Promise<AIPromptResult<AIPromptTemplate>>;
  generatePrompt(template: AIPromptTemplate, config: ColorizationConfig): Promise<AIPromptResult<string>>;
  validateConfig(config: ColorizationConfig): boolean;
  getColorPalette(config: ColorizationConfig): string[];
  getQualityScore(config: ColorizationConfig): number;
}

export interface IPromptGenerationService {
  generateFromTemplate(
    template: AIPromptTemplate,
    variables: Record<string, unknown>
  ): Promise<AIPromptResult<string>>;
  validateVariables(
    template: AIPromptTemplate,
    variables: Record<string, unknown>
  ): AIPromptResult<void>;
  replaceTemplateVariables(
    template: string,
    variables: Record<string, unknown>
  ): string;
}

export interface IFuturePredictionService {
  generateTemplate(config: FuturePredictionConfig): Promise<AIPromptResult<AIPromptTemplate>>;
  generatePrompts(config: FuturePredictionConfig): Promise<AIPromptResult<FuturePredictionResult>>;
  validateConfig(config: FuturePredictionConfig): boolean;
  buildImagePrompt(config: FuturePredictionConfig): string;
  buildStoryPrompt(config: FuturePredictionConfig): string;
}
