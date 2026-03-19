/**
 * Couple Image Generation Builder - Type Definitions
 *
 * Wardrobe'da kusursuz çalışan mantığı tüm couple generation için paylaştırır.
 * Bu utility'yi tüm çift görüntü oluşturma işlemleri kullanır.
 */

import type { GenerationTargetLike } from "../../../../infrastructure/utils/couple-input.util";

/**
 * Couple generation input parameters
 */
export interface CoupleGenerationInputParams {
  // Required params
  partner1PhotoUri: string;
  partner2PhotoUri: string | null;
  isCoupleMode: boolean;
  basePrompt: string; // Scenario prompt, wardrobe prompt, background prompt, etc.

  // Optional params
  customInstructions?: string;
  aspectRatio?: string; // Default: "3:4"
  strength?: number; // Optional strength for some operations
}

/**
 * Couple generation result
 */
export interface CoupleGenerationInput {
  target: GenerationTargetLike;
  prompt: string;
  params: Record<string, unknown>;
}

/**
 * Scenario generation input parameters
 */
export interface ScenarioGenerationInputParams {
  partner1PhotoUri: string;
  partner2PhotoUri: string | null;
  isCoupleMode: boolean;
  scenarioPrompt: string; // Senaryo prompt'u (aiPrompt)
  customInstructions?: string;
}
