/**
 * Flow Store - Zustand store for multi-step flow state management
 */

import { createStore } from "@umituz/react-native-design-system";

declare const __DEV__: boolean;
import type {
  FlowState,
  FlowActions,
  FlowUploadedImageData,
} from "../../../../domain/entities/flow-config.types";
import type { FlowStoreState, FlowStoreConfig } from "./use-flow-store.types";

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

export const createFlowStore = (config: FlowStoreConfig) => {
  let initialIndex = 0;

  if (config.initialStepIndex !== undefined) {
    initialIndex = Math.max(0, Math.min(config.initialStepIndex, config.steps.length - 1));
  } else if (config.initialStepId) {
    const foundIndex = config.steps.findIndex((s) => s.id === config.initialStepId);
    if (foundIndex === -1) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.warn(`[FlowStore] Step "${config.initialStepId}" not found, using first step`);
      }
    }
    initialIndex = Math.max(0, foundIndex);
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
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[FlowStore] nextStep called", {
            currentStepIndex,
            nextIndex,
            totalSteps: stepDefinitions.length,
            currentStepId,
            nextStepId: stepDefinitions[nextIndex]?.id,
            nextStepType: stepDefinitions[nextIndex]?.type,
          });
        }
        if (nextIndex >= stepDefinitions.length) {
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.log("[FlowStore] nextStep BLOCKED - already at last step");
          }
          return;
        }
        set({
          currentStepId: stepDefinitions[nextIndex].id,
          currentStepIndex: nextIndex,
          completedSteps: completedSteps.includes(currentStepId)
            ? completedSteps
            : [...completedSteps, currentStepId],
        });
      },

      previousStep: () => {
        const { stepDefinitions, currentStepIndex } = get();
        if (currentStepIndex > 0) {
          set({
            currentStepId: stepDefinitions[currentStepIndex - 1].id,
            currentStepIndex: currentStepIndex - 1,
          });
        }
      },

      setCategory: (category: unknown) => set({ selectedCategory: category }),
      setScenario: (scenario: unknown) => set({ selectedScenario: scenario }),

      setPartnerImage: (partnerId: string, image: FlowUploadedImageData | undefined) =>
        set((state) => ({ partners: { ...state.partners, [partnerId]: image } })),

      setPartnerName: (partnerId: string, name: string) =>
        set((state) => ({ partnerNames: { ...state.partnerNames, [partnerId]: name } })),

      setTextInput: (text: string) => set({ textInput: text }),
      setVisualStyle: (styleId: string) => set({ visualStyle: styleId }),

      setSelectedFeatures: (featureType: string, ids: readonly string[]) =>
        set((state) => ({ selectedFeatures: { ...state.selectedFeatures, [featureType]: ids } })),

      setCustomData: (key: string, value: unknown) =>
        set((state) => ({ customData: { ...state.customData, [key]: value } })),

      startGeneration: () =>
        set({ generationStatus: "preparing", generationProgress: 0, generationError: undefined }),

      updateProgress: (progress: number) => {
        const validProgress = Math.max(0, Math.min(100, progress));
        set({
          generationProgress: validProgress,
          generationStatus: validProgress >= 100 ? "completed" : validProgress > 0 ? "generating" : "preparing",
        });
      },

      setResult: (result: unknown) =>
        set({ generationResult: result, generationStatus: "completed", generationProgress: 100 }),

      setError: (error: string) =>
        set({ generationError: error, generationStatus: "failed", generationProgress: 0 }),

      reset: () => {
        const { stepDefinitions } = get();
        const firstStepId = stepDefinitions[0]?.id ?? "";
        set({ ...createInitialState(), currentStepId: firstStepId, stepDefinitions });
      },

      completeStep: (stepId: string) => {
        const { completedSteps } = get();
        if (!completedSteps.includes(stepId)) set({ completedSteps: [...completedSteps, stepId] });
      },
    }),
  });
};

export type FlowStoreType = ReturnType<typeof createFlowStore>;
