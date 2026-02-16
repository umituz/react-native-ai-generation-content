/**
 * Video Queue Generation Types
 */

import type { CreationPersistence } from "../../infrastructure/utils/creation-persistence.util";
import type { WizardStrategy } from "../../infrastructure/strategies/wizard-strategy.types";
import type { WizardScenarioData } from "./wizard-generation.types";

export interface UseVideoQueueGenerationProps {
  readonly userId?: string;
  readonly scenario: WizardScenarioData;
  readonly persistence: CreationPersistence;
  readonly strategy: WizardStrategy;
  readonly creditCost?: number;
  readonly onSuccess?: (result: unknown) => void;
  readonly onError?: (error: string) => void;
}

export interface UseVideoQueueGenerationReturn {
  readonly isGenerating: boolean;
  readonly startGeneration: (input: unknown, prompt: string) => Promise<void>;
}
