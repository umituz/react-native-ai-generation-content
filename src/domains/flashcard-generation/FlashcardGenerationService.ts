/**
 * Flashcard Generation Service
 * AI-powered flashcard generation for educational content
 */

import type {
  FlashcardGenerationRequest,
  FlashcardGenerationResult,
  FlashcardGenerationResponse,
  FlashcardValidationResult,
} from "./types/flashcard.types";
import { buildFlashcardPrompt, calculateMaxTokens } from "./builders/flashcard-prompt.builder";
import { parseFlashcardsFromResponse } from "./parsers/flashcard-response.parser";
import { validateFlashcard } from "./validators/flashcard.validator";

// Re-export types for backward compatibility
export type {
  FlashcardGenerationRequest,
  FlashcardGenerationResult,
  FlashcardValidationResult,
  GeneratedFlashcard,
} from "./types/flashcard.types";

const CREDITS_PER_FLASHCARD = 2;
const MOCK_DELAY_MS = 2000;

/**
 * Generate flashcards using AI
 */
export async function generateFlashcards(
  request: FlashcardGenerationRequest,
): Promise<FlashcardGenerationResult> {
  const startTime = Date.now();

  try {
    const prompt = buildFlashcardPrompt(request);
    const response = await executeGeneration(prompt, request.count);
    const flashcards = parseFlashcardsFromResponse(response, request);

    return {
      success: true,
      flashcards,
      creditsUsed: request.count * CREDITS_PER_FLASHCARD,
      tokensUsed: response.metadata?.tokensUsed ?? 0,
      processingTime: Date.now() - startTime,
      requestId: response.jobId ?? `req_${Date.now()}`,
    };
  } catch (error) {
    return {
      success: false,
      flashcards: [],
      creditsUsed: 0,
      tokensUsed: 0,
      processingTime: 0,
      error: error instanceof Error ? error.message : "Unknown error",
      requestId: "",
    };
  }
}

/**
 * Validate flashcard content quality
 */
export function validateFlashcardContent(
  front: string,
  back: string,
): FlashcardValidationResult {
  return validateFlashcard(front, back);
}

async function executeGeneration(
  _prompt: string,
  count: number,
): Promise<FlashcardGenerationResponse> {
  // Mock implementation - integrate with actual AI orchestrator
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));

  const maxTokens = calculateMaxTokens(count);
  return {
    success: true,
    result: generateMockContent(count),
    metadata: { tokensUsed: maxTokens, processingTime: MOCK_DELAY_MS },
    jobId: `job_${Date.now()}`,
  };
}

function generateMockContent(count: number): string {
  const mockFlashcards = [
    {
      front: "What is photosynthesis?",
      back: "The process by which plants convert sunlight into glucose.",
      difficulty: "medium",
      tags: ["biology", "science"],
    },
    {
      front: "Define gravity",
      back: "A force that attracts objects with mass toward each other.",
      difficulty: "easy",
      tags: ["physics", "science"],
    },
  ];

  return JSON.stringify(mockFlashcards.slice(0, count));
}
