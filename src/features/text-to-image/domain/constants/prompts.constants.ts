/**
 * Example Prompts Constants
 * @description Default prompt suggestions for AI generation features
 * @note NEVER use emojis in prompts - Imagen API only supports English text
 * @note Use translationKey for localization - apps should translate these
 */

export interface PromptSuggestion {
  id: string;
  translationKey: string;
  fallbackText: string;
}

export const DEFAULT_TEXT_TO_IMAGE_PROMPTS: readonly PromptSuggestion[] = [
  { id: "sunset", translationKey: "prompts.image.sunset", fallbackText: "A beautiful sunset over mountains with vibrant colors" },
  { id: "cityscape", translationKey: "prompts.image.cityscape", fallbackText: "Futuristic cityscape at night with neon lights" },
  { id: "forest", translationKey: "prompts.image.forest", fallbackText: "Enchanted forest with magical glowing mushrooms" },
  { id: "coffee", translationKey: "prompts.image.coffee", fallbackText: "Cozy coffee shop interior on a rainy day" },
  { id: "spaceship", translationKey: "prompts.image.spaceship", fallbackText: "Spaceship traveling through colorful nebula" },
  { id: "dragon", translationKey: "prompts.image.dragon", fallbackText: "Dragon flying over snow-capped mountain peaks" },
  { id: "underwater", translationKey: "prompts.image.underwater", fallbackText: "Underwater coral reef with tropical fish" },
  { id: "castle", translationKey: "prompts.image.castle", fallbackText: "Medieval castle on a cliff during golden hour" },
] as const;

export const DEFAULT_TEXT_TO_VOICE_PROMPTS: readonly PromptSuggestion[] = [
  { id: "welcome", translationKey: "prompts.voice.welcome", fallbackText: "Welcome to our amazing product! We're excited to have you here." },
  { id: "story", translationKey: "prompts.voice.story", fallbackText: "Once upon a time, in a land far away, there lived a wise old wizard." },
  { id: "news", translationKey: "prompts.voice.news", fallbackText: "Breaking news: Scientists have made a groundbreaking discovery." },
  { id: "narration", translationKey: "prompts.voice.narration", fallbackText: "The sun was setting over the horizon, painting the sky in orange and pink." },
  { id: "commercial", translationKey: "prompts.voice.commercial", fallbackText: "Transform your business with our innovative solutions." },
  { id: "podcast", translationKey: "prompts.voice.podcast", fallbackText: "In today's episode, we'll explore the world of artificial intelligence." },
] as const;
