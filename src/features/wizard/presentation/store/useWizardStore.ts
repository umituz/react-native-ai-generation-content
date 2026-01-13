/**
 * useWizardStore
 * Built-in store for AIGenerationWizard using design-system createStore
 */

import { createStore } from "@umituz/react-native-design-system";
import type { WizardState, WizardActions } from "../../domain/types";
import type { UploadedImage } from "../../../partner-upload/domain/types";

const INITIAL_STATE: WizardState = {
  currentStepIndex: 0,
  isProcessing: false,
  progress: 0,
  error: null,
  result: null,
  images: {},
  names: {},
  customData: {},
};

interface WizardStoreConfig {
  totalSteps: number;
}

export const createWizardStore = (config: WizardStoreConfig) =>
  createStore<WizardState, WizardActions>({
    name: "wizard_store",
    initialState: INITIAL_STATE,
    persist: false,
    actions: (set, get) => ({
      nextStep: () => {
        const { currentStepIndex } = get();
        if (currentStepIndex < config.totalSteps - 1) {
          set({ currentStepIndex: currentStepIndex + 1, error: null });
        }
      },

      prevStep: () => {
        const { currentStepIndex } = get();
        if (currentStepIndex > 0) {
          set({ currentStepIndex: currentStepIndex - 1, error: null });
        }
      },

      goToStep: (index: number) => {
        if (index >= 0 && index < config.totalSteps) {
          set({ currentStepIndex: index, error: null });
        }
      },

      setImage: (key: string, image: UploadedImage | null) => {
        const { images } = get();
        set({ images: { ...images, [key]: image } });
      },

      setName: (key: string, name: string) => {
        const { names } = get();
        set({ names: { ...names, [key]: name } });
      },

      setCustomData: (key: string, value: unknown) => {
        const { customData } = get();
        set({ customData: { ...customData, [key]: value } });
      },

      setProcessing: (isProcessing: boolean) => set({ isProcessing }),

      setProgress: (progress: number) => set({ progress }),

      setError: (error: string | null) => {
        set({ error, isProcessing: false, progress: 0 });
      },

      setResult: (result: unknown) => {
        set({ result, isProcessing: false, progress: 100 });
      },

      reset: () => set(INITIAL_STATE),
    }),
  });

export type WizardStoreType = ReturnType<typeof createWizardStore>;
