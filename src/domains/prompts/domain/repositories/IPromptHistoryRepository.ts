import type { GeneratedPrompt } from '@ai-generation/prompts';
import type { AIPromptResult } from '@ai-generation/prompts';

export interface IPromptHistoryRepository {
  save(prompt: GeneratedPrompt): Promise<AIPromptResult<void>>;
  findRecent(limit?: number): Promise<AIPromptResult<GeneratedPrompt[]>>;
  findByTemplateId(templateId: string, limit?: number): Promise<AIPromptResult<GeneratedPrompt[]>>;
  delete(id: string): Promise<AIPromptResult<void>>;
  clear(): Promise<AIPromptResult<void>>;
}