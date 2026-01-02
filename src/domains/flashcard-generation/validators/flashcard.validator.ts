/**
 * Flashcard Validator
 * Validates and scores generated flashcard content
 */

import type { FlashcardValidationResult } from "../types/flashcard.types";

const EDUCATIONAL_TERMS = [
  "define", "explain", "describe", "what is",
  "how does", "formula", "process", "function",
];

export function validateFlashcard(front: string, back: string): FlashcardValidationResult {
  const accuracy = calculateAccuracy(front, back);
  const relevance = calculateRelevance(front, back);
  const clarity = calculateClarity(front, back);
  const completeness = calculateCompleteness(front, back);
  const overall = (accuracy + relevance + clarity + completeness) / 4;

  return { accuracy, relevance, clarity, completeness, overall };
}

function calculateAccuracy(front: string, back: string): number {
  let score = 0.5;

  if (front.length >= 5 && front.length <= 200) score += 0.2;
  if (back.length >= 10 && back.length <= 500) score += 0.2;

  const frontWords = front.split(/\s+/).length;
  const backWords = back.split(/\s+/).length;
  if (backWords >= frontWords * 0.5 && backWords <= frontWords * 3) {
    score += 0.1;
  }

  return Math.min(score, 1.0);
}

function calculateRelevance(front: string, back: string): number {
  let score = 0.6;

  const hasEducationalTerms = EDUCATIONAL_TERMS.some(
    (term) => front.toLowerCase().includes(term) || back.toLowerCase().includes(term),
  );

  if (hasEducationalTerms) score += 0.3;
  if (front.includes("?") || front.toLowerCase().includes("what is")) {
    score += 0.1;
  }

  return Math.min(score, 1.0);
}

function calculateClarity(front: string, back: string): number {
  let score = 0.5;

  if (front.trim().endsWith("?")) score += 0.2;
  if (!front.includes("...") && !back.includes("...")) score += 0.2;
  if (!/[A-Z]{2,}/.test(front)) score += 0.1;

  return Math.min(score, 1.0);
}

function calculateCompleteness(front: string, back: string): number {
  const frontScore = Math.min(front.length / 20, 1.0);
  const backScore = Math.min(back.length / 50, 1.0);
  return (frontScore + backScore) / 2;
}
