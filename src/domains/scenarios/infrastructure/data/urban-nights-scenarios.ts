import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const URBAN_NIGHTS_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.RAINY_CAR_INTIMACY,
    title: "Rainy Drives",
    description: "Private world in motion",
    icon: "🚗",
    imageUrl:
      "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a romantic couple in the front seat of a modern luxury car at night during heavy rain, rain droplets streaming down windows, colorful neon city lights reflecting in the wet glass and on their faces, both looking at each other with deep affection, soft blue dashboard glow illuminating their features",
      "moody neon reflections through rain on windows, soft interior dashboard glow, intimate urban night atmosphere"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a daring couple sitting on the edge of a skyscraper rooftop with legs dangling over the city, leaning into each other while facing camera with fearless confident smiles, vast sprawling city skyline with twinkling lights stretching to horizon, night breeze tousling their hair, man in dark jacket, woman in flowing dress",
      "dramatic city lights below, cool blue night sky, high-tension adventurous rooftop atmosphere"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple in an almost empty brightly lit subway car late at night, sitting very close together on orange plastic seats, man's arm wrapped protectively around woman, woman's head resting on his shoulder, both facing camera with peaceful loving smiles, dark blurred tunnel rushing past through windows, empty seats around them",
      "harsh bright fluorescent subway lighting, high-contrast urban mood, peaceful late-night commute atmosphere"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple pressed close against a brick wall in a narrow atmospheric city alleyway at night, glowing red and blue neon signs casting colorful light on their faces, wisps of steam rising from street vents, man leaning in close to whisper to woman, both facing camera with mysterious passionate expressions, graffiti and fire escapes visible",
      "dramatic neon lighting in red and blue, atmospheric steam and shadows, edgy urban nightlife atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "lose yourselves in the shadows of the neon city",
      "Wrapped in light and shadow, they find a rhythm that's all their own. A love that shines brighter than the neon lights around them.",
    ),
  },
];
