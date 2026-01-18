/**
 * Creative Arts Scenarios
 * Photography, art, and creative pursuits
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const CREATIVE_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.PHOTOGRAPHY_DUO,
    title: "Photography Duo",
    description: "Capturing life together",
    icon: "📷",
    imageUrl:
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a couple as professional photographers on location, both facing camera with creative passionate smiles, man in olive green multi-pocket photographer vest over black henley holding Canon camera with telephoto lens, woman in denim jacket and vintage band tee with Nikon camera around neck and leather camera bag, scenic mountain meadow with wildflowers and dramatic clouds in background",
      "magical golden hour sunlight with warm amber tones and soft lens flare"
    ),
    storyTemplate: createStoryTemplate(
      "capture the world through their lens",
      "Together they frame not just photos, but memories. Every click is a moment of their love story.",
    ),
  },
];
