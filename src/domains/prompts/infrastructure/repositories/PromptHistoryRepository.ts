import type { IPromptHistoryRepository } from '@ai-generation/prompts';
import type { GeneratedPrompt } from '@ai-generation/prompts';
import type { AIPromptResult } from '@ai-generation/prompts';

export class PromptHistoryRepository implements IPromptHistoryRepository {
  private storage: GeneratedPrompt[] = [];
  private readonly maxStorageSize = 100;

  save(prompt: GeneratedPrompt): Promise<AIPromptResult<void>> {
    try {
      this.storage.push(prompt);
      this.trimStorage();
      return Promise.resolve({ success: true, data: undefined });
    } catch {
      return Promise.resolve({
        success: false,
        error: 'STORAGE_ERROR',
        message: 'Failed to save prompt to history'
      });
    }
  }

  findRecent(limit: number = 50): Promise<AIPromptResult<GeneratedPrompt[]>> {
    try {
      const prompts = this.storage.slice(-limit);
      return Promise.resolve({ success: true, data: prompts });
    } catch {
      return Promise.resolve({
        success: false,
        error: 'STORAGE_ERROR',
        message: 'Failed to retrieve recent prompts'
      });
    }
  }

  findByTemplateId(
    templateId: string,
    limit: number = 20
  ): Promise<AIPromptResult<GeneratedPrompt[]>> {
    try {
      const prompts = this.storage
        .filter(prompt => prompt.templateId === templateId)
        .slice(-limit);
      return Promise.resolve({ success: true, data: prompts });
    } catch {
      return Promise.resolve({
        success: false,
        error: 'STORAGE_ERROR',
        message: 'Failed to retrieve prompts by template ID'
      });
    }
  }

  delete(id: string): Promise<AIPromptResult<void>> {
    try {
      this.storage = this.storage.filter(prompt => prompt.id !== id);
      return Promise.resolve({ success: true, data: undefined });
    } catch {
      return Promise.resolve({
        success: false,
        error: 'STORAGE_ERROR',
        message: 'Failed to delete prompt'
      });
    }
  }

  clear(): Promise<AIPromptResult<void>> {
    try {
      this.storage = [];
      return Promise.resolve({ success: true, data: undefined });
    } catch {
      return Promise.resolve({
        success: false,
        error: 'STORAGE_ERROR',
        message: 'Failed to clear prompt history'
      });
    }
  }

  private trimStorage(): void {
    if (this.storage.length > this.maxStorageSize) {
      this.storage = this.storage.slice(-this.maxStorageSize);
    }
  }
}