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

export type WizardOutputType = "image" | "video";

export interface WizardScenarioData {
  readonly id: string;
  readonly aiPrompt: string;
  readonly outputType?: WizardOutputType; // "image" for couple-future, "video" for ai-hug/kiss
  readonly title?: string;
  readonly description?: string;
  [key: string]: unknown;
}

interface VideoGenerationInput {
  readonly sourceImageBase64: string;
  readonly targetImageBase64: string;
  readonly prompt: string;
}

interface ImageGenerationInput {
  readonly partnerABase64: string;
  readonly partnerBBase64: string;
  readonly prompt: string;
}

type GenerationInput = VideoGenerationInput | ImageGenerationInput;

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

async function executeImageGeneration(
  input: ImageGenerationInput,
  onProgress?: (progress: number) => void,
): Promise<{ success: boolean; imageUrl?: string; error?: string }> {
  const { providerRegistry } = await import("../../../../infrastructure/services/provider-registry.service");

  const provider = providerRegistry.getActiveProvider();
  if (!provider || !provider.isInitialized()) {
    return { success: false, error: "AI provider not initialized" };
  }

  try {
    onProgress?.(5);

    const formatBase64 = (base64: string): string => {
      return base64.startsWith("data:") ? base64 : `data:image/jpeg;base64,${base64}`;
    };

    const imageUrls = [input.partnerABase64, input.partnerBBase64]
      .filter(Boolean)
      .map(formatBase64);

    if (imageUrls.length < 2) {
      return { success: false, error: "Two images required" };
    }

    onProgress?.(10);

    const enhancedPrompt = `A photorealistic image of a couple. The first person @image1 and the second person @image2. ${input.prompt}. High quality, detailed, professional photography.`;

    const modelInput = {
      image_urls: imageUrls,
      prompt: enhancedPrompt,
      aspect_ratio: "1:1",
      output_format: "jpeg",
      num_images: 1,
    };

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[useWizardGeneration] Starting image generation");
    }

    let lastStatus = "";
    const result = await provider.subscribe("fal-ai/nano-banana", modelInput, {
      timeoutMs: 120000,
      onQueueUpdate: (status) => {
        if (status.status === lastStatus) return;
        lastStatus = status.status;
        if (status.status === "IN_QUEUE") onProgress?.(20);
        else if (status.status === "IN_PROGRESS") onProgress?.(50);
      },
    });

    onProgress?.(90);

    const rawResult = result as Record<string, unknown>;
    const data = (rawResult?.data ?? rawResult) as { images?: Array<{ url: string }> };
    const imageUrl = data?.images?.[0]?.url;

    onProgress?.(100);

    if (!imageUrl) {
      return { success: false, error: "No image generated" };
    }

    return { success: true, imageUrl };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Generation failed";
    return { success: false, error: message };
  }
}

async function convertUriToBase64(uri: string): Promise<string> {
  try {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: 'base64',
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
): Promise<GenerationInput | null> {
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

  const prompt = scenario.aiPrompt || `Generate ${scenario.id} scene`;
  const outputType = scenario.outputType || "video"; // Default to video for backward compatibility

  // Build input based on output type
  if (outputType === "image") {
    return {
      partnerABase64: photo1Base64,
      partnerBBase64: photo2Base64,
      prompt,
    } as ImageGenerationInput;
  } else {
    return {
      sourceImageBase64: photo1Base64,
      targetImageBase64: photo2Base64,
      prompt,
    } as VideoGenerationInput;
  }
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
  const lastInputRef = useRef<GenerationInput | null>(null);
  const repository = useMemo(() => createCreationsRepository("creations"), []);
  const videoFeatureType = useMemo(() => getVideoFeatureType(scenario.id), [scenario.id]);
  const outputType = scenario.outputType || "video";

  type GenerationResult = { videoUrl: string } | { imageUrl: string };

  const strategy: GenerationStrategy<GenerationInput, GenerationResult> = useMemo(
    () => ({
      execute: async (input, onProgress) => {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[useWizardGeneration] Executing generation", {
            scenarioId: scenario.id,
            outputType,
          });
        }

        lastInputRef.current = input;

        // Execute based on output type
        if (outputType === "image") {
          const imageInput = input as ImageGenerationInput;
          const result = await executeImageGeneration(imageInput, onProgress);

          if (!result.success || !result.imageUrl) {
            throw new Error(result.error || "Image generation failed");
          }

          return { imageUrl: result.imageUrl };
        } else {
          const videoInput = input as VideoGenerationInput;
          const result = await executeVideoFeature(
            videoFeatureType,
            {
              sourceImageBase64: videoInput.sourceImageBase64,
              targetImageBase64: videoInput.targetImageBase64,
              prompt: videoInput.prompt,
            },
            { onProgress },
          );

          if (!result.success || !result.videoUrl) {
            throw new Error(result.error || "Video generation failed");
          }

          return { videoUrl: result.videoUrl };
        }
      },
      getCreditCost: () => 1,
      save: async (result, uid) => {
        const input = lastInputRef.current;
        if (!input) return;

        const videoResult = result as { videoUrl?: string };
        const imageResult = result as { imageUrl?: string };

        const creation = {
          videoUrl: videoResult.videoUrl,
          imageUrl: imageResult.imageUrl,
          scenarioId: scenario.id,
          scenarioTitle: scenario.title || scenario.id,
          prompt: (input as VideoGenerationInput).prompt,
          createdAt: Date.now(),
        };

        await repository.create(uid, creation);

        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[useWizardGeneration] Creation saved");
        }
      },
    }),
    [scenario, videoFeatureType, repository, outputType],
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
