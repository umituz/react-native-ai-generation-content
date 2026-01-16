import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const URBAN_NIGHTS_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.RAINY_CAR_INTIMACY,
    title: "Rainy Drives",
    description: "Private world in motion",
    icon: "🚗",
    imageUrl:
      "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800",
    aiPrompt:
      "A couple in the front seat of a modern car at night, rain lashing against the windows, neon city lights reflecting in the wet glass and on their faces, both looking at each other with deep affection, soft dashboard glow, intimate and moody urban atmosphere",
    storyTemplate: createStoryTemplate(
      "escape the world in your own moving sanctuary",
      "The city is a blur of neon and rain, but inside this small space, everything is clear. A love that's the only constant in a fast-moving world.",
    ),
  },
  {
    id: ScenarioId.ROOFTOP_EDGE_CITY,
    title: "City Edge",
    description: "High above the lights",
    icon: "🌃",
    imageUrl:
      "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=800",
    aiPrompt:
      "A couple sitting on the very edge of a skyscraper rooftop, legs dangling over the city lights, leaning into each other while looking at the camera with fearless smiles, vast twinkling city skyline in background, cool night breeze, high-tension and grand",
    storyTemplate: createStoryTemplate(
      "look down at the world from your own summit",
      "They aren't just in the city; they're above it. At the very edge of the world, they find that the only thing holding them up is each other.",
    ),
  },
  {
    id: ScenarioId.SUBWAY_LATE_NIGHT,
    title: "Midnight Train",
    description: "Silent urban connection",
    icon: "🚇",
    imageUrl:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
    aiPrompt:
      "A couple in an almost empty, brightly lit subway car late at night, sitting very close, man's arm around woman, woman's head on his shoulder, both looking at the camera with peaceful but intense smiles, blurred dark tunnel passing through windows, high-contrast urban mood",
    storyTemplate: createStoryTemplate(
      "find peace in the heartbeat of the city",
      "The station doesn't matter, and neither does the destination. In the rattle and hum of the midnight train, they've already arrived at home.",
    ),
  },
  {
    id: ScenarioId.NEON_ALLEY_WHISPER,
    title: "Neon Alley",
    description: "Shadows and lights",
    icon: "🏮",
    imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800",
    aiPrompt:
      "A couple pressed against a brick wall in a narrow city alleyway, glowing red and blue neon signs reflecting on their faces, shadows and Steam, man leaning in to whisper to the woman, both looking at camera with mysterious and passionate expressions, edgy urban atmosphere",
    storyTemplate: createStoryTemplate(
      "lose yourselves in the shadows of the neon city",
      "Wrapped in light and shadow, they find a rhythm that's all their own. A love that shines brighter than the neon lights around them.",
    ),
  },
];
