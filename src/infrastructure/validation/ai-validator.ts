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

  const trimmed = input.trim();

  // Validate HTTP/HTTPS URLs
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return validateURL(trimmed);
  }

  // Validate data URI format
  if (trimmed.startsWith("data:image/")) {
    const parts = trimmed.split(",");
    if (parts.length !== 2) {
      return { isValid: false, errors: ["Invalid data URI format"] };
    }
    const base64Part = parts[1];
    if (!base64Part || base64Part.length === 0) {
      return { isValid: false, errors: ["Invalid data URI: missing base64 data"] };
    }
    return validateBase64(base64Part);
  }

  // Validate standalone base64 string (fallback)
  const base64Result = validateBase64(trimmed);
  if (base64Result.isValid) {
    return base64Result;
  }

  return {
    isValid: false,
    errors: ["Image data must be a URL, base64 data URI, or valid base64 string"],
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
