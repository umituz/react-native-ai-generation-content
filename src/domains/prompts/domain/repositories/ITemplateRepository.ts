import type { AIPromptTemplate } from '@ai-generation/prompts';
import type { AIPromptResult, AIPromptCategory } from '@ai-generation/prompts';

export interface ITemplateRepository {
  findById(id: string): Promise<AIPromptResult<AIPromptTemplate | null>>;
  findByCategory(category: AIPromptCategory): Promise<AIPromptResult<AIPromptTemplate[]>>;
  findAll(): Promise<AIPromptResult<AIPromptTemplate[]>>;
  save(template: AIPromptTemplate): Promise<AIPromptResult<void>>;
  delete(id: string): Promise<AIPromptResult<void>>;
  exists(id: string): Promise<boolean>;
}