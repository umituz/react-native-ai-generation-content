/**
 * Content Moderation Service
 * Orchestrates content moderation by type
 */

import type {
  ContentType,
  ModerationResult,
  ModerationContext,
  Violation,
  SuggestionMessages,
  ValidationLimits,
  ModerationRule,
} from "../../domain/entities/moderation.types";
import { textModerator } from "./moderators/text.moderator";
import { imageModerator } from "./moderators/image.moderator";
import { videoModerator } from "./moderators/video.moderator";
import { voiceModerator } from "./moderators/voice.moderator";
import { rulesRegistry } from "../rules/rules-registry";

declare const __DEV__: boolean;

interface ServiceConfig {
  suggestionMessages?: SuggestionMessages;
  validationLimits?: ValidationLimits;
  customRules?: ModerationRule[];
}

class ContentModerationService {
  configure(config: ServiceConfig): void {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      // eslint-disable-next-line no-console
      console.log("[ContentModeration] Configure:", {
        hasSuggestionMessages: !!config.suggestionMessages,
        hasValidationLimits: !!config.validationLimits,
        customRulesCount: config.customRules?.length ?? 0,
      });
    }

    if (config.suggestionMessages) {
      textModerator.setSuggestionMessages(config.suggestionMessages);
      voiceModerator.setSuggestionMessages(config.suggestionMessages);
    }

    if (config.validationLimits) {
      const { maxTextLength, maxVoiceTextLength, maxUriLength } =
        config.validationLimits;

      if (maxTextLength) textModerator.setMaxLength(maxTextLength);
      if (maxVoiceTextLength) voiceModerator.setMaxLength(maxVoiceTextLength);
      if (maxUriLength) {
        imageModerator.setMaxUriLength(maxUriLength);
        videoModerator.setMaxUriLength(maxUriLength);
      }
    }

    if (config.customRules) {
      rulesRegistry.addRules(config.customRules);
    }
  }

  async moderate(context: ModerationContext): Promise<ModerationResult> {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      // eslint-disable-next-line no-console
      console.log("[ContentModeration] Moderate started:", {
        contentType: context.contentType,
        contentLength: context.content?.length ?? 0,
      });
    }

    const result = this.moderateByType(context.contentType, context.content);
    const moderationResult: ModerationResult = {
      isAllowed: result.isAllowed,
      violations: result.violations,
      confidence: this.calculateConfidence(result.violations),
      suggestedAction: this.determineAction(result.violations),
    };

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      // eslint-disable-next-line no-console
      console.log("[ContentModeration] Moderate completed:", {
        contentType: context.contentType,
        isAllowed: moderationResult.isAllowed,
        violationsCount: moderationResult.violations?.length ?? 0,
        suggestedAction: moderationResult.suggestedAction,
      });
    }

    return moderationResult;
  }

  async isContentAllowed(
    content: string,
    contentType: ContentType
  ): Promise<boolean> {
    const result = this.moderateByType(contentType, content);
    return result.isAllowed;
  }

  moderateSync(
    content: string,
    contentType: ContentType
  ): { isAllowed: boolean; violations: Violation[] } {
    return this.moderateByType(contentType, content);
  }

  private moderateByType(
    contentType: ContentType,
    content: string
  ): { isAllowed: boolean; violations: Violation[] } {
    switch (contentType) {
      case "text":
        return textModerator.moderate(content);
      case "image":
        return imageModerator.moderate(content);
      case "video":
        return videoModerator.moderate(content);
      case "voice":
        return voiceModerator.moderate(content);
      default:
        return { isAllowed: true, violations: [] };
    }
  }

  private calculateConfidence(violations: Violation[]): number {
    if (violations.length === 0) return 1.0;

    const weights = { critical: 1.0, high: 0.75, medium: 0.5, low: 0.25 };
    const score = violations.reduce(
      (sum, v) => sum + (weights[v.severity] || 0.25),
      0
    );

    return Math.min(1.0, score / 2);
  }

  private determineAction(
    violations: Violation[]
  ): "allow" | "warn" | "block" {
    if (violations.length === 0) return "allow";

    const hasCritical = violations.some((v) => v.severity === "critical");
    const hasHigh = violations.some((v) => v.severity === "high");

    if (hasCritical || hasHigh) return "block";
    return "warn";
  }
}

export const contentModerationService = new ContentModerationService();
