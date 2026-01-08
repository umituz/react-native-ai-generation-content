/**
 * Generate Love Message Use Case
 */

import { buildLoveMessagePrompt } from "../prompts/messagePromptBuilder";
import { MessageGenerationParams } from "../../domain/types";
import { providerRegistry } from "../../../index";
import { PartnerProfileRepository } from "../persistence/PartnerProfileRepository";

export const generateLoveMessage = async (
  params: MessageGenerationParams,
): Promise<string> => {
  try {
    const profile = params.usePartnerProfile
      ? await PartnerProfileRepository.getProfile()
      : null;

    const prompt = buildLoveMessagePrompt(params, profile);
    const provider = providerRegistry.getActiveProvider();

    if (!provider) {
      throw new Error("No active AI provider found");
    }

    // Use run for text generation
    const result = await provider.run<string>("gemini-1.5-flash", { prompt });

    return result || "";
  } catch (error) {
    if (__DEV__) {
      console.error("[LoveMessage] Generation failed:", error);
    }
    throw error;
  }
};
