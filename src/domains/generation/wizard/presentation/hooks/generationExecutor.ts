import { buildWizardInput } from "../../infrastructure/strategies";
import type { WizardScenarioData } from "./wizard-generation.types";
import type { Scenario } from "../../../../scenarios/domain/scenario.types";
import type { GenerationAction } from "./generationStateMachine";

declare const __DEV__: boolean;

interface ExecuteGenerationParams {
  wizardData: WizardScenarioData;
  scenario: Scenario;
  isVideoMode: boolean;
  isMountedRef: React.MutableRefObject<boolean>;
  dispatch: React.Dispatch<GenerationAction>;
  onError?: (error: string) => void;
  videoGenerationFn: (input: any, prompt: string) => Promise<void>;
  photoGenerationFn: (input: any, prompt: string) => Promise<void>;
}

export const executeWizardGeneration = async (params: ExecuteGenerationParams): Promise<void> => {
  const {
    wizardData,
    scenario,
    isVideoMode,
    isMountedRef,
    dispatch,
    onError,
    videoGenerationFn,
    photoGenerationFn,
  } = params;

  try {
    const input = await buildWizardInput(wizardData, scenario);

    if (!isMountedRef.current) return;

    if (!input) {
      dispatch({ type: "ERROR", error: "Failed to build generation input" });
      onError?.("Failed to build generation input");
      return;
    }

    dispatch({ type: "START_GENERATION" });

    if (__DEV__) {
      console.log("[WizardGeneration] GENERATING -", isVideoMode ? "VIDEO" : "PHOTO");
    }

    const typedInput = input as { prompt?: string };
    const generationFn = isVideoMode ? videoGenerationFn : photoGenerationFn;
    await generationFn(input, typedInput.prompt || "");

    if (isMountedRef.current) {
      dispatch({ type: "COMPLETE" });
    }
  } catch (error: any) {
    if (!isMountedRef.current) return;

    const errorMsg = error?.message || "error.generation.unknown";
    if (__DEV__) {
      console.error("[WizardGeneration] Error:", errorMsg, error);
    }
    dispatch({ type: "ERROR", error: errorMsg });
    onError?.(errorMsg);
  }
};
