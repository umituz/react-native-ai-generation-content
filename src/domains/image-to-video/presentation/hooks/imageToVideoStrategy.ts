import { executeImageToVideo } from "../../infrastructure/services";
import type { GenerationStrategy } from "../../../../presentation/hooks/generation";
import type {
  ImageToVideoFeatureConfig,
  ImageToVideoCallbacks,
  ImageToVideoResult,
  ImageToVideoOptions,
  ImageToVideoInputBuilder,
  ImageToVideoResultExtractor,
} from "../../domain/types";

interface VideoGenerationInput {
  imageUrl: string;
  prompt: string;
  options?: ImageToVideoOptions;
  creationId: string;
}

interface CreateStrategyParams {
  config: ImageToVideoFeatureConfig;
  callbacks?: ImageToVideoCallbacks;
  buildInput: ImageToVideoInputBuilder;
  extractResult?: ImageToVideoResultExtractor;
  userId: string;
  currentPrompt: string;
  creationIdRef: React.MutableRefObject<string>;
  updateState: (videoUrl: string | null, thumbnailUrl: string | null) => void;
}

export const createImageToVideoStrategy = (
  params: CreateStrategyParams,
): GenerationStrategy<VideoGenerationInput, ImageToVideoResult> => {
  const { config, callbacks, buildInput, extractResult, userId, creationIdRef, updateState } = params;

  return {
    execute: async (input) => {
      creationIdRef.current = input.creationId;

      callbacks?.onGenerationStart?.({
        creationId: input.creationId,
        type: "image-to-video",
        imageUri: input.imageUrl,
        metadata: input.options as Record<string, unknown> | undefined,
      }).catch(() => {});

      const result = await executeImageToVideo(
        { imageUri: input.imageUrl, userId, motionPrompt: input.prompt, options: input.options },
        { model: config.model, buildInput, extractResult },
      );

      if (!result.success || !result.videoUrl) {
        throw new Error(result.error || "Generation failed");
      }

      updateState(result.videoUrl ?? null, result.thumbnailUrl ?? null);

      return {
        success: true,
        videoUrl: result.videoUrl,
        thumbnailUrl: result.thumbnailUrl,
      };
    },
    getCreditCost: () => config.creditCost ?? 0,
    save: async (result) => {
      if (result.success && result.videoUrl && creationIdRef.current) {
        await callbacks?.onCreationSave?.({
          creationId: creationIdRef.current,
          type: "image-to-video",
          videoUrl: result.videoUrl,
          thumbnailUrl: result.thumbnailUrl,
          imageUri: "",
        });
      }
    },
  };
};
