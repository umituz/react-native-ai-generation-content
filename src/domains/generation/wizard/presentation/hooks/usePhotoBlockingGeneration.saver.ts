/**
 * usePhotoBlockingGeneration Saver
 * Handles saving creation to processing state
 */

import type { CreationPersistence } from "../../infrastructure/utils/creation-persistence.util";
import type { WizardScenarioData } from "./wizard-generation.types";

interface SaveCreationProps {
  readonly userId: string | undefined;
  readonly scenario: WizardScenarioData;
  readonly persistence: CreationPersistence;
  readonly creditCost?: number;
  readonly creationIdRef: React.MutableRefObject<string | null>;
}

export async function saveCreationToProcessing(
  props: SaveCreationProps,
  input: unknown,
  prompt: string,
): Promise<void> {
  const { userId, scenario, persistence, creditCost, creationIdRef } = props;

  if (!userId || !prompt) return;

  try {
    // Extract generation parameters from input (for image generation, no duration/resolution)
    const inputData = input as Record<string, unknown>;
    const duration = typeof inputData?.duration === "number" ? inputData.duration : undefined;
    const resolution = typeof inputData?.resolution === "string" ? inputData.resolution : undefined;
    const aspectRatio = typeof inputData?.aspectRatio === "string" ? inputData.aspectRatio : undefined;

    const result = await persistence.saveAsProcessing(userId, {
      scenarioId: scenario.id,
      scenarioTitle: scenario.title || scenario.id,
      prompt,
      duration,
      resolution,
      creditCost,
      aspectRatio,
      provider: scenario.providerId ?? "fal",
      outputType: scenario.outputType,
    });
    creationIdRef.current = result.creationId;

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[PhotoBlockingGeneration] Saved as processing:", result.creationId);
    }
  } catch (err) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.error("[PhotoBlockingGeneration] saveAsProcessing error:", err);
    }
  }
}
