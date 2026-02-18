/**
 * Video Generation Helpers
 * Generic helper functions for video generation features
 */

/**
 * Alert function type for displaying messages
 */
export type VideoAlertFunction = (title: string, message: string) => void;

/**
 * Navigation function type for success actions
 */
type VideoNavigationFunction = () => void;

/**
 * Default no-op alert function
 */
const noOpAlert: VideoAlertFunction = () => {
  // No-op for environments without alerts
};

/**
 * Show video generation success
 * Supports both alert-based and navigation-based success handling
 */
export function showVideoGenerationSuccess(
  onViewProjects?: VideoNavigationFunction | VideoAlertFunction,
  onEditVideo?: VideoNavigationFunction,
): void {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
     
    console.log("[VideoGeneration] Success");
  }

  // If both callbacks are provided, they're navigation functions
  if (onViewProjects && onEditVideo) {
    // This is the navigation pattern - no alert needed
    // The app will handle navigation
    return;
  }

  // If only one callback is provided, treat it as an alert function
  if (onViewProjects && typeof onViewProjects === "function") {
    const showAlert = onViewProjects as VideoAlertFunction;
    showAlert("Success", "Your video has been generated successfully!");
  }
}

/**
 * Handle generation error
 */
export function handleGenerationError(
  error: Error | unknown,
  showAlert: VideoAlertFunction = noOpAlert
): void {
  const message = error instanceof Error ? error.message : "An error occurred";

  if (typeof __DEV__ !== "undefined" && __DEV__) {
     
    console.error("[VideoGeneration] Error:", error);
  }

  showAlert("Error", `Video generation failed: ${message}`);
}

/**
 * Show content moderation warning
 */
export function showContentModerationWarning(
  showAlert: VideoAlertFunction = noOpAlert,
  reason?: string
): void {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
     
    console.warn("[VideoGeneration] Content moderation warning:", reason);
  }

  showAlert(
    "Content Warning",
    reason || "Your content may not comply with our content policy. Please review and try again."
  );
}
