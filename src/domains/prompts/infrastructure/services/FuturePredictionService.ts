/**
 * Future Prediction Service
 * AI prompt generation for future scenario predictions
 */

import type {IFuturePredictionService} from '../../domain/repositories/IAIPromptServices';
import type {AIPromptTemplate} from '../../domain/entities/AIPromptTemplate';
import type {AIPromptResult} from '../../domain/entities/types';
import type {FuturePredictionConfig, FuturePredictionResult} from '../../domain/entities/FuturePredictionConfig';
import {createAIPromptTemplate} from '../../domain/entities/AIPromptTemplate';
import {validateFuturePredictionConfig, getFutureYear} from '../../domain/entities/FuturePredictionConfig';
import { DEFAULT_PROMPT_SAFETY } from './base';

export const IDENTITY_INSTRUCTION = `CRITICAL PRESERVATION LOCK:
{
  "policy": "PRESERVE BOTH SUBJECTS' IDENTITIES & ENFORCE STRICT PHOTOREALISM",
  "rule_1": "The output MUST depict the EXACT SAME TWO PEOPLE from the input photos.",
  "rule_2": "STYLE: Always render as a HIGH-END PHOTOREALISTIC photograph. 8k resolution, cinematic lighting.",
  "rule_3": "STRICTLY PROHIBITED: Anime, cartoons, illustrations, sketches, or 3D character renders.",
  "rule_4": "Preserve both persons' facial layouts, eye colors, skin tones, and unique features.",
  "rule_5": "Both subjects must appear naturally together in the same frame."
}`;

export const createScenarioPrompt = (
  scenarioName: string,
  subjectA: string,
  subjectB: string,
  costume: string,
  environment: string,
  additionalDetails?: string,
) => `${IDENTITY_INSTRUCTION}

TRANSFORMATION_REQUEST:
{
  "target_scenario": "${scenarioName}",
  "subjects": { "person_A": "${subjectA}", "person_B": "${subjectB}" },
  "modifications": {
    "appearance_update": "${costume.replace(/\n/g, ' ').trim()}",
    "environment_update": "${environment.replace(/\n/g, ' ').trim()}"
    ${additionalDetails ? `,"additional_details": "${additionalDetails.replace(/\n/g, ' ').trim()}"` : ''}
  }
}

FINAL: Create a strictly photorealistic image of these two people in a ${scenarioName} scenario.`;

const IMAGE_TEMPLATE = `Generate a photorealistic image of {{subjectA}}{{subjectBPart}}.
Role: {{subjectRole}} | Scenario: {{scenarioTitle}}
Details: {{promptModifier}}
Requirements: Maintain facial identity, realistic lighting, 4k, no watermarks.`;

const STORY_TEMPLATE = `Write 2-3 sentence description for a future scene.
Subjects: {{subjectA}}{{subjectBPart}} | Role: {{subjectRole}}
Scenario: {{scenarioTitle}} | Tone: {{tone}} | Year: {{futureYear}}
Context: {{promptModifier}}{{languagePart}}`;

export class FuturePredictionService implements IFuturePredictionService {
  generateTemplate(config: FuturePredictionConfig): Promise<AIPromptResult<AIPromptTemplate>> {
    if (!this.validateConfig(config)) {
      return Promise.resolve({
        success: false,
        error: 'VALIDATION_ERROR',
        message: 'Invalid future prediction configuration',
      });
    }

    const template = createAIPromptTemplate({
      id: `future-prediction-${config.scenarioId}`,
      name: `Future Prediction: ${config.scenarioTitle}`,
      description: `Generate future prediction for ${config.scenarioId}`,
      category: 'future-prediction',
      template: this.buildImagePrompt(config),
      variables: [],
      safety: DEFAULT_PROMPT_SAFETY,
      version: '1.0.0',
    });

    return Promise.resolve({ success: true, data: template });
  }

  generatePrompts(config: FuturePredictionConfig): Promise<AIPromptResult<FuturePredictionResult>> {
    if (!this.validateConfig(config)) {
      return Promise.resolve({ success: false, error: 'VALIDATION_ERROR', message: 'Invalid configuration' });
    }

    return Promise.resolve({
      success: true,
      data: {
        imagePrompt: this.buildImagePrompt(config),
        storyPrompt: this.buildStoryPrompt(config),
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
    const subjectBPart = config.subjectB ? ` and ${config.subjectB}` : '';
    return IMAGE_TEMPLATE
      .replace(/{{subjectA}}/g, config.subjectA)
      .replace(/{{subjectBPart}}/g, subjectBPart)
      .replace(/{{subjectRole}}/g, config.settings.subjectRole || 'individuals')
      .replace(/{{scenarioTitle}}/g, config.scenarioTitle)
      .replace(/{{promptModifier}}/g, config.promptModifier);
  }

  buildStoryPrompt(config: FuturePredictionConfig): string {
    const subjectBPart = config.subjectB ? ` and ${config.subjectB}` : '';
    const languagePart = config.settings.languageName ? `\nRespond in ${config.settings.languageName}.` : '';

    return STORY_TEMPLATE
      .replace(/{{subjectA}}/g, config.subjectA)
      .replace(/{{subjectBPart}}/g, subjectBPart)
      .replace(/{{subjectRole}}/g, config.settings.subjectRole || 'individuals')
      .replace(/{{scenarioTitle}}/g, config.scenarioTitle)
      .replace(/{{tone}}/g, config.settings.tone || 'neutral')
      .replace(/{{futureYear}}/g, String(config.settings.year || getFutureYear()))
      .replace(/{{promptModifier}}/g, config.promptModifier)
      .replace(/{{languagePart}}/g, languagePart)
      .trim();
  }
}
