
import { useCallback } from "react";
import { useImageGeneration } from "./useImageGeneration";
import { useVideoGeneration } from "./useVideoGeneration";
import { executeImageToVideo } from "../../../features/image-to-video";
import { executeTextToVideo } from "../../../features/text-to-video";
import { useGenerationOrchestrator } from "./orchestrator";
import { prepareImage } from "../../../infrastructure/utils";
import type { AIFeatureId } from "../../screens/ai-feature/types";
import type { ImageFeatureType, VideoFeatureType } from "../../../domain/interfaces";
import type { AlertMessages, GenerationError } from "./types";

interface FeatureGenerationConfig {
  featureType: AIFeatureId;
  userId?: string;
  alertMessages: AlertMessages;
  onSuccess?: (result: string) => void;
  onError?: (error: GenerationError) => void;
  creditCost?: number;
  onCreditsExhausted?: () => void;
}

export function useAIFeatureGeneration({
  featureType,
  userId,
  alertMessages,
  onSuccess,
  onError,
  creditCost = 1,
  onCreditsExhausted,
}: FeatureGenerationConfig) {

  // Hook for standard image features
  const { generate: generateImage } = useImageGeneration({
    featureType: featureType as ImageFeatureType,
    userId,
    processResult: (imageUrl) => imageUrl,
    alertMessages,
    onSuccess,
    onError,
    creditCost,
    onCreditsExhausted,
  });

  // Hook for standard video features (ai-hug, ai-kiss)
  const { generate: generateVideo } = useVideoGeneration({
    featureType: featureType as VideoFeatureType,
    userId,
    processResult: (videoUrl) => videoUrl,
    alertMessages,
    onSuccess,
    onError,
    creditCost,
    onCreditsExhausted,
  });

  // Orchestrator for Image-to-Video
  const { generate: generateImageToVideo } = useGenerationOrchestrator(
    {
      execute: async (input: { imageUri: string; prompt: string; duration: number }, onProgress) => {
        const result = await executeImageToVideo(
          {
            imageUri: input.imageUri, // Pass URI directly
            imageBase64: await prepareImage(input.imageUri), 
            motionPrompt: input.prompt,
            options: { duration: input.duration },
            userId: userId || "anonymous",
          },
          {
            model: "kling-video", // Default or hardcoded for now, ideal to get from config
            buildInput: (image, prompt, opts) => ({
              image,
              prompt,
              ...opts
            }),
            onProgress,
          }
        );
        if (!result.success || !result.videoUrl) throw new Error(result.error || "Generation failed");
        return result.videoUrl;
      },
      getCreditCost: () => creditCost,
    },
    { userId, alertMessages, onSuccess, onError, onCreditsExhausted }
  );

  // Orchestrator for Text-to-Video
  const { generate: generateTextToVideo } = useGenerationOrchestrator(
    {
      execute: async (input: { prompt: string; duration: number }, onProgress) => {
        const result = await executeTextToVideo(
          {
            prompt: input.prompt,
            options: { duration: input.duration },
            userId: userId || "anonymous",
          },
          {
            model: "kling-video", // Default
            buildInput: (prompt, opts) => ({ prompt, ...opts }),
            onProgress,
          }
        );
        if (!result.success || !result.videoUrl) throw new Error(result.error || "Generation failed");
        return result.videoUrl;
      },
      getCreditCost: () => creditCost,
    },
    { userId, alertMessages, onSuccess, onError, onCreditsExhausted }
  );

  const generate = useCallback(async (data: {
    prompt: string;
    style: string;
    duration: number;
    images: { uri: string }[];
  }) => {
    switch (featureType) {
      case "image-to-video":
        if (!data.images[0]?.uri) throw new Error("Image required for image-to-video");
        return await generateImageToVideo({ 
          imageUri: data.images[0].uri, 
          prompt: data.prompt, 
          duration: data.duration 
        });

      case "text-to-video":
        return await generateTextToVideo({ 
          prompt: data.prompt, 
          duration: data.duration 
        });

      case "ai-hug":
      case "ai-kiss":
        if (data.images.length < 2) throw new Error("Two images required");
        return await generateVideo({
          sourceImageBase64: await prepareImage(data.images[0].uri),
          targetImageBase64: await prepareImage(data.images[1].uri),
        });

      default:
        // Default to Image Generation
        if (data.images.length > 0) {
           // Single or dual image
           if (data.images.length === 2 && (featureType === "face-swap")) {
              return await generateImage({
                sourceImageBase64: await prepareImage(data.images[0].uri),
                targetImageBase64: await prepareImage(data.images[1].uri),
                options: { style: data.style }
              });
           }
           // Single image features
           return await generateImage({
             imageBase64: await prepareImage(data.images[0].uri),
             prompt: data.prompt,
             options: { style: data.style }
           });
        }
        throw new Error(`Unsupported feature or missing input: ${featureType}`);
    }
  }, [featureType, generateImage, generateVideo, generateImageToVideo, generateTextToVideo]);

  return { generate };
}
