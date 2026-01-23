/**
 * AI Service Processor
 * Handles processing of different AI service types
 */

import type {FaceSwapConfig} from '../../domain/entities/FaceSwapConfig';
import type {PhotoRestorationConfig} from '../../domain/entities/PhotoRestorationConfig';
import type {ImageEnhancementConfig} from '../../domain/entities/ImageEnhancementConfig';
import type {StyleTransferConfig} from '../../domain/entities/StyleTransferConfig';
import type {BackgroundRemovalConfig} from '../../domain/entities/BackgroundRemovalConfig';
import type {TextGenerationConfig} from '../../domain/entities/TextGenerationConfig';
import type {ColorizationConfig} from '../../domain/entities/ColorizationConfig';
import type {
    IFaceSwapService,
    IPhotoRestorationService,
    IImageEnhancementService,
    IStyleTransferService,
    IBackgroundRemovalService,
    ITextGenerationService,
    IColorizationService,
} from '../../domain/repositories/IAIPromptServices';
import type {AIPromptResult} from '../../domain/entities/types';
import type {AIPromptTemplate} from '../../domain/entities/AIPromptTemplate';

export type AIConfig =
    | { type: 'face-swap'; config: FaceSwapConfig }
    | { type: 'photo-restoration'; config: PhotoRestorationConfig }
    | { type: 'image-enhancement'; config: ImageEnhancementConfig }
    | { type: 'style-transfer'; config: StyleTransferConfig }
    | { type: 'background-removal'; config: BackgroundRemovalConfig }
    | { type: 'text-generation'; config: TextGenerationConfig }
    | { type: 'colorization'; config: ColorizationConfig };

export interface AIServices {
    faceSwap: IFaceSwapService;
    photoRestoration: IPhotoRestorationService;
    imageEnhancement: IImageEnhancementService;
    styleTransfer: IStyleTransferService;
    backgroundRemoval: IBackgroundRemovalService;
    textGeneration: ITextGenerationService;
    colorization: IColorizationService;
}

export interface ProcessResult {
    template: AIPromptTemplate;
    prompt: string;
    config: Record<string, unknown>;
}

export class AIServiceProcessor {
    constructor(private services: AIServices) { }

    async process(aiConfig: AIConfig): Promise<ProcessResult> {
        const { templateResult, promptResult } = await this.executeService(aiConfig);

        if (!templateResult?.success || !templateResult.data) {
            throw new Error('Failed to generate template');
        }

        if (!promptResult?.success || !promptResult.data) {
            throw new Error('Failed to generate prompt');
        }

        return {
            template: templateResult.data,
            prompt: promptResult.data,
            config: aiConfig.config as unknown as Record<string, unknown>,
        };
    }

    async getAvailableStyles(serviceType: string): Promise<string[]> {
        switch (serviceType) {
            case 'face-swap':
                return await this.services.faceSwap.getAvailableStyles();
            case 'style-transfer':
                return await this.services.styleTransfer.getAvailableStyles();
            default:
                return [];
        }
    }

    private async executeService(aiConfig: AIConfig): Promise<{
        templateResult: AIPromptResult<AIPromptTemplate> | undefined;
        promptResult: AIPromptResult<string> | undefined;
    }> {
        let templateResult: AIPromptResult<AIPromptTemplate> | undefined;
        let promptResult: AIPromptResult<string> | undefined;

        switch (aiConfig.type) {
            case 'face-swap':
                templateResult = await this.services.faceSwap.generateTemplate(aiConfig.config);
                if (templateResult.success && templateResult.data) {
                    promptResult = await this.services.faceSwap.generatePrompt(templateResult.data, aiConfig.config);
                }
                break;

            case 'photo-restoration':
                templateResult = await this.services.photoRestoration.generateTemplate(aiConfig.config);
                if (templateResult.success && templateResult.data) {
                    promptResult = await this.services.photoRestoration.generatePrompt(templateResult.data, aiConfig.config);
                }
                break;

            case 'image-enhancement':
                templateResult = await this.services.imageEnhancement.generateTemplate(aiConfig.config);
                if (templateResult.success && templateResult.data) {
                    promptResult = await this.services.imageEnhancement.generatePrompt(templateResult.data, aiConfig.config);
                }
                break;

            case 'style-transfer':
                templateResult = await this.services.styleTransfer.generateTemplate(aiConfig.config);
                if (templateResult.success && templateResult.data) {
                    promptResult = await this.services.styleTransfer.generatePrompt(templateResult.data, aiConfig.config);
                }
                break;

            case 'background-removal':
                templateResult = await this.services.backgroundRemoval.generateTemplate(aiConfig.config);
                if (templateResult.success && templateResult.data) {
                    promptResult = await this.services.backgroundRemoval.generatePrompt(templateResult.data, aiConfig.config);
                }
                break;

            case 'text-generation':
                templateResult = await this.services.textGeneration.generateTemplate(aiConfig.config);
                if (templateResult.success && templateResult.data) {
                    promptResult = await this.services.textGeneration.generatePrompt(templateResult.data, aiConfig.config);
                }
                break;

            case 'colorization':
                templateResult = await this.services.colorization.generateTemplate(aiConfig.config);
                if (templateResult.success && templateResult.data) {
                    promptResult = await this.services.colorization.generatePrompt(templateResult.data, aiConfig.config);
                }
                break;
        }

        return { templateResult, promptResult };
    }
}
