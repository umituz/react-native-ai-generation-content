import { providerRegistry } from "../../../../infrastructure/services";


export interface MemeGenerationParams {
  prompt: string;
  styleId?: string;
}

export class MemeGenerationService {
  /**
   * Enhance a simple user prompt into a rich image generation prompt
   */
  async enhancePrompt(prompt: string, modelId?: string): Promise<string> {
    try {
      const provider = providerRegistry.getActiveProvider();
      if (!provider) {
        throw new Error("AI provider not available");
      }

      const systemPrompt = `You are an AI art director. Take the user's simple meme idea and transform it into a visually rich, detailed, and funny image generation prompt. Your response should be only the new prompt, no explanations. Idea: "${prompt}"`;

      // Use provided modelId or try to find a default text-to-text model
      const model = modelId || "fal-ai/llama-3-8b-instruct";

      const result = await provider.run<{ text?: string, data?: { text: string } }>(
        model,
        { prompt: systemPrompt }
      );

      // Handle different provider response formats
      const text = result.text || result.data?.text || prompt;
      return text;
    } catch (error) {
      if (__DEV__) {
         
        console.error("[MemeGenerationService] Enhance prompt error:", error);
      }
      return prompt;
    }
  }

  /**
   * Generate a meme image
   * @param prompt The final prompt to use (should already be enhanced if desired)
   * @param modelId Optional Fal model ID
   */
  async generateMeme(prompt: string, modelId?: string): Promise<string> {
    try {
      const provider = providerRegistry.getActiveProvider();
      if (!provider) {
        throw new Error("AI provider not available");
      }

      const finalPrompt = `High-quality, funny meme: ${prompt}. Cinematic, vibrant, clean subject, NO TEXT in image.`;

      const model = modelId || "fal-ai/flux/schnell";

      const result = await provider.run<{ images: { url: string }[] }>(
        model,
        { 
          prompt: finalPrompt,
          image_size: "square",
          num_inference_steps: 4
        }
      );

      if (result.images && result.images.length > 0) {
        return result.images[0].url;
      }

      throw new Error("No image generated");
    } catch (error) {
      if (__DEV__) {
         
        console.error("[MemeGenerationService] Generate meme error:", error);
      }
      throw error;
    }
  }
}

export const memeGenerationService = new MemeGenerationService();
