/**
 * usePhotoBlockingGeneration Handlers
 * Success and error handlers for photo blocking generation
 */

import type { CreationPersistence } from "../../infrastructure/utils/creation-persistence.util";

interface HandleSuccessProps {
  readonly creationIdRef: React.MutableRefObject<string | null>;
  readonly userId: string | undefined;
  readonly persistence: CreationPersistence;
  readonly deductCredits?: (cost: number) => Promise<boolean>;
  readonly creditCost?: number;
  readonly onSuccess?: (result: unknown) => void;
  readonly onCreditsExhausted?: () => void;
}

interface HandleErrorProps {
  readonly creationIdRef: React.MutableRefObject<string | null>;
  readonly userId: string | undefined;
  readonly persistence: CreationPersistence;
  readonly onError?: (error: string) => void;
}

export function createSuccessHandler(props: HandleSuccessProps) {
  const {
    creationIdRef,
    userId,
    persistence,
    deductCredits,
    creditCost,
    onSuccess,
    onCreditsExhausted,
  } = props;

  return async (result: unknown) => {
    const typedResult = result as { imageUrl?: string; videoUrl?: string; audioUrl?: string; logSessionId?: string };
    const creationId = creationIdRef.current;
    const resultUri = typedResult.imageUrl || typedResult.videoUrl || typedResult.audioUrl;

    if (creationId && userId && resultUri) {
      try {
        await persistence.updateToCompleted(userId, creationId, {
          uri: resultUri,
          imageUrl: typedResult.imageUrl,
          videoUrl: typedResult.videoUrl,
          audioUrl: typedResult.audioUrl,
          logSessionId: typedResult.logSessionId,
        });
      } catch (err) {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.error("[PhotoBlockingGeneration] updateToCompleted error:", err);
        }
      }
    }

    creationIdRef.current = null;

    // Deduct credits after successful generation
    if (deductCredits && creditCost) {
      try {
        const deducted = await deductCredits(creditCost);
        if (!deducted) {
          onCreditsExhausted?.();
        }
      } catch (err) {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.error("[PhotoBlockingGeneration] deductCredits error:", err);
        }
      }
    }

    onSuccess?.(result);
  };
}

export function createErrorHandler(props: HandleErrorProps) {
  const { creationIdRef, userId, persistence, onError } = props;

  return async (err: { message: string; originalError?: Error & { logSessionId?: string } }) => {
    const creationId = creationIdRef.current;
    const logSessionId = err.originalError?.logSessionId;

    if (creationId && userId) {
      try {
        await persistence.updateToFailed(userId, creationId, err.message, logSessionId);
      } catch (updateErr) {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.error("[PhotoBlockingGeneration] updateToFailed error:", updateErr);
        }
      }
    }

    creationIdRef.current = null;
    onError?.(err.message);
  };
}
