/**
 * useCreationRating Hook
 * Handles rating of creations
 * Realtime listener handles UI updates automatically
 */

import { useState, useCallback } from "react";
import type { ICreationsRepository } from "../../domain/repositories/ICreationsRepository";

declare const __DEV__: boolean;

interface UseCreationRatingProps {
  readonly userId: string | null;
  readonly repository: ICreationsRepository;
}

interface RatingVariables {
  readonly id: string;
  readonly rating: number;
  readonly description?: string;
}

interface UseCreationRatingReturn {
  readonly mutate: (variables: RatingVariables) => void;
  readonly mutateAsync: (variables: RatingVariables) => Promise<boolean>;
  readonly isPending: boolean;
}

export function useCreationRating({
  userId,
  repository,
}: UseCreationRatingProps): UseCreationRatingReturn {
  const [isPending, setIsPending] = useState(false);

  const mutateAsync = useCallback(
    async ({ id, rating, description }: RatingVariables): Promise<boolean> => {
      if (!userId) return false;

      setIsPending(true);
      try {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[useCreationRating] Rating:", { id, rating });
        }
        const result = await repository.rate(userId, id, rating, description);
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[useCreationRating] Rate result:", result);
        }
        return result;
      } catch (error) {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.error("[useCreationRating] Error:", error);
        }
        return false;
      } finally {
        setIsPending(false);
      }
    },
    [userId, repository],
  );

  const mutate = useCallback(
    (variables: RatingVariables): void => {
      void mutateAsync(variables);
    },
    [mutateAsync],
  );

  return { mutate, mutateAsync, isPending };
}
