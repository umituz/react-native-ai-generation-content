/**
 * Image Content Moderator
 * Validates and moderates image URIs using shared validation utilities
 */

import type { Violation } from "../../../domain/entities/moderation.types";
import { BaseModerator, type ModerationResult } from "./base.moderator";
import { DEFAULT_PROTOCOLS, DEFAULT_MAX_URI_LENGTH } from "../../constants/moderation.constants";
import { validateUrl, validateString, validateRequiredFields } from "../../../../../shared-kernel/infrastructure/validation";

class ImageModerator extends BaseModerator {
  private allowedProtocols: readonly string[] = DEFAULT_PROTOCOLS;
  private maxUriLength = DEFAULT_MAX_URI_LENGTH;

  setAllowedProtocols(protocols: string[]): void {
    this.allowedProtocols = protocols;
  }

  setMaxUriLength(length: number): void {
    this.maxUriLength = length;
  }

  moderate(imageUri: string): ModerationResult {
    const validationError = this.validate(imageUri);
    if (validationError) {
      return { isAllowed: false, violations: [validationError] };
    }

    return { isAllowed: true, violations: [] };
  }

  private validate(uri: string): Violation | null {
    // Use shared validation utilities
    const requiredValidation = validateRequiredFields({ uri }, ['uri']);
    if (!requiredValidation.isValid) {
      return this.createViolation("empty-uri", "Image Validation", "empty URI");
    }

    // Use shared URL validation
    const urlValidation = validateUrl(uri);
    if (!urlValidation.isValid) {
      if ('required' in urlValidation.errors) {
        return this.createViolation("empty-uri", "Image Validation", "empty URI");
      }
      if ('pattern' in urlValidation.errors) {
        return this.createViolation(
          "invalid-protocol",
          "Image Validation",
          "invalid protocol"
        );
      }
    }

    // Use shared string validation for length
    const lengthValidation = validateString(uri, {
      maxLength: this.maxUriLength,
    });

    if (!lengthValidation.isValid) {
      if ('maxLength' in lengthValidation.errors) {
        return this.createViolation(
          "uri-too-long",
          "Image Validation",
          "URI too long"
        );
      }
    }

    // Custom protocol check
    if (!this.hasValidProtocol(uri)) {
      return this.createViolation(
        "invalid-protocol",
        "Image Validation",
        "invalid protocol"
      );
    }

    return null;
  }

  private hasValidProtocol(uri: string): boolean {
    return this.allowedProtocols.some((protocol) =>
      uri.toLowerCase().startsWith(protocol)
    );
  }
}

export const imageModerator = new ImageModerator();
