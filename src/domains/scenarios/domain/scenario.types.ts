/**
 * Scenario Data Types
 * Types for scenario data transfer and display
 */

import type { ScenarioInputType } from "./Scenario";

export interface ScenarioData {
  readonly id: string;
  readonly category?: string;
  readonly title?: string;
  readonly description?: string;
  readonly icon?: string;
  readonly imageUrl?: string;
  readonly previewImageUrl?: string;
  readonly aiPrompt?: string;
  readonly storyTemplate?: string;
  readonly requiresPhoto?: boolean;
  readonly hidden?: boolean;
  readonly inputType?: ScenarioInputType;
  readonly [key: string]: unknown;
}
