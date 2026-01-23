import type { AIPromptTemplate } from '../entities/AIPromptTemplate';
import type { AIPromptResult, AIPromptCategory } from '../entities/types';

export interface ITemplateRepository {
  findById(id: string): Promise<AIPromptResult<AIPromptTemplate | null>>;
  findByCategory(category: AIPromptCategory): Promise<AIPromptResult<AIPromptTemplate[]>>;
  findAll(): Promise<AIPromptResult<AIPromptTemplate[]>>;
  save(template: AIPromptTemplate): Promise<AIPromptResult<void>>;
  delete(id: string): Promise<AIPromptResult<void>>;
  exists(id: string): Promise<boolean>;
}
