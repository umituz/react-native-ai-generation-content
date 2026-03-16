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

  // Use refs for callbacks to maintain stable function references
  const onDataCallbackRef = useRef<(creations: Creation[]) => void>();
  const onErrorCallbackRef = useRef<(err: Error) => void>();

  onDataCallbackRef.current = (creations: Creation[]) => {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[useCreations] Realtime update:", creations.length);
    }
    setData(creations);
    setIsLoading(false);
    setError(null);
  };

  onErrorCallbackRef.current = (err: Error) => {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.error("[useCreations] Realtime listener error:", err);
    }
    setError(err);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!userId || !enabled) {
      setData([]);
      setIsLoading(false);
      return;
    }

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[useCreations] Setting up realtime listener", { userId });
    }

    let isMounted = true;
    setIsLoading(true);
    setError(null);

    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const handleData = (creations: Creation[]) => {
      if (timeoutId) clearTimeout(timeoutId);
      onDataCallbackRef.current?.(creations);
    };

    const handleError = (err: Error) => {
      if (timeoutId) clearTimeout(timeoutId);
      onErrorCallbackRef.current?.(err);
    };

    const unsubscribe = repository.subscribeToAll(userId, handleData, handleError);

    // Fallback timeout: if Firestore doesn't respond in 8s, stop loading
    timeoutId = setTimeout(() => {
      if (!isMounted) return;
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.warn("[useCreations] Loading timeout - setting empty state");
      }
      setData((currentData) => currentData ?? []);
      setIsLoading(false);
    }, 8000);

    return () => {
      isMounted = false;
      if (timeoutId) clearTimeout(timeoutId);
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[useCreations] Cleaning up realtime listener");
      }
      unsubscribe();
    };
  }, [userId, repository, enabled]);

  return { data, isLoading, error, refetch };
}
