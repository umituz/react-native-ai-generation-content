import { useState, useCallback } from 'react';
import type { 
  FaceSwapConfig
} from '../../domain/entities/FaceSwapConfig';
import type { 
  PhotoRestorationConfig
} from '../../domain/entities/PhotoRestorationConfig';
import type { 
  ImageEnhancementConfig
} from '../../domain/entities/ImageEnhancementConfig';
import type { 
  StyleTransferConfig
} from '../../domain/entities/StyleTransferConfig';
import type { 
  BackgroundRemovalConfig
} from '../../domain/entities/BackgroundRemovalConfig';
import type { 
  TextGenerationConfig
} from '../../domain/entities/TextGenerationConfig';
import type { 
  ColorizationConfig
} from '../../domain/entities/ColorizationConfig';
import type { 
  IFaceSwapService,
  IPhotoRestorationService,
  IImageEnhancementService,
  IStyleTransferService,
  IBackgroundRemovalService,
  ITextGenerationService,
  IColorizationService
} from '../../domain/repositories/IAIPromptServices';
import type { ITemplateRepository } from '../../domain/repositories/ITemplateRepository';
import type { IPromptHistoryRepository } from '../../domain/repositories/IPromptHistoryRepository';
import type { GeneratedPrompt } from '../../domain/entities/GeneratedPrompt';
import { createGeneratedPrompt } from '../../domain/entities/GeneratedPrompt';
import { useAsyncState } from './useAsyncState';

export type AIConfig = 
  | { type: 'face-swap'; config: FaceSwapConfig }
  | { type: 'photo-restoration'; config: PhotoRestorationConfig }
  | { type: 'image-enhancement'; config: ImageEnhancementConfig }
  | { type: 'style-transfer'; config: StyleTransferConfig }
  | { type: 'background-removal'; config: BackgroundRemovalConfig }
  | { type: 'text-generation'; config: TextGenerationConfig }
  | { type: 'colorization'; config: ColorizationConfig };

export interface UseAIServicesState {
  generatedPrompt: GeneratedPrompt | null;
  processing: boolean;
  currentService: string | null;
}

export interface UseAIServicesActions {
  processRequest: (aiConfig: AIConfig) => Promise<void>;
  getAvailableStyles: (serviceType: string) => Promise<string[]>;
  clearPrompt: () => void;
  reset: () => void;
}

export const useAIServices = (
  services: {
    faceSwap: IFaceSwapService;
    photoRestoration: IPhotoRestorationService;
    imageEnhancement: IImageEnhancementService;
    styleTransfer: IStyleTransferService;
    backgroundRemoval: IBackgroundRemovalService;
    textGeneration: ITextGenerationService;
    colorization: IColorizationService;
  },
  repositories: {
    template: ITemplateRepository;
    history: IPromptHistoryRepository;
  }
): UseAIServicesState & UseAIServicesActions => {
  const {
    data: generatedPrompt,
    loading: processing,
    error,
    setError,
    setData: setGeneratedPrompt,
    clearError,
  } = useAsyncState<GeneratedPrompt>(null);

  const [currentService, setCurrentService] = useState<string | null>(null);

  const processRequest = useCallback(async (aiConfig: AIConfig): Promise<void> => {
    clearError();
    setCurrentService(aiConfig.type);
    
    try {
      let templateResult;
      let promptResult;
      
      switch (aiConfig.type) {
        case 'face-swap':
          templateResult = await services.faceSwap.generateTemplate(aiConfig.config);
          if (templateResult.success && templateResult.data) {
            promptResult = await services.faceSwap.generatePrompt(templateResult.data, aiConfig.config);
          }
          break;
          
        case 'photo-restoration':
          templateResult = await services.photoRestoration.generateTemplate(aiConfig.config);
          if (templateResult.success && templateResult.data) {
            promptResult = await services.photoRestoration.generatePrompt(templateResult.data, aiConfig.config);
          }
          break;
          
        case 'image-enhancement':
          templateResult = await services.imageEnhancement.generateTemplate(aiConfig.config);
          if (templateResult.success && templateResult.data) {
            promptResult = await services.imageEnhancement.generatePrompt(templateResult.data, aiConfig.config);
          }
          break;
          
        case 'style-transfer':
          templateResult = await services.styleTransfer.generateTemplate(aiConfig.config);
          if (templateResult.success && templateResult.data) {
            promptResult = await services.styleTransfer.generatePrompt(templateResult.data, aiConfig.config);
          }
          break;
          
        case 'background-removal':
          templateResult = await services.backgroundRemoval.generateTemplate(aiConfig.config);
          if (templateResult.success && templateResult.data) {
            promptResult = await services.backgroundRemoval.generatePrompt(templateResult.data, aiConfig.config);
          }
          break;
          
        case 'text-generation':
          templateResult = await services.textGeneration.generateTemplate(aiConfig.config);
          if (templateResult.success && templateResult.data) {
            promptResult = await services.textGeneration.generatePrompt(templateResult.data, aiConfig.config);
          }
          break;
          
        case 'colorization':
          templateResult = await services.colorization.generateTemplate(aiConfig.config);
          if (templateResult.success && templateResult.data) {
            promptResult = await services.colorization.generatePrompt(templateResult.data, aiConfig.config);
          }
          break;
          
        default:
          setError('Unknown AI service type');
          return;
      }
      
      if (!templateResult?.success || !templateResult.data) {
        setError('Failed to generate template');
        return;
      }
      
      if (!promptResult?.success) {
        setError('Failed to generate prompt');
        return;
      }
      
      const newPrompt = createGeneratedPrompt({
        templateId: templateResult.data.id,
        generatedText: promptResult.data,
        variables: aiConfig.config as unknown as Record<string, unknown>,
      });
      
      await repositories.history.save(newPrompt);
      setGeneratedPrompt(newPrompt);
      
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setCurrentService(null);
    }
  }, [services, repositories, setError, setGeneratedPrompt, clearError]);

  const getAvailableStyles = useCallback(async (serviceType: string): Promise<string[]> => {
    try {
      switch (serviceType) {
        case 'face-swap':
          return await services.faceSwap.getAvailableStyles();
        case 'style-transfer':
          return await services.styleTransfer.getAvailableStyles();
        default:
          return [];
      }
    } catch (error) {
      setError('Failed to load available styles');
      return [];
    }
  }, [services, setError]);

  const clearPrompt = useCallback(() => {
    setGeneratedPrompt(null);
    setCurrentService(null);
    clearError();
  }, [setGeneratedPrompt, clearError]);

  const reset = useCallback(() => {
    setGeneratedPrompt(null);
    setCurrentService(null);
    clearError();
  }, [setGeneratedPrompt, clearError]);

  return {
    generatedPrompt,
    processing,
    currentService,
    error,
    processRequest,
    getAvailableStyles,
    clearPrompt,
    reset,
  } as UseAIServicesState & UseAIServicesActions;
};