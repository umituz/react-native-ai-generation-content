import { useState, useCallback, useMemo } from 'react';
import type { ITemplateRepository } from '@ai-generation/prompts';
import type { IPromptHistoryRepository } from '@ai-generation/prompts';
import type { GeneratedPrompt } from '@ai-generation/prompts';
import { createGeneratedPrompt } from '@ai-generation/prompts';
import { useAsyncState } from './useAsyncState';
import { AIServiceProcessor, type AIConfig, type AIServices } from '@ai-generation/prompts';



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
  services: AIServices,
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

  const processor = useMemo(() => new AIServiceProcessor(services), [services]);

  const processRequest = useCallback(async (aiConfig: AIConfig): Promise<void> => {
    clearError();
    setCurrentService(aiConfig.type);

    try {
      const result = await processor.process(aiConfig);

      const newPrompt = createGeneratedPrompt({
        templateId: result.template.id,
        generatedText: result.prompt,
        variables: result.config,
      });

      await repositories.history.save(newPrompt);
      setGeneratedPrompt(newPrompt);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setCurrentService(null);
    }
  }, [processor, repositories, setError, setGeneratedPrompt, clearError]);

  const getAvailableStyles = useCallback(async (serviceType: string): Promise<string[]> => {
    try {
      return await processor.getAvailableStyles(serviceType);
    } catch {
      setError('Failed to load available styles');
      return [];
    }
  }, [processor, setError]);

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