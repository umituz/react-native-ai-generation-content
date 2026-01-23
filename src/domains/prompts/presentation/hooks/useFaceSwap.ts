import { useCallback } from 'react';
import type { FaceSwapConfig, FaceSwapGenerationResult } from '@ai-generation/prompts';
import type { IFaceSwapService } from '@ai-generation/prompts';
import type { IPromptHistoryRepository } from '@ai-generation/prompts';
import { createGeneratedPrompt } from '@ai-generation/prompts';
import { useAsyncState } from './useAsyncState';

export interface UseFaceSwapState {
  generatedPrompt: string | null;
  lastResult: FaceSwapGenerationResult | null;
}

export interface UseFaceSwapActions {
  generateFaceSwapPrompt: (config: FaceSwapConfig) => Promise<void>;
  getAvailableStyles: () => Promise<string[]>;
  clearPrompt: () => void;
  reset: () => void;
}

export const useFaceSwap = (
  faceSwapService: IFaceSwapService,
  historyRepository: IPromptHistoryRepository
): UseFaceSwapState & UseFaceSwapActions => {
  const {
    data: lastResult,
    loading,
    error,
    setError,
    setData: setResult,
    clearError,
  } = useAsyncState<FaceSwapGenerationResult>(null);

  const generateFaceSwapPrompt = useCallback(async (config: FaceSwapConfig): Promise<void> => {
    clearError();

    try {
      const templateResult = await faceSwapService.generateTemplate(config);
      if (!templateResult.success || !templateResult.data) {
        setError(templateResult.success === false && templateResult.error === 'TEMPLATE_NOT_FOUND' ? 'Template not found' : 'Failed to generate template');
        return;
      }

      const promptResult = await faceSwapService.generatePrompt(templateResult.data, config);
      if (!promptResult.success) {
        setError(promptResult.success === false && promptResult.error === 'GENERATION_FAILED' ? 'Failed to generate prompt' : 'Generation failed');
        return;
      }

      const generatedPrompt = createGeneratedPrompt({
        templateId: templateResult.data.id,
        generatedText: promptResult.data,
        variables: config as unknown as Record<string, unknown>,
      });

      await historyRepository.save(generatedPrompt);

      const generationResult: FaceSwapGenerationResult = {
        template: templateResult.data,
        prompt: generatedPrompt,
      };

      setResult(generationResult);
    } catch {
      setError('An unexpected error occurred');
    }
  }, [faceSwapService, historyRepository, setError, setResult, clearError]);

  const getAvailableStyles = useCallback(async (): Promise<string[]> => {
    try {
      return await faceSwapService.getAvailableStyles();
    } catch {
      setError('Failed to load available styles');
      return [];
    }
  }, [faceSwapService, setError]);

  const clearPrompt = useCallback(() => {
    setResult(null);
    clearError();
  }, [setResult, clearError]);

  const reset = useCallback(() => {
    setResult(null);
    clearError();
  }, [setResult, clearError]);

  return {
    generatedPrompt: lastResult?.prompt.generatedText || null,
    lastResult,
    loading,
    error,
    generateFaceSwapPrompt,
    getAvailableStyles,
    clearPrompt,
    reset,
  } as UseFaceSwapState & UseFaceSwapActions;
};