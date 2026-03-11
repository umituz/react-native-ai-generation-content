/**
 * Image Generation Executor Hook (Template Method Pattern)
 *
 * Encapsulates the full generation lifecycle:
 *   auth → credit deduction → provider resolution → AI generation → creation save → error/refund
 *
 * Consumers provide only domain-specific logic via config:
 *   - buildInput: prompt, params, target (model + provider)
 *   - buildMetadata: creation metadata
 *
 * Auth and credit services come from GenerationServicesProvider context.
 */

import { useState, useCallback, useMemo } from "react";
import { useGenerationServices } from "../../../infrastructure/providers/generation-services.provider";
import { resolveProvider } from "../../../infrastructure/services/provider-resolver";
import { createCreationsRepository } from "../../../domains/creations/infrastructure/adapters";
import { preprocessImageInputs } from "../../../infrastructure/utils/image-input-preprocessor.util";

/** Target for generation: which model on which provider */
export interface GenerationTarget {
  readonly model: string;
  readonly providerId: string;
}

/** Domain-specific generation input returned by buildInput */
export interface GenerationInput {
  /** Which model + provider to use */
  readonly target: GenerationTarget;
  /** The prompt (stored in creation record) */
  readonly prompt: string;
  /** Full params passed to provider.subscribe() */
  readonly params: Record<string, unknown>;
}

/** Provider-agnostic AI image result */
export interface AIImageResult {
  readonly images: ReadonlyArray<{ readonly url: string }>;
}

/** Default credit cost for image generation */
const DEFAULT_IMAGE_CREDIT_COST = 2;

export interface ImageGenerationExecutorConfig<P> {
  /** Creation type stored in Firestore (e.g. "aging", "retouch") */
  readonly type: string;
  /** Credit cost per generation. Defaults to 2. */
  readonly creditCost?: number;
  /** Whether to call onGenerationSuccess after completion */
  readonly trackRating?: boolean;
  /** Build AI generation input from domain-specific params. May be async. */
  readonly buildInput: (params: P) => Promise<GenerationInput> | GenerationInput;
  /** Build domain-specific metadata for the creation record */
  readonly buildMetadata?: (params: P) => Record<string, unknown>;
}

export interface ImageGenerationExecutorReturn<P> {
  readonly execute: (params: P) => Promise<string | null>;
  readonly isLoading: boolean;
  readonly error: string | null;
}

export function useImageGenerationExecutor<P>(
  config: ImageGenerationExecutorConfig<P>,
): ImageGenerationExecutorReturn<P> {
  const { userId, deductCredits, refundCredits, onGenerationSuccess } =
    useGenerationServices();
  const repository = useMemo(
    () => createCreationsRepository("creations"),
    [],
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = useCallback(
    async (params: P): Promise<string | null> => {
      if (!userId || isLoading) return null;

      setError(null);
      setIsLoading(true);
      let deducted = false;
      const cost = config.creditCost ?? DEFAULT_IMAGE_CREDIT_COST;

      try {
        const creditSuccess = await deductCredits(cost);
        if (!creditSuccess) {
          setError("Insufficient credits");
          return null;
        }
        deducted = true;

        const input = await config.buildInput(params);
        const provider = resolveProvider(input.target.providerId);
        const processedParams = await preprocessImageInputs(input.params);
        const result = (await provider.subscribe(
          input.target.model,
          processedParams,
        )) as AIImageResult;

        const imageUrl = result?.images?.[0]?.url;
        if (!imageUrl) throw new Error("No image returned");

        await repository.create(userId, {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
          type: config.type,
          uri: imageUrl,
          createdAt: new Date(),
          isShared: false,
          isFavorite: false,
          status: "completed",
          output: { imageUrl },
          model: input.target.model,
          prompt: input.prompt,
          metadata: config.buildMetadata?.(params) ?? {},
        });

        if (config.trackRating && onGenerationSuccess) {
          void onGenerationSuccess();
        }

        return imageUrl;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Generation failed";
        setError(message);
        if (deducted) {
          try {
            await refundCredits(cost);
          } catch {
            if (typeof __DEV__ !== "undefined" && __DEV__) {
              console.error(`[${config.type}] Refund failed`);
            }
          }
        }
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.error(`[${config.type}]`, err);
        }
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [
      userId,
      isLoading,
      config,
      deductCredits,
      refundCredits,
      repository,
      onGenerationSuccess,
    ],
  );

  return { execute, isLoading, error };
}
