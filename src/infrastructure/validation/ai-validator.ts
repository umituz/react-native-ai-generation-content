/**
 * AI-Specific Validation Utilities
 * Validators for AI generation prompts and image data
 */

import {
  MAX_PROMPT_LENGTH,
  MIN_PROMPT_LENGTH,
} from "../constants/validation.constants";
import { validateString, validateURL, validateBase64, type ValidationResult, type StringValidationOptions } from "./base-validator";

/**
 * Validates prompt/input text for AI generation
 */
export function validateAIPrompt(input: unknown): ValidationResult {
  const options: StringValidationOptions = {
    minLength: MIN_PROMPT_LENGTH,
    maxLength: MAX_PROMPT_LENGTH,
    trim: true,
  };
  return validateString(input, options);
}

/**
 * Validates image data (base64 or URL)
 */
export function validateImageData(input: unknown): ValidationResult {
  if (typeof input !== "string") {
    return { isValid: false, errors: ["Image data must be a string"] };
  }

  if (input.startsWith("http://") || input.startsWith("https://")) {
    return validateURL(input);
  }

  if (input.startsWith("data:image/")) {
    const base64Part = input.split(",")[1];
    if (!base64Part) {
      return { isValid: false, errors: ["Invalid data URI format"] };
    }
    return validateBase64(base64Part);
  }

  return {
    isValid: false,
    errors: ["Image data must be a URL or base64 data URI"],
  };
}

/**
 * Validates video URL
 */
export function validateVideoUrl(input: unknown): ValidationResult {
  if (typeof input !== "string") {
    return { isValid: false, errors: ["Video URL must be a string"] };
  }

  const urlResult = validateURL(input);
  if (!urlResult.isValid) {
    return urlResult;
  }

  const url = new URL(input);
  const validExtensions = [".mp4", ".mov", ".webm", ".gif"];
  const hasValidExtension = validExtensions.some((ext) =>
    url.pathname.toLowerCase().endsWith(ext)
  );

  if (!hasValidExtension) {
    return {
      isValid: false,
      errors: ["Video URL must have a valid video extension"],
    };
  }

  return { isValid: true, errors: [] };
}
