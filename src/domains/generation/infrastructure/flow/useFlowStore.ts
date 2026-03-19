/**
 * Flow Store - Zustand store for multi-step flow state management
 */

import { createStore } from "@umituz/react-native-design-system/storage";

import type { FlowActions } from "../../../../domain/entities/flow-config.types";
import type { FlowStoreState, FlowStoreConfig } from "./use-flow-store.types";
import { createInitialState } from "./flow-store-initial-state";
import { createFlowActions } from "./flow-store-actions";

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
    actions: createFlowActions,
  });
};

export type FlowStoreType = ReturnType<typeof createFlowStore>;
