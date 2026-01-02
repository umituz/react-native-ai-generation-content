/**
 * Flashcard Types
 * Type definitions for flashcard generation feature
 */

export type FlashcardDifficulty = "beginner" | "intermediate" | "advanced";
export type FlashcardDifficultyLevel = "easy" | "medium" | "hard";
export type FlashcardFormat = "qa" | "definition" | "fill_blank" | "multiple_choice";

export interface FlashcardGenerationRequest {
  topic: string;
  difficulty: FlashcardDifficulty;
  count: number;
  language?: string;
  format?: FlashcardFormat;
  context?: string;
  tags?: string[];
  includeImages?: boolean;
}

export interface GeneratedFlashcard {
  id: string;
  front: string;
  back: string;
  difficulty: FlashcardDifficultyLevel;
  tags: string[];
  source: "ai_generated";
  generationRequest: FlashcardGenerationRequest;
  confidence: number;
  createdAt?: string;
}

export interface FlashcardGenerationResult {
  success: boolean;
  flashcards: GeneratedFlashcard[];
  creditsUsed: number;
  tokensUsed: number;
  processingTime: number;
  error?: string;
  requestId: string;
}

export interface FlashcardValidationResult {
  accuracy: number;
  relevance: number;
  clarity: number;
  completeness: number;
  overall: number;
}

export interface FlashcardGenerationResponse {
  success: boolean;
  result: string | unknown[];
  metadata: { tokensUsed: number; processingTime: number };
  jobId: string;
}
