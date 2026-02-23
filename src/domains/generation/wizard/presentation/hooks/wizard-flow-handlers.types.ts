/**
 * Types for Wizard Flow Handlers
 */

import type { StepDefinition } from "../../../../../domain/entities/flow-config.types";
import type { Creation } from "../../../../creations/domain/entities/Creation";
import type { GenerationErrorInfo } from "../components/WizardFlow.types";

export interface UseWizardFlowHandlersProps {
  readonly currentStepIndex: number;
  readonly flowSteps: StepDefinition[];
  readonly customData: Record<string, unknown>;
  readonly skipResultStep: boolean;
  readonly userId?: string;
  readonly currentCreation: Creation | null;
  readonly repository: { rate: (uid: string, id: string, rating: number, desc: string) => Promise<boolean> };
  readonly t: (key: string) => string;
  readonly nextStep: () => void;
  readonly previousStep: () => void;
  readonly setResult: (result: unknown) => void;
  readonly setCustomData: (stepId: string, data: unknown) => void;
  readonly setCurrentCreation: (creation: Creation | null) => void;
  readonly setHasRated: (hasRated: boolean) => void;
  readonly setShowRatingPicker: (show: boolean) => void;
  readonly onGenerationStart?: (data: Record<string, unknown>, proceed: () => void, onError?: (error: string) => void) => void;
  readonly onGenerationComplete?: (result: unknown) => void;
  readonly onGenerationError?: (error: string, errorInfo?: GenerationErrorInfo) => void;
  readonly onBack?: () => void;
}
