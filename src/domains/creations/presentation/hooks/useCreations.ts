/**
 * useCreations Hook
 * Realtime Firestore listener for user's creations
 * Auto-updates UI when Firestore data changes
 */

import { useState, useEffect, useCallback } from "react";
import type { ICreationsRepository } from "../../domain/repositories/ICreationsRepository";
import type { Creation } from "../../domain/entities/Creation";

declare const __DEV__: boolean;

interface UseCreationsProps {
  readonly userId: string | null;
  readonly repository: ICreationsRepository;
  readonly enabled?: boolean;
}

interface UseCreationsReturn {
  readonly data: Creation[] | undefined;
  readonly isLoading: boolean;
  readonly error: Error | null;
  readonly refetch: () => void;
}

export function useCreations({
  userId,
  repository,
  enabled = true,
}: UseCreationsProps): UseCreationsReturn {
  const [data, setData] = useState<Creation[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = useCallback(() => {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[useCreations] refetch() - realtime listener handles updates");
    }
  }, []);

  useEffect(() => {
    if (!userId || !enabled) {
      setData([]);
      setIsLoading(false);
      return;
    }

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[useCreations] Setting up realtime listener", { userId });
    }

    setIsLoading(true);
    setError(null);

    const unsubscribe = repository.subscribeToAll(
      userId,
      (creations) => {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[useCreations] Realtime update:", creations.length);
        }
        setData(creations);
        setIsLoading(false);
        setError(null);
      },
      (err) => {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.error("[useCreations] Realtime listener error:", err);
        }
        setError(err);
        setIsLoading(false);
      },
    );

    return () => {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[useCreations] Cleaning up realtime listener");
      }
      unsubscribe();
    };
  }, [userId, repository, enabled]);

  return { data, isLoading, error, refetch };
}
