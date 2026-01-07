/**
 * Image-to-Video Validation Utilities
 */

import type { ImageToVideoFeatureCallbacks, ImageToVideoResult } from "../../domain/types";

declare const __DEV__: boolean;

export interface ValidationResult extends ImageToVideoResult {
  shouldProceed: boolean;
}

export async function validateImageToVideoGeneration(
  effectiveImageUri: string | null,
  callbacks?: ImageToVideoFeatureCallbacks,
  creditCost?: number,
): Promise<ValidationResult> {
  if (!effectiveImageUri) {
    const error = "Image is required";
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[ImageToVideoFeature] Generate failed: Image is required");
    }
    callbacks?.onError?.(error);
    return { success: false, error, shouldProceed: false };
  }

  if (callbacks?.onAuthCheck && !callbacks.onAuthCheck()) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[ImageToVideoFeature] Generate failed: Authentication required");
    }
    return { success: false, error: "Authentication required", shouldProceed: false };
  }

  if (callbacks?.onCreditCheck && creditCost) {
    const hasCredits = await callbacks.onCreditCheck(creditCost);
    if (!hasCredits) {
      callbacks?.onShowPaywall?.(creditCost);
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[ImageToVideoFeature] Generate failed: Insufficient credits");
      }
      return { success: false, error: "Insufficient credits", shouldProceed: false };
    }
  }

  return { success: true, shouldProceed: true };
}
