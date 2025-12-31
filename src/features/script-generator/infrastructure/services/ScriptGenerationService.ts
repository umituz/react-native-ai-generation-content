import {
  ScriptSection,
  ScriptGenerationRequest,
} from "../domain/types/script.types";
import { DEFAULT_VIDEO_TYPES } from "../domain/constants";

/**
 * ScriptGenerationService
 * Handles building prompts and (eventually) calling AI providers for script generation.
 */
export class ScriptGenerationService {
  /**
   * Build prompt for script generation
   */
  buildScriptPrompt(request: ScriptGenerationRequest): string {
    const typeInfo = DEFAULT_VIDEO_TYPES.find((t) => t.id === request.videoType);

    return `Generate a video script for a ${request.duration}-second ${typeInfo?.name || "video"} about: ${request.topic}

${request.targetAudience ? `Target Audience: ${request.targetAudience}` : ""}
${request.keyPoints ? `Key Points to Cover: ${request.keyPoints}` : ""}

Please create a detailed script with the following structure:
1. Hook (3-5 seconds): Attention-grabbing opening
2. Introduction (5-10 seconds): Brief intro to the topic
3. Main Content (${request.duration - 15} seconds): Core message and value
4. Call-to-Action (5 seconds): Clear next step for viewers

For each section, provide:
- Section title
- Voiceover text
- Duration in seconds
- Visual/scene suggestions

Format as JSON with this structure:
{
  "sections": [
    {
      "type": "hook|intro|main|cta",
      "title": "Section title",
      "content": "Voiceover text",
      "duration": 5,
      "notes": "Visual suggestions"
    }
  ],
  "totalDuration": ${request.duration}
}`;
  }

  /**
   * Generate script from request
   */
  async generateScript(
    request: ScriptGenerationRequest,
  ): Promise<readonly ScriptSection[] | null> {
    // NOTE: This will be implemented by the app using a specific AI provider (like OpenAI or FAL)
    // The package provides the structure and prompt building.
    return null;
  }
}

export const scriptGenerationService = new ScriptGenerationService();
