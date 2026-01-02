/**
 * Flashcard Prompt Builder
 * Builds AI prompts for flashcard generation
 */

import type { FlashcardGenerationRequest, FlashcardDifficulty, FlashcardFormat } from "../types/flashcard.types";

const QUALITY_MAP: Record<FlashcardDifficulty, string> = {
  beginner: "simple, clear language appropriate for learners just starting out",
  intermediate: "moderate complexity with some technical terms expected to be known",
  advanced: "complex content with specialized terminology and nuanced concepts",
};

const FORMAT_INSTRUCTIONS: Record<FlashcardFormat, string> = {
  qa: "Format as Question-Answer pairs",
  definition: "Format as Term-Definition pairs",
  fill_blank: "Format as Fill-in-the-blank exercises",
  multiple_choice: "Format as Multiple Choice questions with one correct answer",
};

export function buildFlashcardPrompt(request: FlashcardGenerationRequest): string {
  const format = request.format ?? "qa";
  const language = request.language ?? "English";
  const tags = request.tags?.join(", ") ?? "auto-generated";
  const context = request.context ?? "General learning";

  return `Generate ${request.count} educational flashcards about "${request.topic}".

Topic Context: ${context}
Difficulty Level: ${request.difficulty} - ${QUALITY_MAP[request.difficulty]}
Format: ${format} - ${FORMAT_INSTRUCTIONS[format]}
Language: ${language}
Tags to include: ${tags}

Requirements:
- Questions should be clear and concise
- Answers should be accurate and comprehensive
- Content should be age and difficulty appropriate
- Include relevant educational context
- Make it engaging and memorable

Output format: JSON array with structure:
[
  {
    "front": "Question text here",
    "back": "Answer text here",
    "difficulty": "easy|medium|hard",
    "tags": ["tag1", "tag2"]
  }
]`;
}

export function calculateMaxTokens(count: number): number {
  return Math.max(count * 50, 200);
}
