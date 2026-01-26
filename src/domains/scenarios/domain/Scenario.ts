/**
 * Scenario Domain
 * Core types and interfaces for AI generation scenarios
 */

import { ScenarioCategory } from "./scenario-category.enum";
import type { ScenarioId } from "./scenario-ids";

export { ScenarioCategory } from "./scenario-category.enum";
export { ScenarioId } from "./scenario-ids";

export type ScenarioOutputType = "image" | "video";

export type ScenarioInputType = "single" | "dual" | "text";

/**
 * Prompt type determines how multi-person prompts are built
 * - identity: Preserve exact facial features from input photos (default)
 * - genetic_blend: Create new face by blending features from multiple inputs (for child prediction)
 */
export type ScenarioPromptType = "identity" | "genetic_blend";

export interface GeneratingMessages {
  title?: string;
  waitMessage?: string;
  hint?: string;
}

export interface Scenario {
  id: ScenarioId;
  category?: ScenarioCategory;
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
