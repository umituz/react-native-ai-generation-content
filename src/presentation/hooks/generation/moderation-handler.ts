/**
 * Moderation Handler
 * Handles content moderation logic for generation
 */

import { createGenerationError, parseError, getAlertMessage } from "./errors";
import type { GenerationError, ModerationCallbacks, AlertMessages } from "./types";

interface ModerationHandlerParams<TInput, TResult> {
  readonly input: TInput;
  readonly moderation: ModerationCallbacks | undefined;
  readonly alertMessages: AlertMessages;
  readonly isMountedRef: React.MutableRefObject<boolean>;
  readonly isGeneratingRef: React.MutableRefObject<boolean>;
  readonly setState: (state: { status: string; isGenerating: boolean; result: TResult | null; error: GenerationError | null }) => void;
  readonly resetState: () => void;
  readonly executeGeneration: (input: TInput) => Promise<TResult>;
  readonly showError: (title: string, message: string) => void;
  readonly onError?: (error: GenerationError) => void;
  readonly handleLifecycleComplete: (status: "success" | "error", result?: TResult, error?: GenerationError) => void;
}

export async function handleModeration<TInput, TResult>(
  params: ModerationHandlerParams<TInput, TResult>,
): Promise<TResult | undefined> {
  const {
    input,
    moderation,
    alertMessages,
    isMountedRef,
    isGeneratingRef,
    setState,
    resetState,
    executeGeneration,
    showError,
    onError,
    handleLifecycleComplete,
  } = params;

  if (!moderation) {
    return executeGeneration(input);
  }

  setState({ status: "moderating", isGenerating: true, result: null, error: null });
  const moderationResult = await moderation.checkContent(input);

  if (!moderationResult.allowed && moderationResult.warnings.length > 0) {
    if (moderation.onShowWarning) {
      moderation.onShowWarning(
        moderationResult.warnings,
        () => {
          isGeneratingRef.current = false;
          if (isMountedRef.current) resetState();
        },
        () => {
          // Return the promise to allow proper error handling chain
          return executeGeneration(input).catch((err) => {
            const error = parseError(err);
            if (isMountedRef.current) {
              setState({ status: "error", isGenerating: false, result: null, error });
            }
            showError("Error", getAlertMessage(error, alertMessages));
            onError?.(error);
            handleLifecycleComplete("error", undefined, error);
            throw error; // Re-throw to allow caller to handle
          }).finally(() => {
            isGeneratingRef.current = false;
          });
        },
      );
      return undefined;
    }
    throw createGenerationError("policy", alertMessages.policyViolation);
  }

  return executeGeneration(input);
}
