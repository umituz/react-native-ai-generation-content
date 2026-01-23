import { useCallback } from 'react';
import type {PhotoRestorationConfig} from '../../domain/entities/PhotoRestorationConfig';
import type {IPhotoRestorationService} from '../../domain/repositories/IAIPromptServices';
import type {AIPromptTemplate} from '../../domain/entities/AIPromptTemplate';
import type {IPromptHistoryRepository} from '../../domain/repositories/IPromptHistoryRepository';
import {createGeneratedPrompt} from '../../domain/entities/GeneratedPrompt';
import { useAsyncState } from './useAsyncState';

export interface PhotoRestorationResult {
  template: AIPromptTemplate;
  config: PhotoRestorationConfig;
  estimatedQuality: number;
}

export interface UsePhotoRestorationState {
  generatedPrompt: string | null;
  lastResult: PhotoRestorationResult | null;
  estimatedQuality: number | null;
}

export interface UsePhotoRestorationActions {
  restorePhoto: (config: PhotoRestorationConfig) => Promise<void>;
  estimateQuality: (config: PhotoRestorationConfig) => number;
  clearPrompt: () => void;
  reset: () => void;
}

export const usePhotoRestoration = (
  service: IPhotoRestorationService,
  historyRepository: IPromptHistoryRepository
): UsePhotoRestorationState & UsePhotoRestorationActions => {
  const {
    data: lastResult,
    setData: setResult,
    clearError,
    setError,
  } = useAsyncState<PhotoRestorationResult>(null);

  const restorePhoto = useCallback(async (config: PhotoRestorationConfig): Promise<void> => {
    clearError();

    try {
      const templateResult = await service.generateTemplate(config);
      if (!templateResult.success || !templateResult.data) {
        setError('Failed to generate template');
        return;
      }

      const promptResult = await service.generatePrompt(templateResult.data, config);
      if (!promptResult.success) {
        setError('Failed to generate restoration prompt');
        return;
      }

      const generatedPrompt = createGeneratedPrompt({
        templateId: templateResult.data.id,
        generatedText: promptResult.data,
        variables: {} as Record<string, unknown>,
      });

      await historyRepository.save(generatedPrompt);

      const restorationResult: PhotoRestorationResult = {
        template: templateResult.data,
        config,
        estimatedQuality: service.estimateQuality(config),
      };

      setResult(restorationResult);
    } catch {
      setError('An unexpected error occurred during photo restoration');
    }
  }, [service, historyRepository, setError, setResult, clearError]);

  const estimateQuality = useCallback((config: PhotoRestorationConfig): number => {
    return service.estimateQuality(config);
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
    estimatedQuality: lastResult?.estimatedQuality || null,
    restorePhoto,
    estimateQuality,
    clearPrompt,
    reset,
  };
};