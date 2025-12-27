import type { IPromptGenerationService } from '../../domain/repositories/IAIPromptServices';
import type { AIPromptTemplate } from '../../domain/entities/AIPromptTemplate';
import type { AIPromptResult } from '../../domain/entities/types';

export class PromptGenerationService implements IPromptGenerationService {
  generateFromTemplate(
    template: AIPromptTemplate,
    variables: Record<string, unknown>
  ): Promise<AIPromptResult<string>> {
    return new Promise((resolve) => {
      try {
        const validation = this.validateVariables(template, variables);
        if (!validation.success) {
          resolve(validation as AIPromptResult<string>);
          return;
        }

        const generatedText = this.replaceTemplateVariables(template.template, variables);
        resolve({ success: true, data: generatedText });
      } catch {
        resolve({
          success: false,
          error: 'GENERATION_FAILED',
          message: 'Failed to generate prompt'
        });
      }
    });
  }

  validateVariables(
    template: AIPromptTemplate,
    variables: Record<string, unknown>
  ): AIPromptResult<void> {
    for (const variable of template.variables) {
      if (variable.required && !(variable.name in variables)) {
        return {
          success: false,
          error: 'INVALID_VARIABLES',
          message: `Required variable ${variable.name} is missing`
        };
      }
    }
    return { success: true, data: undefined };
  }

  replaceTemplateVariables(
    template: string,
    variables: Record<string, unknown>
  ): string {
    let result = template;

    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`\\$\\{${key}\\}`, 'g');
      result = result.replace(regex, String(value || ''));
    });

    return result;
  }
}