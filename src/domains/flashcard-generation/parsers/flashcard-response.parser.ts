/**
 * Flashcard Response Parser
 * Parses AI responses into structured flashcard data
 */

import type {
  FlashcardGenerationRequest,
  FlashcardGenerationResponse,
  GeneratedFlashcard,
  FlashcardDifficultyLevel,
} from "../types/flashcard.types";

interface RawFlashcard {
  front?: string;
  back?: string;
  difficulty?: FlashcardDifficultyLevel;
  tags?: string | string[];
}

export function parseFlashcardsFromResponse(
  response: FlashcardGenerationResponse,
  request: FlashcardGenerationRequest,
): GeneratedFlashcard[] {
  try {
    const rawFlashcards = extractRawFlashcards(response.result);
    return rawFlashcards.map((item, index) => mapToGeneratedFlashcard(item, request, index));
  } catch (error) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.error("Failed to parse AI response:", error);
    }
    return [];
  }
}

function extractRawFlashcards(result: string | unknown[]): RawFlashcard[] {
  if (typeof result === "string") {
    return JSON.parse(result) as RawFlashcard[];
  }
  if (Array.isArray(result)) {
    return result as RawFlashcard[];
  }
  throw new Error("Invalid AI response format");
}

function mapToGeneratedFlashcard(
  raw: RawFlashcard,
  request: FlashcardGenerationRequest,
  index: number,
): GeneratedFlashcard {
  return {
    id: `generated_${Date.now()}_${index}`,
    front: raw.front ?? "",
    back: raw.back ?? "",
    difficulty: raw.difficulty ?? "medium",
    tags: normalizeTags(raw.tags),
    source: "ai_generated",
    generationRequest: request,
    confidence: 0.8 + Math.random() * 0.2,
    createdAt: new Date().toISOString(),
  };
}

function normalizeTags(tags: string | string[] | undefined): string[] {
  if (Array.isArray(tags)) return tags;
  if (typeof tags === "string") return [tags];
  return [];
}
