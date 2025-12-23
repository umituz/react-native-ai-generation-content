import type { ITemplateRepository } from '../../domain/repositories/ITemplateRepository';
import type { AIPromptTemplate } from '../../domain/entities/AIPromptTemplate';
import type { AIPromptCategory, AIPromptResult } from '../../domain/entities/types';

export class TemplateRepository implements ITemplateRepository {
  private storage = new Map<string, AIPromptTemplate>();

  async findById(id: string): Promise<AIPromptResult<AIPromptTemplate | null>> {
    try {
      const template = this.storage.get(id) || null;
      return { success: true, data: template };
    } catch (error) {
      return { 
        success: false, 
        error: 'STORAGE_ERROR', 
        message: 'Failed to retrieve template' 
      };
    }
  }

  async findByCategory(category: AIPromptCategory): Promise<AIPromptResult<AIPromptTemplate[]>> {
    try {
      const templates = Array.from(this.storage.values())
        .filter(template => template.category === category);
      return { success: true, data: templates };
    } catch (error) {
      return { 
        success: false, 
        error: 'STORAGE_ERROR', 
        message: 'Failed to retrieve templates by category' 
      };
    }
  }

  async findAll(): Promise<AIPromptResult<AIPromptTemplate[]>> {
    try {
      const templates = Array.from(this.storage.values());
      return { success: true, data: templates };
    } catch (error) {
      return { 
        success: false, 
        error: 'STORAGE_ERROR', 
        message: 'Failed to retrieve all templates' 
      };
    }
  }

  async save(template: AIPromptTemplate): Promise<AIPromptResult<void>> {
    try {
      this.storage.set(template.id, template);
      return { success: true, data: undefined };
    } catch (error) {
      return { 
        success: false, 
        error: 'STORAGE_ERROR', 
        message: 'Failed to save template' 
      };
    }
  }

  async delete(id: string): Promise<AIPromptResult<void>> {
    try {
      this.storage.delete(id);
      return { success: true, data: undefined };
    } catch (error) {
      return { 
        success: false, 
        error: 'STORAGE_ERROR', 
        message: 'Failed to delete template' 
      };
    }
  }

  async exists(id: string): Promise<boolean> {
    return this.storage.has(id);
  }
}