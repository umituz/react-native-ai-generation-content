/**
 * Audio Generation Executor Hook (Template Method Pattern)
 *
 * Mirrors useImageGenerationExecutor but for TTS/audio generation.
 * Encapsulates: auth → credit deduction → provider call → creation save → error/refund
 *
 * Consumers provide domain-specific logic via config:
 *   - buildInput: text, voice, target (model + provider)
 *   - buildMetadata: creation metadata
 */

import { useState, useCallback } from "react";
import { useGenerationServices } from "../../../infrastructure/providers/generation-services.provider";
import { resolveProvider } from "../../../infrastructure/services/provider-resolver";
import { getCreationsRepository } from "./repositorySingleton";
import type { GenerationTarget } from "./useImageGenerationExecutor";
import { handleCreditRefund, logGenerationError, generateCreationId } from "./generation-execution.utils";

/** Domain-specific audio generation input returned by buildInput */
export interface AudioGenerationInput {
  /** Which model + provider to use */
  readonly target: GenerationTarget;
  /** The text being converted to speech (stored in creation record) */
  readonly prompt: string;
  /** Full params passed to provider.subscribe() */
  readonly params: Record<string, unknown>;
}

/** Provider-agnostic AI audio result */
interface AIAudioResult {
  readonly audio?: { readonly url: string };
  readonly audio_url?: string;
  readonly url?: string;
}

/** Default credit cost for audio generation */
const DEFAULT_AUDIO_CREDIT_COST = 1;

export interface AudioGenerationExecutorConfig<P> {
  /** Creation type stored in Firestore (e.g. "voice-generator") */
  readonly type: string;
  /** Credit cost per generation. Defaults to 1. */
  readonly creditCost?: number;
  /** Whether to call onGenerationSuccess after completion */
  readonly trackRating?: boolean;
  /** Build AI generation input from domain-specific params. May be async. */
  readonly buildInput: (params: P) => Promise<AudioGenerationInput> | AudioGenerationInput;
  /** Build domain-specific metadata for the creation record */
  readonly buildMetadata?: (params: P) => Record<string, unknown>;
}

export interface AudioGenerationExecutorReturn<P> {
  readonly execute: (params: P) => Promise<string | null>;
  readonly isLoading: boolean;
  readonly error: string | null;
}

export function useAudioGenerationExecutor<P>(
  config: AudioGenerationExecutorConfig<P>,
): AudioGenerationExecutorReturn<P> {
  const { userId, deductCredits, refundCredits, onGenerationSuccess } =
    useGenerationServices();
  const repository = getCreationsRepository();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = useCallback(
    async (params: P): Promise<string | null> => {
      if (!userId || isLoading) return null;

      setError(null);
      setIsLoading(true);
      let deducted = false;
      const cost = config.creditCost ?? DEFAULT_AUDIO_CREDIT_COST;

      try {
        const creditSuccess = await deductCredits(cost);
        if (!creditSuccess) {
          setError("Insufficient credits");
          return null;
        }
        deducted = true;

        const input = await config.buildInput(params);
        const provider = resolveProvider(input.target.providerId);
        const result = (await provider.subscribe(
          input.target.model,
          input.params,
        )) as AIAudioResult;

        // Extract audio URL — FAL returns { audio: { url } }, some models { audio_url } or { url }
        const audioUrl = result?.audio?.url ?? result?.audio_url ?? result?.url;
        if (!audioUrl) throw new Error("No audio returned");

        await repository.create(userId, {
          id: generateCreationId(),
          type: config.type,
          uri: audioUrl,
          createdAt: new Date(),
          isShared: false,
          isFavorite: false,
          status: "completed",
          output: { audioUrl },
          model: input.target.model,
          prompt: input.prompt,
          metadata: config.buildMetadata?.(params) ?? {},
        });

        if (config.trackRating && onGenerationSuccess) {
          void onGenerationSuccess();
        }

        return audioUrl;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Generation failed";
        setError(message);

        if (deducted) {
          await handleCreditRefund(refundCredits, cost, config.type);
        }

        logGenerationError(config.type, err);
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
