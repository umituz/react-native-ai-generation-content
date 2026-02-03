/**
 * Scenario Domain
 * Core types and interfaces for AI generation scenarios
 * Note: ScenarioId and ScenarioCategory should be defined in the app, not here
 */

export type ScenarioOutputType = "image" | "video";

export type ScenarioInputType = "single" | "dual" | "text";

/**
 * Prompt type determines how multi-person prompts are built
 * - identity: Preserve exact facial features from input photos (default)
 * - custom: Use aiPrompt as-is without adding identity preservation (for app-specific scenarios)
 */
export type ScenarioPromptType = "identity" | "custom";

export interface GeneratingMessages {
  title?: string;
  waitMessage?: string;
  hint?: string;
}

/**
 * Scenario interface
 * id and category are strings - apps define their own ScenarioId and ScenarioCategory types
 */
export interface Scenario {
  id: string;
  category?: string;
  title: string;
  description: string;
  icon: string;
  imageUrl?: string;
  previewImageUrl?: string;
  aiPrompt: string;
  storyTemplate: string;
  requiresPhoto?: boolean;
  hidden?: boolean;
  outputType?: ScenarioOutputType;
  inputType?: ScenarioInputType;
  promptType?: ScenarioPromptType;
  model?: string;
  enabled?: boolean;
  generatingMessages?: GeneratingMessages;
}
