/**
 * Couple Future Wizard Types
 * Configuration types for the couple future wizard component
 */

import type { StepType, FlowCallbacks, FlowUploadedImageData } from "../../../domain/entities/flow-config.types";

/** Scenario data structure */
export interface WizardScenarioData {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly image?: string;
  readonly aiPrompt?: string;
  readonly category?: string;
}

/** Visual style option */
export interface WizardVisualStyleOption {
  readonly id: string;
  readonly icon: string;
  readonly labelKey: string;
}

/** Partner upload config */
export interface WizardPartnerConfig {
  readonly titleKey: string;
  readonly subtitleKey: string;
  readonly showFaceDetection?: boolean;
  readonly showNameInput?: boolean;
  readonly showPhotoTips?: boolean;
}

/** Wizard step config */
export interface WizardStepConfig {
  readonly id: string;
  readonly type: StepType;
  readonly enabled?: boolean;
}

/** Wizard configuration */
export interface CoupleFutureWizardConfig {
  readonly steps: readonly WizardStepConfig[];
  readonly customScenarioId?: string;
  readonly partnerA?: WizardPartnerConfig;
  readonly partnerB?: WizardPartnerConfig;
}

/** Wizard translations */
export interface CoupleFutureWizardTranslations {
  readonly generator: {
    readonly title: string;
    readonly waitMessage: string;
    readonly hint?: string;
  };
  readonly partnerA: {
    readonly title: string;
    readonly subtitle: string;
    readonly continue: string;
    readonly tapToUpload: string;
    readonly selectPhoto: string;
    readonly change: string;
  };
  readonly partnerB: {
    readonly title: string;
    readonly subtitle: string;
    readonly continue: string;
    readonly tapToUpload: string;
    readonly selectPhoto: string;
    readonly change: string;
  };
  readonly scenarioPreview: {
    readonly continue: string;
    readonly back?: string;
  };
  readonly defaultNames: {
    readonly partnerA: string;
    readonly partnerB: string;
  };
}

/** Wizard data providers */
export interface CoupleFutureWizardData {
  readonly scenarios: readonly WizardScenarioData[];
  readonly selectedScenario?: WizardScenarioData;
  readonly visualStyles?: readonly WizardVisualStyleOption[];
  readonly surprisePrompts?: readonly string[];
}

/** Wizard callbacks */
export interface CoupleFutureWizardCallbacks extends FlowCallbacks {
  readonly onScenarioSelect?: (scenario: WizardScenarioData) => void;
  readonly onPartnerUpload?: (partnerId: "A" | "B", image: FlowUploadedImageData) => void;
  readonly onBackToScenarioSelection?: () => void;
  readonly requireFeature?: (callback: () => void) => boolean;
}

/** Wizard props */
export interface CoupleFutureWizardProps {
  readonly userId?: string;
  readonly config: CoupleFutureWizardConfig;
  readonly translations: CoupleFutureWizardTranslations;
  readonly data: CoupleFutureWizardData;
  readonly callbacks?: CoupleFutureWizardCallbacks;
  readonly t: (key: string) => string;
}

/** Wizard state (exposed to parent) */
export interface CoupleFutureWizardState {
  readonly currentStepId: string;
  readonly selectedScenario: WizardScenarioData | null;
  readonly partnerA: FlowUploadedImageData | null;
  readonly partnerB: FlowUploadedImageData | null;
  readonly partnerAName: string;
  readonly partnerBName: string;
  readonly customPrompt: string;
  readonly visualStyle: string;
  readonly isGenerating: boolean;
  readonly progress: number;
}
