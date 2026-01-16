import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const RETRO_ARCADE_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.ARCADE_HIGH_SCORE,
    title: "High Score Battle",
    description: "Gaming rivals",
    icon: "🕹️",
    imageUrl:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800",
    aiPrompt:
      "A couple playing a classic arcade machine together, intense focused expressions, man's hand on the joystick, woman pressing buttons, neon lights from the machine reflecting on their faces, colorful retro arcade background, 80s fashion and vibes",
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
    aiPrompt:
      "A couple in a late-night retro arcade, both looking at the camera with wide playful smiles, holding plastic cups filled with game tokens, surrounded by glowing neon signs and rows of arcade cabinets, vibrant purple and blue lighting, nostalgic and fun",
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
    aiPrompt:
      "A couple in a nostalgic 1980s pizza parlor, sitting in a red vinyl booth, sharing a pizza and a large soda, wearing oversized denim jackets and 80s hairstyles, an arcade machine in the corner, warm yellow indoor lighting, cozy and retro",
    storyTemplate: createStoryTemplate(
      "hang out like it's the 80s all over again",
      "No phones, no distractions, just good pizza and better company. They've found the ultimate throwback to a time of simple joys.",
    ),
  },
];
