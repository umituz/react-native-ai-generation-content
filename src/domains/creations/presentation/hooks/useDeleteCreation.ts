/**
 * useDeleteCreation Hook
 * Handles deletion of user creations
 * Realtime listener handles UI updates automatically
 */

import { useState, useCallback } from "react";
import type { ICreationsRepository } from "../../domain/repositories/ICreationsRepository";


interface UseDeleteCreationProps {
  readonly userId: string | null;
  readonly repository: ICreationsRepository;
}

interface UseDeleteCreationReturn {
  readonly mutate: (creationId: string) => void;
  readonly mutateAsync: (creationId: string) => Promise<boolean>;
  readonly isPending: boolean;
}

export function useDeleteCreation({
  userId,
  repository,
}: UseDeleteCreationProps): UseDeleteCreationReturn {
  const [isPending, setIsPending] = useState(false);

  const mutateAsync = useCallback(
    async (creationId: string): Promise<boolean> => {
      if (!userId) return false;

      setIsPending(true);
      try {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[useDeleteCreation] Deleting:", creationId);
        }
        const result = await repository.delete(userId, creationId);
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[useDeleteCreation] Delete result:", result);
        }
        return result;
      } catch (error) {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.error("[useDeleteCreation] Error:", error);
        }
        return false;
      } finally {
        setIsPending(false);
      }
    },
    [userId, repository],
  );

  const mutate = useCallback(
    (creationId: string): void => {
      void mutateAsync(creationId);
    },
    [mutateAsync],
  );

  return { mutate, mutateAsync, isPending };
}
