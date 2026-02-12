/**
 * Content Validation Utilities
 */

import {
  MAX_PROMPT_LENGTH,
  MIN_PROMPT_LENGTH,
  MAX_URL_LENGTH,
  MIN_VIDEO_DURATION_SECONDS,
  MAX_VIDEO_DURATION_SECONDS,
} from "../constants/validation.constants";
import type { ValidationResult } from "./validation-types";

/**
 * Validates text prompt length
 */
export function validatePrompt(prompt: string): ValidationResult {
  if (!prompt || typeof prompt !== "string") {
    return { isValid: false, error: "Prompt is required" };
  }

  if (prompt.length < MIN_PROMPT_LENGTH) {
    return { isValid: false, error: "Prompt is too short" };
  }

  if (prompt.length > MAX_PROMPT_LENGTH) {
    return { isValid: false, error: "Prompt is too long" };
  }

  return { isValid: true };
}

/**
 * Validates URL format
 */
export function validateUrl(url: string): ValidationResult {
  if (!url || typeof url !== "string") {
    return { isValid: false, error: "URL is required" };
  }

  if (url.length > MAX_URL_LENGTH) {
    return { isValid: false, error: "URL is too long" };
  }

  try {
    new URL(url);
    return { isValid: true };
  } catch {
    return { isValid: false, error: "Invalid URL format" };
  }
}

/**
 * Validates video duration
 */
export function validateVideoDuration(duration: number): ValidationResult {
  if (typeof duration !== "number" || isNaN(duration)) {
    return { isValid: false, error: "Duration must be a number" };
  }

  if (duration < MIN_VIDEO_DURATION_SECONDS) {
    return {
      isValid: false,
      error: `Duration must be at least ${MIN_VIDEO_DURATION_SECONDS} seconds`,
    };
  }

  if (duration > MAX_VIDEO_DURATION_SECONDS) {
    return {
      isValid: false,
      error: `Duration must not exceed ${MAX_VIDEO_DURATION_SECONDS} seconds`,
    };
  }

  return { isValid: true };
}

/**
 * Validates email format
 */
export function validateEmail(email: string): ValidationResult {
  if (!email || typeof email !== "string") {
    return { isValid: false, error: "Email is required" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: "Invalid email format" };
  }

  return { isValid: true };
}
