/**
 * Default Sample Prompts
 * @description Default prompt suggestions for background replacement
 */

import type { SamplePrompt } from "../../domain/entities";

export const DEFAULT_SAMPLE_PROMPTS: readonly SamplePrompt[] = [
    { id: "beach", text: "Beach sunset with palm trees" },
    { id: "office", text: "Modern office with city view" },
    { id: "mountain", text: "Mountain landscape with snow" },
    { id: "living-room", text: "Cozy living room interior" },
    { id: "garden", text: "Japanese garden with cherry blossoms" },
    { id: "cityscape", text: "Futuristic cityscape at night" },
] as const;
