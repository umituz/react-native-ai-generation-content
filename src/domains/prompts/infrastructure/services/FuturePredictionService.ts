import type { IFuturePredictionService } from '../../domain/repositories/IAIPromptServices';
import type { AIPromptTemplate } from '../../domain/entities/AIPromptTemplate';
import type { AIPromptResult } from '../../domain/entities/types';
import type {
    FuturePredictionConfig,
    FuturePredictionResult,
} from '../../domain/entities/FuturePredictionConfig';
import { createAIPromptTemplate } from '../../domain/entities/AIPromptTemplate';
import {
    validateFuturePredictionConfig,
    getFutureYear,
} from '../../domain/entities/FuturePredictionConfig';
import { PromptGenerationService } from './PromptGenerationService';

const IMAGE_PROMPT_TEMPLATE = `
Generate a single high-quality, photorealistic image of {{subjectA}}{{#if subjectB}} and {{subjectB}}{{/if}}.
Role/Relationship: {{subjectRole}}
Context/Scenario: {{scenarioTitle}}
Additional Details: {{promptModifier}}

Requirements:
- Maintain facial identity and key features of the individual(s) provided in input images.
- Ensure lighting, environment, and skin tones are realistic and consistent.
- Style: High detail, professional photography, 4k resolution.
- No text, watermarks, or artificial artifacts.
`.trim();

const STORY_PROMPT_TEMPLATE = `
Write a short, engaging, and evocative description for a future scene.
Subjects: {{subjectA}}{{#if subjectB}} and {{subjectB}}{{/if}}
Role: {{subjectRole}}
Scenario: {{scenarioTitle}}
Atmosphere/Tone: {{tone}}
Context: {{promptModifier}}
Imaginary Year: {{futureYear}}

Style:
- 2-3 sentences max.
- Be vivid and imaginative.
- Do not use hashtags.
{{#if language}}Please respond in {{language}} language.{{/if}}
`.trim();

export class FuturePredictionService implements IFuturePredictionService {
    private promptService: PromptGenerationService;

    constructor() {
        this.promptService = new PromptGenerationService();
    }

    async generateTemplate(
        config: FuturePredictionConfig
    ): Promise<AIPromptResult<AIPromptTemplate>> {
        if (!this.validateConfig(config)) {
            return {
                success: false,
                error: 'VALIDATION_ERROR',
                message: 'Invalid future prediction configuration',
            };
        }

        const template = this.createTemplate(config);
        return { success: true, data: template };
    }

    async generatePrompts(
        config: FuturePredictionConfig
    ): Promise<AIPromptResult<FuturePredictionResult>> {
        if (!this.validateConfig(config)) {
            return {
                success: false,
                error: 'VALIDATION_ERROR',
                message: 'Invalid configuration',
            };
        }

        const imagePrompt = this.buildImagePrompt(config);
        const storyPrompt = this.buildStoryPrompt(config);

        return {
            success: true,
            data: {
                imagePrompt,
                storyPrompt,
                metadata: {
                    scenarioId: config.scenarioId,
                    personCount: config.settings.personCount,
                    language: config.settings.language,
                    generatedAt: Date.now(),
                },
            },
        };
    }

    validateConfig(config: FuturePredictionConfig): boolean {
        return validateFuturePredictionConfig(config);
    }

    buildImagePrompt(config: FuturePredictionConfig): string {
        const subjectRole = config.settings.subjectRole || 'individuals';

        return IMAGE_PROMPT_TEMPLATE
            .replace(/{{subjectA}}/g, config.subjectA)
            .replace(/{{subjectB}}/g, config.subjectB || '')
            .replace(/{{#if subjectB}} and {{subjectB}}{{\/if}}/g, config.subjectB ? ` and ${config.subjectB}` : '')
            .replace(/{{subjectRole}}/g, subjectRole)
            .replace(/{{scenarioTitle}}/g, config.scenarioTitle)
            .replace(/{{promptModifier}}/g, config.promptModifier);
    }

    buildStoryPrompt(config: FuturePredictionConfig): string {
        const futureYear = config.settings.year || getFutureYear();
        const tone = config.settings.tone || 'neutral';
        const subjectRole = config.settings.subjectRole || 'individuals';

        let prompt = STORY_PROMPT_TEMPLATE
            .replace(/{{subjectA}}/g, config.subjectA)
            .replace(/{{subjectB}}/g, config.subjectB || '')
            .replace(/{{#if subjectB}} and {{subjectB}}{{\/if}}/g, config.subjectB ? ` and ${config.subjectB}` : '')
            .replace(/{{subjectRole}}/g, subjectRole)
            .replace(/{{scenarioTitle}}/g, config.scenarioTitle)
            .replace(/{{tone}}/g, tone)
            .replace(/{{promptModifier}}/g, config.promptModifier)
            .replace(/{{futureYear}}/g, String(futureYear));

        if (config.settings.language && config.settings.language !== 'en') {
            prompt = prompt.replace(
                /{{#if language}}(.*?){{\/if}}/g,
                `$1`.replace(/{{language}}/g, this.getLanguageName(config.settings.language))
            );
        } else {
            prompt = prompt.replace(/{{#if language}}.*?{{\/if}}/g, '');
        }

        return prompt.trim();
    }

    private createTemplate(config: FuturePredictionConfig): AIPromptTemplate {
        return createAIPromptTemplate({
            id: `future-prediction-${config.scenarioId}`,
            name: `Future Prediction: ${config.scenarioTitle}`,
            description: `Generate future prediction for ${config.scenarioId} scenario`,
            category: 'future-prediction',
            template: this.buildImagePrompt(config),
            variables: [],
            safety: {
                contentFilter: true,
                adultContentFilter: true,
                violenceFilter: true,
                hateSpeechFilter: true,
                copyrightFilter: true,
            },
            version: '1.0.0',
        });
    }

    private getLanguageName(code: string): string {
        const languages: Record<string, string> = {
            tr: 'Turkish',
            es: 'Spanish',
            fr: 'French',
            de: 'German',
            it: 'Italian',
            pt: 'Portuguese',
            ru: 'Russian',
            ja: 'Japanese',
            ko: 'Korean',
            zh: 'Chinese',
            ar: 'Arabic',
            hi: 'Hindi',
            th: 'Thai',
            vi: 'Vietnamese',
        };
        return languages[code] || 'English';
    }
}
