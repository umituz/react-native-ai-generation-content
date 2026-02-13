import type { IPromptHistoryRepository } from '../../domain/repositories/IPromptHistoryRepository';
import type { GeneratedPrompt } from '../../domain/entities/GeneratedPrompt';
import type { AIPromptResult } from '../../domain/entities/types';

export class PromptHistoryRepository implements IPromptHistoryRepository {
  private storage: GeneratedPrompt[] = [];
  private readonly maxStorageSize = 100;

  save(prompt: GeneratedPrompt): Promise<AIPromptResult<void>> {
    this.storage.push(prompt);
    this.trimStorage();
    return Promise.resolve({ success: true, data: undefined });
  }

  findRecent(limit: number = 50): Promise<AIPromptResult<GeneratedPrompt[]>> {
    const prompts = this.storage.slice(-limit);
    return Promise.resolve({ success: true, data: prompts });
  }

  findByTemplateId(
    templateId: string,
    limit: number = 20
  ): Promise<AIPromptResult<GeneratedPrompt[]>> {
    const prompts = this.storage
      .filter(prompt => prompt.templateId === templateId)
      .slice(-limit);
    return Promise.resolve({ success: true, data: prompts });
  }

  delete(id: string): Promise<AIPromptResult<void>> {
    this.storage = this.storage.filter(prompt => prompt.id !== id);
    return Promise.resolve({ success: true, data: undefined });
  }

  clear(): Promise<AIPromptResult<void>> {
    this.storage = [];
    return Promise.resolve({ success: true, data: undefined });
  }

  private trimStorage(): void {
    if (this.storage.length > this.maxStorageSize) {
      this.storage = this.storage.slice(-this.maxStorageSize);
    }
  }
}
