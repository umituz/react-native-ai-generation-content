/**
 * Content Filter Interface
 * Contract for content filtering implementations
 */

import type { Violation } from "../entities/moderation.types";

export interface ContentFilterResult {
  isAllowed: boolean;
  violations: Violation[];
}

export interface IContentFilter {
  filter(content: string): ContentFilterResult;
  addBlockedWord(word: string): void;
  addBlockedPattern(pattern: string): void;
  removeBlockedWord(word: string): void;
  removeBlockedPattern(pattern: string): void;
  clearFilters(): void;
}

export interface IModerator {
  moderate(content: string): ContentFilterResult;
}
