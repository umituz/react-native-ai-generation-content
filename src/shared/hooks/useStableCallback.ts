/**
 * useStableCallback Hook
 * Returns a memoized callback that only changes when dependencies change
 * Prevents unnecessary re-renders and child component updates
 */

import { useCallback, useRef } from "react";

export function useStableCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  deps: React.DependencyList
): T {
  const callbackRef = useRef(callback);
  const depsRef = useRef(deps);

  // Check if dependencies actually changed
  const depsChanged = deps.length !== depsRef.current.length ||
    deps.some((dep, i) => dep !== depsRef.current[i]);

  if (depsChanged) {
    callbackRef.current = callback;
    depsRef.current = [...deps];
  }

  // Return stable reference
  return useCallback((...args: Parameters<T>) => {
    return callbackRef.current(...args);
  }, []) as T;
}

/**
 * useThrottledCallback Hook
 * Returns a throttled version of the callback
 */

import { throttle } from "../utils/debounce.util";

export function useThrottledCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  wait: number,
  deps: React.DependencyList
): T {
  const throttledRef = useRef<ReturnType<typeof throttle<T>> | undefined>(undefined);

  // Recreate throttled function when dependencies change
  if (!throttledRef.current || deps.some((dep, i) => dep !== (throttledRef.current as unknown as { deps: React.DependencyList }).deps?.[i])) {
    throttledRef.current = throttle(callback, wait) as unknown as ReturnType<typeof throttle<T>>;
    (throttledRef.current as unknown as { deps: React.DependencyList }).deps = [...deps];
  }

  return (throttledRef.current as unknown as T);
}

/**
 * useDebouncedCallback Hook
 * Returns a debounced version of the callback
 */

import { debounce } from "../utils/debounce.util";

export function useDebouncedCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  wait: number,
  deps: React.DependencyList
): T {
  const debouncedRef = useRef<ReturnType<typeof debounce<T>> | undefined>(undefined);

  // Recreate debounced function when dependencies change
  if (!debouncedRef.current || deps.some((dep, i) => dep !== (debouncedRef.current as unknown as { deps: React.DependencyList }).deps?.[i])) {
    debouncedRef.current = debounce(callback, wait) as unknown as ReturnType<typeof debounce<T>>;
    (debouncedRef.current as unknown as { deps: React.DependencyList }).deps = [...deps];
  }

  return (debouncedRef.current as unknown as T);
}
