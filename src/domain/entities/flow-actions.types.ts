/**
 * Flow Actions Types
 */

import type { FlowUploadedImageData } from "./flow-config-data.types";

/** Flow Actions */
export interface FlowActions {
  goToStep: (stepId: string) => void;
  nextStep: () => void;
  previousStep: () => void;
  setCategory: (category: unknown) => void;
  setScenario: (scenario: unknown) => void;
  setPartnerImage: (partnerId: string, image: FlowUploadedImageData | undefined) => void;
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
