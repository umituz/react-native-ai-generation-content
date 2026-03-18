/**
 * Image Generation Executor - Utilities
 * Utility functions for image generation execution
 */

import {
  BASE64_IMAGE_PREFIX,
} from "./wizard-strategy.constants";

export function formatBase64(base64: string): string {
  return base64.startsWith("data:") ? base64 : `${BASE64_IMAGE_PREFIX}${base64}`;
}
