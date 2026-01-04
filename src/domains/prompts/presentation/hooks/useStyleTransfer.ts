import { useState, useCallback, useEffect } from 'react';
import type { StyleTransferConfig } from '../../domain/entities/StyleTransferConfig';
import type { AIPromptTemplate } from '../../domain/entities/AIPromptTemplate';
import type { IStyleTransferService } from '../../domain/repositories/IAIPromptServices';
import { StyleTransferService } from '../../infrastructure/services/StyleTransferService';
import type { IPromptHistoryRepository } from '../../domain/repositories/IPromptHistoryRepository';
import { createGeneratedPrompt } from '../../domain/entities/GeneratedPrompt';
import { useAsyncState } from './useAsyncState';

export interface StyleTransferResult {
  template: AIPromptTemplate;
  config: StyleTransferConfig;
  appliedStyle: string;
  expectedQuality: number;
}

export interface UseStyleTransferState {
  generatedPrompt: string | null;
  lastResult: StyleTransferResult | null;
  availableStyles: string[];
}

export interface UseStyleTransferActions {
  transferStyle: (config: StyleTransferConfig) => Promise<void>;
  getAvailableStyles: () => Promise<string[]>;
  registerStyle: (style: string) => void;
  clearPrompt: () => void;
  reset: () => void;
}

export const useStyleTransfer = (
  service: IStyleTransferService,
  historyRepository: IPromptHistoryRepository
): UseStyleTransferState & UseStyleTransferActions => {
  const {
    data: lastResult,
    setData: setResult,
    clearError,
    setError,
  } = useAsyncState<StyleTransferResult>(null);

  const [availableStyles, setAvailableStyles] = useState<string[]>([]);

  const transferStyle = useCallback(async (config: StyleTransferConfig): Promise<void> => {
    clearError();

    try {
      const templateResult = await service.generateTemplate(config);
      if (!templateResult.success || !templateResult.data) {
        setError('Failed to generate template');
        return;
      }

      const promptResult = await service.generatePrompt(templateResult.data, config);
      if (!promptResult.success) {
        setError('Failed to generate style transfer prompt');
        return;
      }

      const generatedPrompt = createGeneratedPrompt({
        templateId: templateResult.data.id,
        generatedText: promptResult.data,
        variables: {} as Record<string, unknown>,
      });

      await historyRepository.save(generatedPrompt);

      const transferResult: StyleTransferResult = {
        template: templateResult.data,
        config,
        appliedStyle: config.targetStyle,
        expectedQuality: Math.round(config.styleStrength * 100),
      };

      setResult(transferResult);
    } catch {
      setError('An unexpected error occurred during style transfer');
    }
  }, [service, historyRepository, setError, setResult, clearError]);

  const getAvailableStyles = useCallback(async (): Promise<string[]> => {
    try {
      const styles = await service.getAvailableStyles();
      setAvailableStyles(styles);
      return styles;
    } catch {
      setError('Failed to load available styles');
      return [];
    }
  }, [service, setError]);

  const registerStyle = useCallback((style: string): void => {
    if (service instanceof StyleTransferService) {
      service.registerStyle(style);
      setAvailableStyles(prev => [...prev, style]);
    }
  }, [service]);

  const clearPrompt = useCallback(() => {
    setResult(null);
    clearError();
  }, [setResult, clearError]);

  const reset = useCallback(() => {
    setResult(null);
    clearError();
  }, [setResult, clearError]);

  useEffect(() => {
    void getAvailableStyles();
  }, [getAvailableStyles]);

  return {
    generatedPrompt: null,
    lastResult,
    availableStyles,
    transferStyle,
    getAvailableStyles,
    registerStyle,
    clearPrompt,
    reset,
  };
};