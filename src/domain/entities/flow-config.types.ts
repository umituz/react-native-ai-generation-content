/**
 * Flow Configuration Types
 * Generic multi-step flow system for AI generation
 */

/** Step Types */
export enum StepType {
  CATEGORY_SELECTION = "category_selection",
  SCENARIO_SELECTION = "scenario_selection",
  SCENARIO_PREVIEW = "scenario_preview",
  PARTNER_UPLOAD = "partner_upload",
  TEXT_INPUT = "text_input",
  FEATURE_SELECTION = "feature_selection",
  GENERATING = "generating",
  RESULT_PREVIEW = "result_preview",
  CUSTOM = "custom",
}

/** Partner Configuration */
export interface PartnerConfig {
  readonly partnerId: "A" | "B" | "single";
  readonly showNameInput?: boolean;
  readonly showFaceDetection?: boolean;
  readonly showPhotoTips?: boolean;
  readonly maxNameLength?: number;
}

/** Category Data - App provides */
export interface CategoryData {
  readonly id: string;
  readonly titleKey: string;
  readonly descriptionKey?: string;
  readonly icon: string;
  readonly imageUrl?: string;
  readonly subcategories?: readonly CategoryData[];
}

/** Scenario Data - App provides */
export interface ScenarioData {
  readonly id: string;
  readonly categoryId?: string;
  readonly titleKey: string;
  readonly descriptionKey: string;
  readonly icon: string;
  readonly imageUrl?: string;
  readonly previewImageUrl?: string;
  readonly aiPrompt: string;
  readonly storyTemplate?: string;
}

/** Visual Style Option */
export interface VisualStyleData {
  readonly id: string;
  readonly icon: string;
  readonly labelKey: string;
  readonly promptModifier?: string;
}

/** Uploaded Image Data */
export interface UploadedImageData {
  readonly uri: string;
  readonly base64: string;
  readonly mimeType: string;
}

/** Step Transition */
export interface StepTransition {
  readonly next?: string | ((state: FlowState) => string | null);
  readonly back?: string;
  readonly skipIf?: (state: FlowState) => boolean;
}

/** Step Definition */
export interface StepDefinition<TConfig = unknown> {
  readonly id: string;
  readonly type: StepType;
  readonly required?: boolean;
  readonly config?: TConfig;
  readonly transitions?: StepTransition;
  readonly component?: React.ComponentType<StepComponentProps>;
}

/** Flow Generation Status */
export type FlowGenerationStatus = "idle" | "preparing" | "generating" | "completed" | "failed";

/** Flow State */
export interface FlowState {
  readonly currentStepId: string;
  readonly currentStepIndex: number;
  readonly completedSteps: readonly string[];
  readonly selectedCategory?: CategoryData;
  readonly selectedScenario?: ScenarioData;
  readonly partners: Record<string, UploadedImageData | undefined>;
  readonly partnerNames: Record<string, string>;
  readonly textInput?: string;
  readonly visualStyle?: string;
  readonly selectedFeatures: Record<string, readonly string[]>;
  readonly customData: Record<string, unknown>;
  readonly generationStatus: FlowGenerationStatus;
  readonly generationProgress: number;
  readonly generationResult?: unknown;
  readonly generationError?: string;
}

/** Flow Actions */
export interface FlowActions {
  goToStep: (stepId: string) => void;
  nextStep: () => void;
  previousStep: () => void;
  setCategory: (category: CategoryData | undefined) => void;
  setScenario: (scenario: ScenarioData | undefined) => void;
  setPartnerImage: (partnerId: string, image: UploadedImageData | undefined) => void;
  setPartnerName: (partnerId: string, name: string) => void;
  setTextInput: (text: string) => void;
  setVisualStyle: (styleId: string) => void;
  setSelectedFeatures: (featureType: string, ids: readonly string[]) => void;
  setCustomData: (key: string, value: unknown) => void;
  startGeneration: () => void;
  updateProgress: (progress: number) => void;
  setResult: (result: unknown) => void;
  setError: (error: string) => void;
  reset: () => void;
  completeStep: (stepId: string) => void;
}

/** Step Component Props */
export interface StepComponentProps {
  readonly step: StepDefinition;
  readonly state: FlowState;
  readonly actions: FlowActions;
  readonly onNext: () => void;
  readonly onBack: () => void;
  readonly isProcessing: boolean;
  readonly progress: number;
  readonly error: string | null;
}

/** Flow Callbacks */
export interface FlowCallbacks {
  onAuthRequired?: (resume: () => void) => void;
  onCreditsExhausted?: () => void;
  onGenerationStart?: () => void;
  onGenerationSuccess?: (result: unknown) => void;
  onGenerationError?: (error: string) => void;
  onStepChange?: (stepId: string, index: number) => void;
  onFlowComplete?: (result: unknown) => void;
}

/** Flow Data Provider - App provides data */
export interface FlowDataProvider {
  readonly categories?: readonly CategoryData[];
  readonly scenarios?: readonly ScenarioData[];
  readonly visualStyles?: readonly VisualStyleData[];
  readonly surprisePrompts?: readonly string[];
}

/** Flow Configuration */
export interface FlowConfiguration {
  readonly id: string;
  readonly steps: readonly StepDefinition[];
  readonly initialStepId?: string;
  readonly callbacks?: FlowCallbacks;
  readonly data?: FlowDataProvider;
  readonly creditCost?: number;
  readonly userId?: string;
}

/** Flow Features */
export interface FlowFeatures {
  readonly categorySelection: boolean;
  readonly partnerCount: 0 | 1 | 2;
  readonly textInput: boolean;
  readonly scenarioSelection: boolean;
}
