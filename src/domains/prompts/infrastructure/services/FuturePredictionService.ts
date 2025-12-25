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

/**
 * Core preservation instruction for photorealistic couple/family transformations
 */
export const IDENTITY_INSTRUCTION = `CRITICAL PRESERVATION LOCK:
{
  "policy": "PRESERVE BOTH SUBJECTS' IDENTITIES & ENFORCE STRICT PHOTOREALISM",
  "rule_1": "The output MUST depict the EXACT SAME TWO PEOPLE from the input photos.",
  "rule_2": "STYLE: Always render as a HIGH-END PHOTOREALISTIC photograph. 8k resolution, cinematic lighting, ultra-detailed textures.",
  "rule_3": "STRICTLY PROHIBITED: Anime, cartoons, illustrations, sketches, or 3D character renders. NO non-human stylization.",
  "rule_4": "Preserve both persons' facial layouts, eye colors, skin tones, and unique features while placing them in the new scenario.",
  "rule_5": "Both subjects must appear naturally together in the same frame with realistic proportions."
}`;

/**
 * Creates a scenario transformation prompt with structured JSON-like format
 */
export const createScenarioPrompt = (
    scenarioName: string,
    subjectA: string,
    subjectB: string,
    costume: string,
    environment: string,
    additionalDetails?: string,
) => `
${IDENTITY_INSTRUCTION}

TRANSFORMATION_REQUEST:
{
  "target_scenario": "${scenarioName}",
  "subjects": {
    "person_A": "${subjectA}",
    "person_B": "${subjectB}"
  },
  "modifications": {
    "appearance_update": "${costume.replace(/\n/g, " ").trim()}",
    "environment_update": "${environment.replace(/\n/g, " ").trim()}"
    ${additionalDetails ? `,"additional_details": "${additionalDetails.replace(/\n/g, " ").trim()}"` : ""}
  },
  "visual_constraints": {
    "style_matching": "Render as a premium DSLR photograph",
    "face_preservation": "Maintain 100% identity of BOTH persons from input photos",
    "lighting": "Realistic professional studio or outdoor cinematic lighting",
    "composition": "Both subjects prominently visible, natural poses"
  }
}

FINAL COMMAND: Create a strictly photorealistic image of these two specific people in a ${scenarioName} scenario. No matter what the input style is, the result MUST be real-life looking people in a premium quality photograph.`;

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

    generateTemplate(
        config: FuturePredictionConfig
    ): Promise<AIPromptResult<AIPromptTemplate>> {
        if (!this.validateConfig(config)) {
            return Promise.resolve({
                success: false,
                error: 'VALIDATION_ERROR',
                message: 'Invalid future prediction configuration',
            });
        }

        const template = this.createTemplate(config);
        return Promise.resolve({ success: true, data: template });
    }

    generatePrompts(
        config: FuturePredictionConfig
    ): Promise<AIPromptResult<FuturePredictionResult>> {
        if (!this.validateConfig(config)) {
            return Promise.resolve({
                success: false,
                error: 'VALIDATION_ERROR',
                message: 'Invalid configuration',
            });
        }

        const imagePrompt = this.buildImagePrompt(config);
        const storyPrompt = this.buildStoryPrompt(config);

        return Promise.resolve({
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
        });
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

        if (config.settings.languageName) {
            prompt = prompt.replace(
                /{{#if language}}(.*?){{\/if}}/g,
                `$1`.replace(/{{language}}/g, config.settings.languageName)
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
}
