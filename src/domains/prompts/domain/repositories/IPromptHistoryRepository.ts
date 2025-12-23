import type { GeneratedPrompt } from '../entities/GeneratedPrompt';
import type { AIPromptResult } from '../entities/types';

export interface IPromptHistoryRepository {
  save(prompt: GeneratedPrompt): Promise<AIPromptResult<void>>;
  findRecent(limit?: number): Promise<AIPromptResult<GeneratedPrompt[]>>;
  findByTemplateId(templateId: string, limit?: number): Promise<AIPromptResult<GeneratedPrompt[]>>;
  delete(id: string): Promise<AIPromptResult<void>>;
  clear(): Promise<AIPromptResult<void>>;
}