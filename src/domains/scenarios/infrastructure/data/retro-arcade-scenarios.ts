import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const RETRO_ARCADE_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.ARCADE_HIGH_SCORE,
    title: "High Score Battle",
    description: "Gaming rivals",
    icon: "🕹️",
    imageUrl:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple playing classic arcade machine together, both facing camera with intense focused competitive expressions, man gripping joystick, woman mashing buttons, wearing 80s fashion with bright colors, neon lights from machine reflecting on their faces, rows of glowing arcade cabinets in background",
      "colorful neon arcade lighting with retro 80s atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "battle for the top spot on the leaderboard",
      "They may be rivals on the screen, but they're the ultimate team in life. A relationship built on joy, competition, and shared high scores.",
    ),
  },
  {
    id: ScenarioId.NEON_ARCADE_DATE,
    title: "Neon Arcade Night",
    description: "Glowing tokens and fun",
    icon: "👾",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple in late-night retro arcade, both facing camera with wide playful smiles, holding plastic cups overflowing with golden game tokens, surrounded by glowing neon signs and vintage arcade cabinets, wearing casual 80s outfits with neon accents",
      "vibrant purple and blue neon lighting with nostalgic atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "experience the vibrant magic of an 80s night out",
      "In a world of pixels and neon, their connection is the only thing that's real. A night of pure, unadulterated fun.",
    ),
  },
  {
    id: ScenarioId.PIZZA_PIXELS_80S,
    title: "Pizza & Pixels",
    description: "Classic hangout",
    icon: "🍕",
    imageUrl:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple in nostalgic 1980s pizza parlor sitting in red vinyl booth, both facing camera with happy relaxed smiles, sharing large pepperoni pizza and tall sodas with striped straws, wearing oversized denim jackets with big hair, vintage arcade machine and checkered floor in background",
      "warm yellow retro indoor lighting with cozy 80s atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "hang out like it's the 80s all over again",
      "No phones, no distractions, just good pizza and better company. They've found the ultimate throwback to a time of simple joys.",
    ),
  },
];
