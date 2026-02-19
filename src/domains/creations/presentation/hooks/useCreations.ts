/**
 * useCreations Hook
 * Realtime Firestore listener for user's creations
 * Auto-updates UI when Firestore data changes
 */

import { useState, useEffect, useCallback } from "react";
import type { ICreationsRepository } from "../../domain/repositories/ICreationsRepository";
import type { Creation } from "../../domain/entities/Creation";


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

  const onDataCallback = useCallback((creations: Creation[]) => {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[useCreations] Realtime update:", creations.length);
    }
    setData(creations);
    setIsLoading(false);
    setError(null);
  }, []);

  const onErrorCallback = useCallback((err: Error) => {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.error("[useCreations] Realtime listener error:", err);
    }
    setError(err);
    setIsLoading(false);
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

    const unsubscribe = repository.subscribeToAll(userId, onDataCallback, onErrorCallback);

    // Fallback timeout: if Firestore doesn't respond in 10s, stop loading
    const timeoutId = setTimeout(() => {
      setIsLoading((prev) => {
        if (prev) {
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.warn("[useCreations] Loading timeout - setting empty state");
          }
          setData((currentData) => currentData ?? []);
          return false;
        }
        return prev;
      });
    }, 10000);

    return () => {
      clearTimeout(timeoutId);
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[useCreations] Cleaning up realtime listener");
      }
      unsubscribe();
    };
  }, [userId, repository, enabled]); // onDataCallback/onErrorCallback intentionally omitted - stable memoized refs

  return { data, isLoading, error, refetch };
}
