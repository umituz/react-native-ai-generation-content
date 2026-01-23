import type { ITemplateRepository } from '../../domain/repositories/ITemplateRepository';
import type { AIPromptTemplate } from '../../domain/entities/AIPromptTemplate';
import type { AIPromptCategory, AIPromptResult } from '../../domain/entities/types';

export class TemplateRepository implements ITemplateRepository {
  private storage = new Map<string, AIPromptTemplate>();

  findById(id: string): Promise<AIPromptResult<AIPromptTemplate | null>> {
    try {
      const template = this.storage.get(id) || null;
      return Promise.resolve({ success: true, data: template });
    } catch {
      return Promise.resolve({
        success: false,
        error: 'STORAGE_ERROR',
        message: 'Failed to retrieve template'
      });
    }
  }

  findByCategory(category: AIPromptCategory): Promise<AIPromptResult<AIPromptTemplate[]>> {
    try {
      const templates = Array.from(this.storage.values())
        .filter(template => template.category === category);
      return Promise.resolve({ success: true, data: templates });
    } catch {
      return Promise.resolve({
        success: false,
        error: 'STORAGE_ERROR',
        message: 'Failed to retrieve templates by category'
      });
    }
  }

  findAll(): Promise<AIPromptResult<AIPromptTemplate[]>> {
    try {
      const templates = Array.from(this.storage.values());
      return Promise.resolve({ success: true, data: templates });
    } catch {
      return Promise.resolve({
        success: false,
        error: 'STORAGE_ERROR',
        message: 'Failed to retrieve all templates'
      });
    }
  }

  save(template: AIPromptTemplate): Promise<AIPromptResult<void>> {
    try {
      this.storage.set(template.id, template);
      return Promise.resolve({ success: true, data: undefined });
    } catch {
      return Promise.resolve({
        success: false,
        error: 'STORAGE_ERROR',
        message: 'Failed to save template'
      });
    }
  }

  delete(id: string): Promise<AIPromptResult<void>> {
    try {
      this.storage.delete(id);
      return Promise.resolve({ success: true, data: undefined });
    } catch {
      return Promise.resolve({
        success: false,
        error: 'STORAGE_ERROR',
        message: 'Failed to delete template'
      });
    }
  }

  exists(id: string): Promise<boolean> {
    return Promise.resolve(this.storage.has(id));
  }
}
