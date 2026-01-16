/**
 * useFlowStore
 * Zustand store for multi-step flow state management
 */

import { createStore } from "@umituz/react-native-design-system";
import type {
  FlowState,
  FlowActions,
  FlowUploadedImageData,
  StepDefinition,
} from "../../domain/entities/flow-config.types";

interface FlowStoreState extends FlowState {
  stepDefinitions: readonly StepDefinition[];
}

const createInitialState = (): FlowState => ({
  currentStepId: "",
  currentStepIndex: 0,
  completedSteps: [],
  selectedCategory: undefined,
  selectedScenario: undefined,
  partners: {},
  partnerNames: {},
  textInput: undefined,
  visualStyle: undefined,
  selectedFeatures: {},
  customData: {},
  generationStatus: "idle",
  generationProgress: 0,
  generationResult: undefined,
  generationError: undefined,
});

interface FlowStoreConfig {
  steps: readonly StepDefinition[];
  initialStepId?: string;
  initialStepIndex?: number;
}

export const createFlowStore = (config: FlowStoreConfig) => {
  // Support both initialStepId and initialStepIndex
  let initialIndex = 0;

  if (config.initialStepIndex !== undefined) {
    initialIndex = Math.max(0, Math.min(config.initialStepIndex, config.steps.length - 1));
  } else if (config.initialStepId) {
    initialIndex = Math.max(0, config.steps.findIndex((s) => s.id === config.initialStepId));
  }

  const initialStepId = config.steps[initialIndex]?.id ?? "";

  const initialState: FlowStoreState = {
    ...createInitialState(),
    currentStepId: initialStepId,
    currentStepIndex: initialIndex,
    stepDefinitions: config.steps,
  };

  return createStore<FlowStoreState, FlowActions>({
    name: "flow_store",
    initialState,
    persist: false,
    actions: (set, get) => ({
      goToStep: (stepId: string) => {
        const { stepDefinitions } = get();
        const index = stepDefinitions.findIndex((s) => s.id === stepId);
        if (index >= 0) {
          set({ currentStepId: stepId, currentStepIndex: index, generationError: undefined });
        }
      },

      nextStep: () => {
        const { stepDefinitions, currentStepIndex, completedSteps, currentStepId } = get();
        const nextIndex = currentStepIndex + 1;
        if (nextIndex < stepDefinitions.length) {
          const nextStep = stepDefinitions[nextIndex];
          const newCompleted = completedSteps.includes(currentStepId)
            ? completedSteps
            : [...completedSteps, currentStepId];

          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.log("[FlowStore] nextStep", {
              fromIndex: currentStepIndex,
              toIndex: nextIndex,
              fromStep: currentStepId,
              toStep: nextStep.id,
              toStepType: nextStep.type,
            });
          }

          set({ currentStepId: nextStep.id, currentStepIndex: nextIndex, completedSteps: newCompleted });
        }
      },

      previousStep: () => {
        const { stepDefinitions, currentStepIndex } = get();
        if (currentStepIndex > 0) {
          const prevStep = stepDefinitions[currentStepIndex - 1];
          set({ currentStepId: prevStep.id, currentStepIndex: currentStepIndex - 1 });
        }
      },

      setCategory: (category: unknown) => set({ selectedCategory: category }),
      setScenario: (scenario: unknown) => set({ selectedScenario: scenario }),

      setPartnerImage: (partnerId: string, image: FlowUploadedImageData | undefined) => {
        const { partners } = get();
        set({ partners: { ...partners, [partnerId]: image } });
      },

      setPartnerName: (partnerId: string, name: string) => {
        const { partnerNames } = get();
        set({ partnerNames: { ...partnerNames, [partnerId]: name } });
      },

      setTextInput: (text: string) => set({ textInput: text }),
      setVisualStyle: (styleId: string) => set({ visualStyle: styleId }),

      setSelectedFeatures: (featureType: string, ids: readonly string[]) => {
        const { selectedFeatures } = get();
        set({ selectedFeatures: { ...selectedFeatures, [featureType]: ids } });
      },

      setCustomData: (key: string, value: unknown) => {
        const { customData } = get();
        set({ customData: { ...customData, [key]: value } });
      },

      startGeneration: () => {
        set({ generationStatus: "preparing", generationProgress: 0, generationError: undefined });
      },

      updateProgress: (progress: number) => {
        set({ generationProgress: progress, generationStatus: progress > 0 ? "generating" : "preparing" });
      },

      setResult: (result: unknown) => {
        set({ generationResult: result, generationStatus: "completed", generationProgress: 100 });
      },

      setError: (error: string) => {
        set({ generationError: error, generationStatus: "failed", generationProgress: 0 });
      },

      reset: () => {
        const { stepDefinitions } = get();
        const firstStepId = stepDefinitions[0]?.id ?? "";
        set({ ...createInitialState(), currentStepId: firstStepId, stepDefinitions });
      },

      completeStep: (stepId: string) => {
        const { completedSteps } = get();
        if (!completedSteps.includes(stepId)) {
          set({ completedSteps: [...completedSteps, stepId] });
        }
      },
    }),
  });
};

export type FlowStoreType = ReturnType<typeof createFlowStore>;
