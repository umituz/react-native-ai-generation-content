import { useCallback } from 'react';
import type { ImageEnhancementConfig, EnhancementAdjustments } from '../../domain/entities/ImageEnhancementConfig';
import type { AIPromptTemplate } from '../../domain/entities/AIPromptTemplate';
import type { IImageEnhancementService } from '../../domain/repositories/IAIPromptServices';
import type { IPromptHistoryRepository } from '../../domain/repositories/IPromptHistoryRepository';
import { createGeneratedPrompt } from '../../domain/entities/GeneratedPrompt';
import { useAsyncState } from './useAsyncState';

export interface ImageEnhancementResult {
  template: AIPromptTemplate;
  config: ImageEnhancementConfig;
  adjustments: EnhancementAdjustments;
}

export interface UseImageEnhancementState {
  generatedPrompt: string | null;
  lastResult: ImageEnhancementResult | null;
  adjustments: EnhancementAdjustments | null;
}

export interface UseImageEnhancementActions {
  enhanceImage: (config: ImageEnhancementConfig) => Promise<void>;
  calculateAdjustments: (config: ImageEnhancementConfig) => EnhancementAdjustments;
  clearPrompt: () => void;
  reset: () => void;
}

export const useImageEnhancement = (
  service: IImageEnhancementService,
  historyRepository: IPromptHistoryRepository
): UseImageEnhancementState & UseImageEnhancementActions => {
  const {
    data: lastResult,
    setData: setResult,
    clearError,
    setError,
  } = useAsyncState<ImageEnhancementResult>(null);

  const enhanceImage = useCallback(async (config: ImageEnhancementConfig): Promise<void> => {
    clearError();

    try {
      const templateResult = await service.generateTemplate(config);
      if (!templateResult.success || !templateResult.data) {
        setError('Failed to generate template');
        return;
      }

      const promptResult = await service.generatePrompt(templateResult.data, config);
      if (!promptResult.success) {
        setError('Failed to generate enhancement prompt');
        return;
      }

      const generatedPrompt = createGeneratedPrompt({
        templateId: templateResult.data.id,
        generatedText: promptResult.data,
        variables: {} as Record<string, unknown>,
      });

      await historyRepository.save(generatedPrompt);

      const enhancementResult: ImageEnhancementResult = {
        template: templateResult.data,
        config,
        adjustments: service.calculateAdjustments(config),
      };

      setResult(enhancementResult);
    } catch {
      setError('An unexpected error occurred during image enhancement');
    }
  }, [service, historyRepository, setError, setResult, clearError]);

  const calculateAdjustments = useCallback((config: ImageEnhancementConfig): EnhancementAdjustments => {
    return service.calculateAdjustments(config);
  }, [service]);

  const clearPrompt = useCallback(() => {
    setResult(null);
    clearError();
  }, [setResult, clearError]);

  const reset = useCallback(() => {
    setResult(null);
    clearError();
  }, [setResult, clearError]);

  return {
    generatedPrompt: null,
    lastResult,
    adjustments: lastResult?.adjustments || null,
    enhanceImage,
    calculateAdjustments,
    clearPrompt,
    reset,
  };
};