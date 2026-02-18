/**
 * useProgressDismiss Hook
 * Shared progress dismiss state logic for layout components
 * Allows user to dismiss progress overlay while generation continues in background
 */

import { useState, useEffect, useCallback } from "react";

interface UseProgressDismissResult {
  /** Whether the progress overlay has been dismissed by user */
  isProgressDismissed: boolean;
  /** Dismisses the progress overlay */
  handleDismissProgress: () => void;
}

/**
 * Hook for managing progress dismiss state
 * Automatically resets dismissed state when processing starts
 * @param isProcessing - Whether the feature is currently processing
 * @returns Dismiss state and handler
 */
export function useProgressDismiss(
  isProcessing: boolean
): UseProgressDismissResult {
  const [isProgressDismissed, setIsProgressDismissed] = useState(false);

  // Reset dismissed state when processing starts
  useEffect(() => {
    if (isProcessing) {
      setIsProgressDismissed(false);
    }
  }, [isProcessing]);

  const handleDismissProgress = useCallback(() => {
    setIsProgressDismissed(true);
  }, []);

  return {
    isProgressDismissed,
    handleDismissProgress,
  };
}
