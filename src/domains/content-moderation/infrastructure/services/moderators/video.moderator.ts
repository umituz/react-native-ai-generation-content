/**
 * Video Content Moderator
 * Validates and moderates video URIs
 */

import type { Violation } from "../../../domain/entities/moderation.types";
import { BaseModerator, type ModerationResult } from "./base.moderator";
import { VIDEO_PROTOCOLS, DEFAULT_MAX_URI_LENGTH } from "../../constants/moderation.constants";

class VideoModerator extends BaseModerator {
  private allowedProtocols: readonly string[] = VIDEO_PROTOCOLS;
  private maxUriLength = DEFAULT_MAX_URI_LENGTH;

  setAllowedProtocols(protocols: string[]): void {
    this.allowedProtocols = protocols;
  }

  setMaxUriLength(length: number): void {
    this.maxUriLength = length;
  }

  moderate(videoUri: string): ModerationResult {
    const validationError = this.validate(videoUri);
    if (validationError) {
      return { isAllowed: false, violations: [validationError] };
    }

    return { isAllowed: true, violations: [] };
  }

  private validate(uri: string): Violation | null {
    if (!uri || typeof uri !== "string") {
      return this.createViolation("empty-uri", "Video Validation", "empty URI");
    }

    if (uri.length > this.maxUriLength) {
      return this.createViolation(
        "uri-too-long",
        "Video Validation",
        "URI too long"
      );
    }

    if (!this.hasValidProtocol(uri)) {
      return this.createViolation(
        "invalid-protocol",
        "Video Validation",
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

export const videoModerator = new VideoModerator();
