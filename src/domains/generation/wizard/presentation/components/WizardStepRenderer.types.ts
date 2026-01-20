import type { StepDefinition } from "../../../../../domain/entities/flow-config.types";
import type { WizardScenarioData } from "../hooks/useWizardGeneration";
import type { UploadedImage } from "../../../../../presentation/hooks/generation/useAIGenerateState";

export interface WizardStepRendererProps {
  readonly step: StepDefinition | undefined;
  readonly scenario?: WizardScenarioData;
  readonly customData: Record<string, unknown>;
  readonly generationProgress: number;
  readonly generationResult: unknown;
  readonly isSaving: boolean;
  readonly isSharing: boolean;
  readonly showRating?: boolean;
  readonly onNext: () => void;
  readonly onBack: () => void;
  readonly onPhotoContinue: (stepId: string, image: UploadedImage) => void;
  readonly onDownload: () => void;
  readonly onShare: () => void;
  readonly onRate?: () => void;
  readonly onTryAgain?: () => void;
  /** Called when user dismisses generating screen - generation continues in background */
  readonly onDismissGenerating?: () => void;
  readonly t: (key: string) => string;
  readonly renderPreview?: (onContinue: () => void) => React.ReactElement | null;
  readonly renderGenerating?: (progress: number) => React.ReactElement | null;
  readonly renderResult?: (result: unknown) => React.ReactElement | null;
}
