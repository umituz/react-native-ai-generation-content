import { useState, useCallback } from 'react';
import type { AIPromptTemplate } from '@ai-generation/prompts';
import type { AIPromptCategory } from '@ai-generation/prompts';
import type { ITemplateRepository } from '@ai-generation/prompts';
import { useAsyncState } from './useAsyncState';

export interface UseTemplateState {
  templates: AIPromptTemplate[];
  currentTemplate: AIPromptTemplate | null;
}

export interface UseTemplateActions {
  loadAllTemplates: () => Promise<void>;
  loadTemplateById: (id: string) => Promise<AIPromptTemplate | null>;
  loadTemplatesByCategory: (category: AIPromptCategory) => Promise<AIPromptTemplate[]>;
  saveTemplate: (template: AIPromptTemplate) => Promise<void>;
  deleteTemplate: (id: string) => Promise<void>;
  setCurrentTemplate: (template: AIPromptTemplate | null) => void;
}

export const useTemplateRepository = (
  repository: ITemplateRepository
): UseTemplateState & UseTemplateActions => {
  const {
    data: templates,
    setData: setTemplates,
    loading,
    error,
    setError,
    clearError,
  } = useAsyncState<AIPromptTemplate[]>([]);

  const [currentTemplate, setCurrentTemplate] = useState<AIPromptTemplate | null>(null);

  const loadAllTemplates = useCallback(async (): Promise<void> => {
    clearError();
    const result = await repository.findAll();

    if (result.success) {
      setTemplates(result.data);
    } else {
      setError(('message' in result && result.message) || 'Failed to load templates');
    }
  }, [repository, setTemplates, setError, clearError]);

  const loadTemplateById = useCallback(async (id: string): Promise<AIPromptTemplate | null> => {
    clearError();
    const result = await repository.findById(id);

    if (result.success) {
      setCurrentTemplate(result.data);
      return result.data;
    } else {
      setError(('message' in result && result.message) || 'Failed to load template');
      return null;
    }
  }, [repository, setError, clearError]);

  const loadTemplatesByCategory = useCallback(
    async (category: AIPromptCategory): Promise<AIPromptTemplate[]> => {
      clearError();
      const result = await repository.findByCategory(category);

      if (result.success) {
        setTemplates(result.data);
        return result.data;
      } else {
        setError(('message' in result && result.message) || 'Failed to load templates by category');
        return [];
      }
    },
    [repository, setTemplates, setError, clearError]
  );

  const saveTemplate = useCallback(async (template: AIPromptTemplate): Promise<void> => {
    clearError();
    const result = await repository.save(template);

    if (result.success) {
      void loadAllTemplates();
    } else {
      setError(('message' in result && result.message) || 'Failed to save template');
    }
  }, [repository, loadAllTemplates, setError, clearError]);

  const deleteTemplate = useCallback(async (id: string): Promise<void> => {
    clearError();
    const result = await repository.delete(id);

    if (result.success) {
      if (currentTemplate?.id === id) {
        setCurrentTemplate(null);
      }
      void loadAllTemplates();
    } else {
      setError(('message' in result && result.message) || 'Failed to delete template');
    }
  }, [repository, currentTemplate, loadAllTemplates, setError, clearError]);

  return {
    templates: templates || [],
    currentTemplate,
    loading,
    error,
    loadAllTemplates,
    loadTemplateById,
    loadTemplatesByCategory,
    saveTemplate,
    deleteTemplate,
    setCurrentTemplate,
    clearError,
  } as UseTemplateState & UseTemplateActions;
};