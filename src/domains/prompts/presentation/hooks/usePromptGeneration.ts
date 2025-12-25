import { useState, useCallback } from 'react';
import type { IPromptGenerationService } from '../../domain/repositories/IAIPromptServices';
import type { ITemplateRepository } from '../../domain/repositories/ITemplateRepository';
import type { IPromptHistoryRepository } from '../../domain/repositories/IPromptHistoryRepository';
import type { GeneratedPrompt } from '../../domain/entities/GeneratedPrompt';
import { createGeneratedPrompt } from '../../domain/entities/GeneratedPrompt';
import { useAsyncState } from './useAsyncState';

export interface UsePromptGenerationState {
  generatedPrompt: GeneratedPrompt | null;
  history: GeneratedPrompt[];
}

export interface UsePromptGenerationActions {
  generatePrompt: (
    templateId: string,
    variables: Record<string, unknown>
  ) => Promise<void>;
  loadHistory: (limit?: number) => Promise<void>;
  clearHistory: () => Promise<void>;
  saveToHistory: (prompt: GeneratedPrompt) => Promise<void>;
  clearPrompt: () => void;
  reset: () => void;
}

export const usePromptGeneration = (
  templateRepository: ITemplateRepository,
  promptService: IPromptGenerationService,
  historyRepository: IPromptHistoryRepository
): UsePromptGenerationState & UsePromptGenerationActions => {
  const {
    data: generatedPrompt,
    loading,
    error,
    setError,
    setData: setGeneratedPrompt,
    clearError,
  } = useAsyncState<GeneratedPrompt>(null);

  const [history, setHistory] = useState<GeneratedPrompt[]>([]);

  const generatePrompt = useCallback(
    async (templateId: string, variables: Record<string, unknown>): Promise<void> => {
      clearError();

      try {
        const templateResult = await templateRepository.findById(templateId);
        if (!templateResult.success || !templateResult.data) {
          setError('Template not found');
          return;
        }

        const promptResult = await promptService.generateFromTemplate(
          templateResult.data,
          variables
        );

        if (!promptResult.success) {
          setError(('message' in promptResult && promptResult.message) || 'Failed to generate prompt');
          return;
        }

        const newPrompt = createGeneratedPrompt({
          templateId,
          generatedText: promptResult.data,
          variables,
        });

        await historyRepository.save(newPrompt);
        setGeneratedPrompt(newPrompt);

        void loadHistory(50);
      } catch (error) {
        setError('An unexpected error occurred');
      }
    },
    [templateRepository, promptService, historyRepository, setGeneratedPrompt, setError, clearError]
  );

  const loadHistory = useCallback(
    async (limit: number = 50): Promise<void> => {
      clearError();
      try {
        const result = await historyRepository.findRecent(limit);
        if (result.success) {
          setHistory(result.data);
        } else {
          setError(('message' in result && result.message) || 'Failed to load history');
        }
      } catch (error) {
        setError('Failed to load history');
      }
    },
    [historyRepository, setHistory, setError, clearError]
  );

  const clearHistory = useCallback(async (): Promise<void> => {
    clearError();
    try {
      await historyRepository.clear();
      setHistory([]);
    } catch (error) {
      setError('Failed to clear history');
    }
  }, [historyRepository, setHistory, setError, clearError]);

  const saveToHistory = useCallback(
    async (prompt: GeneratedPrompt): Promise<void> => {
      clearError();
      try {
        await historyRepository.save(prompt);
        void loadHistory(50);
      } catch (error) {
        setError('Failed to save to history');
      }
    },
    [historyRepository, loadHistory, setError, clearError]
  );

  const clearPrompt = useCallback(() => {
    setGeneratedPrompt(null);
    clearError();
  }, [setGeneratedPrompt, clearError]);

  const reset = useCallback(() => {
    setGeneratedPrompt(null);
    setHistory([]);
    clearError();
  }, [setGeneratedPrompt, setHistory, clearError]);

  return {
    generatedPrompt,
    history,
    loading,
    error,
    generatePrompt,
    loadHistory,
    clearHistory,
    saveToHistory,
    clearPrompt,
    reset,
  } as UsePromptGenerationState & UsePromptGenerationActions;
};