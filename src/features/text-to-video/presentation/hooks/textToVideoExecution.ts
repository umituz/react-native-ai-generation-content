/**
 * Text-to-Video Execution
 * Core execution logic for text-to-video generation
 */

import { executeTextToVideo } from "../../infrastructure/services";
import type {
  TextToVideoConfig,
  TextToVideoCallbacks,
  TextToVideoResult,
  TextToVideoOptions,
  TextToVideoInputBuilder,
  TextToVideoResultExtractor,
} from "../../domain/types";

declare const __DEV__: boolean;

export interface ExecutionContext {
  userId: string;
  config: TextToVideoConfig;
  callbacks: TextToVideoCallbacks;
  buildInput: TextToVideoInputBuilder;
  extractResult?: TextToVideoResultExtractor;
}

export interface ExecutionCallbacks {
  onStateUpdate: (update: {
    isProcessing?: boolean;
    progress?: number;
    videoUrl?: string | null;
    thumbnailUrl?: string | null;
    error?: string | null;
  }) => void;
}

function generateCreationId(): string {
  return `text-to-video_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export async function executeVideoGeneration(
  prompt: string,
  options: TextToVideoOptions | undefined,
  context: ExecutionContext,
  executionCallbacks: ExecutionCallbacks,
): Promise<TextToVideoResult> {
  const { userId, config, callbacks, buildInput, extractResult } = context;
  const { onStateUpdate } = executionCallbacks;
  const creationId = generateCreationId();

  onStateUpdate({ isProcessing: true, progress: 0, error: null });

  if (__DEV__) {
    console.log(
      "[TextToVideoFeature] Starting generation with prompt:",
      prompt,
      "creationId:",
      creationId,
    );
  }

  if (callbacks.onGenerationStart) {
    callbacks
      .onGenerationStart({
        creationId,
        type: "text-to-video",
        prompt,
        metadata: options as Record<string, unknown> | undefined,
      })
      .catch((err) => {
        if (__DEV__) {
          console.warn("[TextToVideoFeature] onGenerationStart failed:", err);
        }
      });
  }

  if (__DEV__) {
    console.log("[TextToVideoFeature] Starting executeTextToVideo...");
  }

  try {
    const result = await executeTextToVideo(
      { prompt, userId, options },
      {
        model: config.model,
        buildInput,
        extractResult,
        onProgress: (progress) => {
          onStateUpdate({ progress });
          callbacks.onProgress?.(progress);
        },
      },
    );

    if (result.success && result.videoUrl) {
      onStateUpdate({
        videoUrl: result.videoUrl,
        thumbnailUrl: result.thumbnailUrl ?? null,
        isProcessing: false,
        progress: 100,
      });

      if (callbacks.onCreditDeduct) {
        await callbacks.onCreditDeduct(config.creditCost);
      }

      if (callbacks.onCreationSave) {
        await callbacks.onCreationSave({
          creationId,
          type: "text-to-video",
          videoUrl: result.videoUrl,
          thumbnailUrl: result.thumbnailUrl,
          prompt,
          metadata: options as Record<string, unknown> | undefined,
        });
      }

      callbacks.onGenerate?.(result);
    } else {
      const error = result.error || "Generation failed";
      onStateUpdate({ isProcessing: false, error });
      callbacks.onError?.(error);
    }

    return result;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    if (__DEV__) {
      console.error("[TextToVideoFeature] Generation error:", errorMessage);
    }
    onStateUpdate({ isProcessing: false, error: errorMessage });
    callbacks.onError?.(errorMessage);
    return { success: false, error: errorMessage };
  }
}
