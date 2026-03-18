/**
 * Flow Store - Initial State
 * Creates the initial state for the flow store
 */

import type { FlowState } from "../../../../domain/entities/flow-config.types";

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

export { createInitialState };
