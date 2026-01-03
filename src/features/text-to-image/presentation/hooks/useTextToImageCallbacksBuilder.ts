/**
 * Text-to-Image Callbacks Builder Hook
 * Creates callbacks with integrated credit, auth, and creations systems
 * Main app only provides config, package handles everything
 */

import { useCallback, useMemo, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type {
  TextToImageCallbacks,
  TextToImageGenerationRequest,
  TextToImageGenerationResult,
  NumImages,
  TextToImageInputBuilder,
} from "../../domain/types";
import { executeTextToImage } from "../../infrastructure";

export interface TextToImageCallbacksBuilderConfig {
  userId: string | null;
  isAuthenticated: boolean;
  isPremium: boolean;
  imageCredits: number;
  creditCostPerImage: number;
  model: string;
  buildInput: TextToImageInputBuilder;
  deductCredit: (type: "image" | "text") => Promise<void>;
  openPaywall: () => void;
  onNavigateToCreations?: () => void;
  saveCreation?: (imageUrl: string, prompt: string) => Promise<void>;
  invalidateCreationsQuery?: () => void;
}

export interface UseTextToImageCallbacksBuilderOptions {
  config: TextToImageCallbacksBuilderConfig;
  onSuccess?: (imageUrls: string[]) => void;
  onError?: (error: string) => void;
}

export interface UseTextToImageCallbacksBuilderReturn {
  callbacks: TextToImageCallbacks;
}

declare const __DEV__: boolean;

export function useTextToImageCallbacksBuilder(
  options: UseTextToImageCallbacksBuilderOptions,
): UseTextToImageCallbacksBuilderReturn {
  const { config, onSuccess, onError } = options;
  const queryClient = useQueryClient();
  const isGeneratingRef = useRef(false);

  const executeGeneration = useCallback(
    async (
      request: TextToImageGenerationRequest,
    ): Promise<TextToImageGenerationResult> => {
      if (!config.userId) {
        return { success: false, error: "User ID not found" };
      }

      if (isGeneratingRef.current) {
        return { success: false, error: "Generation already in progress" };
      }

      isGeneratingRef.current = true;

      try {
        const result = await executeTextToImage(
          {
            prompt: request.prompt,
            userId: config.userId,
            negativePrompt: request.negativePrompt,
            options: {
              aspectRatio: request.aspectRatio,
              size: request.size,
              numImages: request.numImages,
              guidanceScale: request.guidanceScale,
            },
          },
          {
            model: request.model || config.model,
            buildInput: config.buildInput,
          },
        );

        if (!result.success) {
          return { success: false, error: result.error || "Generation failed" };
        }

        const imageUrls =
          result.imageUrls || (result.imageUrl ? [result.imageUrl] : []);

        if (imageUrls.length === 0) {
          return { success: false, error: "No images generated" };
        }

        await config.deductCredit("image");

        return { success: true, imageUrls };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return { success: false, error: message };
      } finally {
        isGeneratingRef.current = false;
      }
    },
    [config],
  );

  const calculateCost = useCallback(
    (numImages: NumImages, _model?: string | null): number => {
      return config.creditCostPerImage * numImages;
    },
    [config.creditCostPerImage],
  );

  const checkCanAfford = useCallback(
    (cost: number): boolean => {
      if (config.isPremium) return true;
      return config.imageCredits >= cost;
    },
    [config.isPremium, config.imageCredits],
  );

  const checkIsAuthenticated = useCallback(
    (): boolean => config.isAuthenticated,
    [config.isAuthenticated],
  );

  const handleAuthRequired = useCallback(() => {
    config.openPaywall();
  }, [config]);

  const handleCreditsRequired = useCallback(
    (_cost: number) => config.openPaywall(),
    [config],
  );

  const handleSuccess = useCallback(
    async (imageUrls: string[]) => {
      if (!config.userId || imageUrls.length === 0) return;

      try {
        if (config.saveCreation) {
          for (const imageUrl of imageUrls) {
            await config.saveCreation(imageUrl, "");
          }
        }

        if (config.invalidateCreationsQuery) {
          config.invalidateCreationsQuery();
        } else {
          queryClient.invalidateQueries({ queryKey: ["creations"] });
        }

        onSuccess?.(imageUrls);
        config.onNavigateToCreations?.();
      } catch (error) {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.error("[TextToImage] Failed to save creation:", error);
        }
      }
    },
    [config, queryClient, onSuccess],
  );

  const handleError = useCallback(
    (error: string) => {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.error("[TextToImage] Generation error:", error);
      }
      onError?.(error);
    },
    [onError],
  );

  const callbacks = useMemo<TextToImageCallbacks>(
    () => ({
      executeGeneration,
      calculateCost,
      canAfford: checkCanAfford,
      isAuthenticated: checkIsAuthenticated,
      onAuthRequired: handleAuthRequired,
      onCreditsRequired: handleCreditsRequired,
      onSuccess: handleSuccess,
      onError: handleError,
    }),
    [
      executeGeneration,
      calculateCost,
      checkCanAfford,
      checkIsAuthenticated,
      handleAuthRequired,
      handleCreditsRequired,
      handleSuccess,
      handleError,
    ],
  );

  return { callbacks };
}
