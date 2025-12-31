/**
 * Flashcard Generation Hooks
 * React hooks for AI-powered flashcard generation
 */

import React from "react";
import type {
  FlashcardGenerationRequest,
  GeneratedFlashcard,
  FlashcardGenerationResult,
} from "../../domains/flashcard-generation/FlashcardGenerationService";

export interface UseFlashcardGenerationResult {
  generateFlashcards: (
    request: FlashcardGenerationRequest,
  ) => Promise<FlashcardGenerationResult>;
  isGenerating: boolean;
  result: FlashcardGenerationResult | null;
  error: string | null;
  reset: () => void;
}

export const useFlashcardGeneration = (): UseFlashcardGenerationResult => {
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [result, setResult] = React.useState<FlashcardGenerationResult | null>(
    null,
  );
  const [error, setError] = React.useState<string | null>(null);

  const generateFlashcards = React.useCallback(
    async (
      request: FlashcardGenerationRequest,
    ): Promise<FlashcardGenerationResult> => {
      try {
        setIsGenerating(true);
        setError(null);

        // This would use the actual FlashcardGenerationService
        // For now, mock the implementation
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const flashcards: GeneratedFlashcard[] = [];
        for (let i = 0; i < request.count; i++) {
          flashcards.push({
            id: `generated_${Date.now()}_${i}`,
            front: `Mock question ${i + 1} about ${request.topic}`,
            back: `Mock answer ${i + 1} for ${request.topic}`,
            difficulty: i % 3 === 0 ? "easy" : i % 3 === 1 ? "medium" : "hard",
            tags: [
              ...(request.tags || []),
              request.topic.toLowerCase().replace(/\s+/g, "_"),
            ],
            source: "ai_generated",
            generationRequest: request,
            confidence: 0.8 + Math.random() * 0.2,
            createdAt: new Date().toISOString(),
          });
        }

        const generationResult: FlashcardGenerationResult = {
          success: true,
          flashcards,
          creditsUsed: request.count * 2,
          tokensUsed: request.count * 100,
          processingTime: 2000,
          requestId: `req_${Date.now()}`,
        };

        setResult(generationResult);
        return generationResult;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Generation failed";
        setError(errorMessage);
        setIsGenerating(false);

        return {
          success: false,
          flashcards: [],
          creditsUsed: 0,
          tokensUsed: 0,
          processingTime: 0,
          error: errorMessage,
          requestId: `req_${Date.now()}`,
        };
      } finally {
        setIsGenerating(false);
      }
    },
    [],
  );

  const reset = React.useCallback(() => {
    setResult(null);
    setError(null);
    setIsGenerating(false);
  }, []);

  return {
    generateFlashcards,
    isGenerating,
    result,
    error,
    reset,
  };
};

export interface UseFlashcardValidationResult {
  validateFlashcard: (
    front: string,
    back: string,
  ) => Promise<{
    accuracy: number;
    relevance: number;
    clarity: number;
    completeness: number;
    overall: number;
  }>;
  isValidating: boolean;
}

export const useFlashcardValidation = (): UseFlashcardValidationResult => {
  const [isValidating, setIsValidating] = React.useState(false);

  const validateFlashcard = React.useCallback(
    async (front: string, back: string) => {
      setIsValidating(true);

      // Mock validation - in production would use actual service
      await new Promise((resolve) => setTimeout(resolve, 500));

      const accuracy = Math.min(1, front.length / 10);
      const relevance = Math.min(1, back.length / 25);
      const clarity = Math.min(1, 1 - front.split(/\s+/).length / 20);
      const completeness = Math.min(1, back.length / 50);
      const overall = (accuracy + relevance + clarity + completeness) / 4;

      setIsValidating(false);

      return {
        accuracy,
        relevance,
        clarity,
        completeness,
        overall,
      };
    },
    [],
  );

  return {
    validateFlashcard,
    isValidating,
  };
};
