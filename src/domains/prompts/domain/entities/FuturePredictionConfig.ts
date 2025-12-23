import type { AIPromptVariable } from './value-objects';

/**
 * Future Prediction Configuration
 * Generic configuration for generating future scenarios/visualizations
 */

export interface FuturePredictionSettings {
    readonly scenarioType: string; // e.g. 'lifestyle', 'career', 'family', 'adventure'
    readonly outputType: FuturePredictionOutputType;
    readonly personCount: 1 | 2;
    readonly includeDate: boolean;
    readonly language: string;
    readonly tone?: string; // e.g. 'romantic', 'professional', 'funny', 'dramatic'
    readonly subjectRole?: string; // e.g. 'couple', 'best friends', 'business partners', 'parents'
    readonly year?: number; // Optional specific year for prediction
}

export type FuturePredictionOutputType = 'image' | 'story' | 'both';

export interface FuturePredictionConfig {
    readonly scenarioId: string;
    readonly scenarioTitle: string;
    readonly promptModifier: string;
    readonly subjectA: string;
    readonly subjectB?: string;
    readonly settings: FuturePredictionSettings;
    readonly customPrompt?: string;
}

export interface FuturePredictionTemplate {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly imagePrompt: string;
    readonly storyPrompt: string;
    readonly variables: readonly FuturePredictionVariable[];
}

export interface FuturePredictionVariable extends AIPromptVariable {
    readonly category: 'subject' | 'scenario' | 'output';
}

export interface FuturePredictionResult {
    readonly imagePrompt: string;
    readonly storyPrompt: string;
    readonly metadata: FuturePredictionMetadata;
}

export interface FuturePredictionMetadata {
    readonly scenarioId: string;
    readonly personCount: number;
    readonly language: string;
    readonly generatedAt: number;
}

export const validateFuturePredictionConfig = (
    config: FuturePredictionConfig
): boolean => {
    if (!config.scenarioId || typeof config.scenarioId !== 'string') {
        return false;
    }
    if (!config.subjectA || typeof config.subjectA !== 'string') {
        return false;
    }
    if (!config.settings) {
        return false;
    }
    return true;
};

export const createFuturePredictionVariable = (
    name: string,
    type: 'string' | 'number' | 'boolean',
    description: string,
    category: 'subject' | 'scenario' | 'output',
    required: boolean = true,
    defaultValue?: string | number | boolean
): FuturePredictionVariable => ({
    name,
    type,
    description,
    category,
    required,
    defaultValue,
});

export const getFutureYear = (): number => {
    const currentYear = new Date().getFullYear();
    // Typical future predictions are 1-50 years ahead
    const offset = 1 + Math.floor(Math.random() * 50);
    return currentYear + offset;
};
