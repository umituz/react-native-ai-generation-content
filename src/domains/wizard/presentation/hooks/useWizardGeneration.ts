/**
 * useWizardGeneration Hook
 * Generic generation hook for ANY wizard-based scenario
 * Handles video generation for couple features (ai-hug, ai-kiss, etc.)
 */

import { useEffect, useRef, useMemo, useCallback } from "react";
import * as FileSystem from "expo-file-system";
import {
  useGenerationOrchestrator,
  type GenerationStrategy,
} from "../../../../presentation/hooks/generation";
import { executeVideoFeature } from "../../../../infrastructure/services/video-feature-executor.service";
import { createCreationsRepository } from "../../../../domains/creations/infrastructure/adapters";
import type { VideoFeatureType } from "../../../../domain/interfaces";
import type { AlertMessages } from "../../../../presentation/hooks/generation/orchestrator.types";

declare const __DEV__: boolean;

export interface WizardScenarioData {
  readonly id: string;
  readonly aiPrompt: string;
  readonly title?: string;
  readonly description?: string;
  [key: string]: unknown;
}

interface VideoGenerationInput {
  readonly sourceImageBase64: string;
  readonly targetImageBase64: string;
  readonly prompt: string;
}

export interface UseWizardGenerationProps {
  readonly scenario: WizardScenarioData;
  readonly wizardData: Record<string, unknown>;
  readonly userId?: string;
  readonly isGeneratingStep: boolean;
  readonly alertMessages?: AlertMessages;
  readonly onSuccess?: (result: unknown) => void;
  readonly onError?: (error: string) => void;
  readonly onProgressChange?: (progress: number) => void;
  readonly onCreditsExhausted?: () => void;
}

export interface UseWizardGenerationReturn {
  readonly isGenerating: boolean;
  readonly progress: number;
}

function getVideoFeatureType(scenarioId: string): VideoFeatureType {
  const id = scenarioId.toLowerCase();

  if (id.includes("kiss")) return "ai-kiss";
  if (id.includes("hug")) return "ai-hug";

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.warn(`[useWizardGeneration] Unknown scenario type "${scenarioId}", defaulting to ai-hug`);
  }
  return "ai-hug";
}

async function convertUriToBase64(uri: string): Promise<string> {
  try {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return base64;
  } catch (error) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.error("[useWizardGeneration] Base64 conversion failed:", error);
    }
    throw new Error("Failed to convert image to base64");
  }
}

async function buildGenerationInput(
  wizardData: Record<string, unknown>,
  scenario: WizardScenarioData,
): Promise<VideoGenerationInput | null> {
  const photo1Key = Object.keys(wizardData).find((k) => k.includes("photo_1"));
  const photo2Key = Object.keys(wizardData).find((k) => k.includes("photo_2"));

  if (!photo1Key || !photo2Key) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.error("[useWizardGeneration] Missing photos in wizard data", {
        keys: Object.keys(wizardData),
        hasPhoto1: !!photo1Key,
        hasPhoto2: !!photo2Key,
      });
    }
    return null;
  }

  const photo1 = wizardData[photo1Key] as { uri?: string; base64?: string };
  const photo2 = wizardData[photo2Key] as { uri?: string; base64?: string };

  if (!photo1?.uri || !photo2?.uri) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.error("[useWizardGeneration] Photos missing URI", {
        photo1HasUri: !!photo1?.uri,
        photo2HasUri: !!photo2?.uri,
      });
    }
    return null;
  }

  const [photo1Base64, photo2Base64] = await Promise.all([
    convertUriToBase64(photo1.uri),
    convertUriToBase64(photo2.uri),
  ]);

  return {
    sourceImageBase64: photo1Base64,
    targetImageBase64: photo2Base64,
    prompt: scenario.aiPrompt || `Generate ${scenario.id} scene`,
  };
}

export const useWizardGeneration = (
  props: UseWizardGenerationProps,
): UseWizardGenerationReturn => {
  const {
    scenario,
    wizardData,
    userId,
    isGeneratingStep,
    alertMessages,
    onSuccess,
    onError,
    onProgressChange,
    onCreditsExhausted,
  } = props;

  const hasStarted = useRef(false);
  const lastInputRef = useRef<VideoGenerationInput | null>(null);
  const repository = useMemo(() => createCreationsRepository("creations"), []);
  const videoFeatureType = useMemo(() => getVideoFeatureType(scenario.id), [scenario.id]);

  const strategy: GenerationStrategy<VideoGenerationInput, { videoUrl: string }> = useMemo(
    () => ({
      execute: async (input, onProgress) => {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[useWizardGeneration] Executing generation", {
            scenarioId: scenario.id,
            featureType: videoFeatureType,
          });
        }

        lastInputRef.current = input;

        const result = await executeVideoFeature(
          videoFeatureType,
          {
            sourceImageBase64: input.sourceImageBase64,
            targetImageBase64: input.targetImageBase64,
            prompt: input.prompt,
          },
          { onProgress },
        );

        if (!result.success || !result.videoUrl) {
          throw new Error(result.error || "Video generation failed");
        }

        return { videoUrl: result.videoUrl };
      },
      getCreditCost: () => 1,
      save: async (result, uid) => {
        const input = lastInputRef.current;
        if (!input || !result.videoUrl) return;

        const creation = {
          videoUrl: result.videoUrl,
          scenarioId: scenario.id,
          scenarioTitle: scenario.title || scenario.id,
          prompt: input.prompt,
          createdAt: Date.now(),
        };

        await repository.create(uid, creation);

        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[useWizardGeneration] Creation saved");
        }
      },
    }),
    [scenario, videoFeatureType, repository],
  );

  const { generate, isGenerating, progress } = useGenerationOrchestrator(strategy, {
    userId,
    alertMessages,
    onCreditsExhausted,
    onSuccess: useCallback(
      (result) => {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[useWizardGeneration] Success");
        }
        onSuccess?.(result);
      },
      [onSuccess],
    ),
    onError: useCallback(
      (err) => {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[useWizardGeneration] Error:", err.message);
        }
        onError?.(err.message);
      },
      [onError],
    ),
  });

  useEffect(() => {
    if (onProgressChange) {
      onProgressChange(progress);
    }
  }, [progress, onProgressChange]);

  useEffect(() => {
    if (isGeneratingStep && !hasStarted.current && !isGenerating) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[useWizardGeneration] Starting generation", {
          scenarioId: scenario.id,
          wizardDataKeys: Object.keys(wizardData),
        });
      }

      buildGenerationInput(wizardData, scenario)
        .then((input) => {
          if (!input) {
            const error = "Failed to build generation input";
            if (typeof __DEV__ !== "undefined" && __DEV__) {
              console.error("[useWizardGeneration]", error);
            }
            onError?.(error);
            return;
          }

          generate(input);
          hasStarted.current = true;
        })
        .catch((error) => {
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.error("[useWizardGeneration] Input build error:", error);
          }
          onError?.(error.message || "Failed to prepare generation");
        });
    }

    if (!isGeneratingStep && hasStarted.current) {
      hasStarted.current = false;
    }
  }, [isGeneratingStep, scenario, wizardData, isGenerating, generate, onError]);

  return {
    isGenerating,
    progress,
  };
};
