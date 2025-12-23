import type { IPromptHistoryRepository } from '../../domain/repositories/IPromptHistoryRepository';
import type { GeneratedPrompt } from '../../domain/entities/GeneratedPrompt';
import type { AIPromptResult, AIPromptError } from '../../domain/entities/types';

export class PromptHistoryRepository implements IPromptHistoryRepository {
  private storage: GeneratedPrompt[] = [];
  private readonly maxStorageSize = 100;

  async save(prompt: GeneratedPrompt): Promise<AIPromptResult<void>> {
    try {
      this.storage.push(prompt);
      this.trimStorage();
      return { success: true, data: undefined };
    } catch (error) {
      return { 
        success: false, 
        error: 'STORAGE_ERROR', 
        message: 'Failed to save prompt to history' 
      };
    }
  }

  async findRecent(limit: number = 50): Promise<AIPromptResult<GeneratedPrompt[]>> {
    try {
      const prompts = this.storage.slice(-limit);
      return { success: true, data: prompts };
    } catch (error) {
      return { 
        success: false, 
        error: 'STORAGE_ERROR', 
        message: 'Failed to retrieve recent prompts' 
      };
    }
  }

  async findByTemplateId(
    templateId: string, 
    limit: number = 20
  ): Promise<AIPromptResult<GeneratedPrompt[]>> {
    try {
      const prompts = this.storage
        .filter(prompt => prompt.templateId === templateId)
        .slice(-limit);
      return { success: true, data: prompts };
    } catch (error) {
      return { 
        success: false, 
        error: 'STORAGE_ERROR', 
        message: 'Failed to retrieve prompts by template ID' 
      };
    }
  }

  async delete(id: string): Promise<AIPromptResult<void>> {
    try {
      this.storage = this.storage.filter(prompt => prompt.id !== id);
      return { success: true, data: undefined };
    } catch (error) {
      return { 
        success: false, 
        error: 'STORAGE_ERROR', 
        message: 'Failed to delete prompt' 
      };
    }
  }

  async clear(): Promise<AIPromptResult<void>> {
    try {
      this.storage = [];
      return { success: true, data: undefined };
    } catch (error) {
      return { 
        success: false, 
        error: 'STORAGE_ERROR', 
        message: 'Failed to clear prompt history' 
      };
    }
  }

  private trimStorage(): void {
    if (this.storage.length > this.maxStorageSize) {
      this.storage = this.storage.slice(-this.maxStorageSize);
    }
  }
}