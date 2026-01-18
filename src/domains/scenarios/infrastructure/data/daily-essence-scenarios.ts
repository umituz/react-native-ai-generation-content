import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const DAILY_ESSENCE_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.NEW_HOME_CHAOS,
    title: "New Home Chaos",
    description: "Moving in together",
    icon: "📦",
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    aiPrompt:
      "A couple in an empty living room surrounded by cardboard boxes, both looking at the camera with exhausted but happy smiles, eating pizza directly from the box on the floor, messy hair, sunlight streaming through bare windows, sense of new beginnings and shared excitement",
    storyTemplate: createStoryTemplate(
      "begin a new chapter in their own home",
      "Amidst the chaos of boxes and tape, they've found the most important thing: a place where they finally belong, together.",
    ),
  },
  {
    id: ScenarioId.LAUNDRY_FUN_DAY,
    title: "Laundry Play",
    description: "Fun in the mundane",
    icon: "🧺",
    imageUrl:
      "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=800",
    aiPrompt:
      "A couple doing laundry together in a bright laundry room, both looking at the camera with playful laughs, throwing a clean sock at each other, piles of colorful clothes around, warm domestic atmosphere, authentic joy in a daily chore",
    storyTemplate: createStoryTemplate(
      "make even the chores an adventure",
      "They prove that it's not what you're doing, but who you're doing it with. Even laundry day is a highlight when spent together.",
    ),
  },
  {
    id: ScenarioId.MIDNIGHT_KITCHEN_SNACK,
    title: "Midnight Kitchen",
    description: "2 AM conversations",
    icon: "🥪",
    imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800",
    aiPrompt:
      "A couple in a dimly lit kitchen late at night, both looking at the camera with gentle tired smiles, sitting on the kitchen counter, sharing a sandwich or a bowl of cereal, warm amber light from a single stove lamp, intimate and quiet urban night vibe",
    storyTemplate: createStoryTemplate(
      "share a secret midnight snack",
      "The world is asleep, but their connection is wide awake. The best conversations always happen when the rest of the world is quiet.",
    ),
  },
  {
    id: ScenarioId.GARDEN_GROWTH_STEPS,
    title: "Growing Roots",
    description: "Planting for the future",
    icon: "🌱",
    imageUrl:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800",
    aiPrompt:
      "A couple in a small backyard garden, both looking at the camera with proud smiles, hands covered in soil, planting a small sapling or flowers together, wearing gardening gloves and casual clothes, soft afternoon sunlight, symbolic of growth and patience",
    storyTemplate: createStoryTemplate(
      "plant the seeds of their shared future",
      "Just like the trees they plant, their love takes time, care, and a lot of heart to grow into something magnificent.",
    ),
  },
  {
    id: ScenarioId.STORM_SHELTER_BOARDGAMES,
    title: "Storm Shelter",
    description: "Warmth in the dark",
    icon: "🎲",
    imageUrl:
      "https://images.unsplash.com/photo-1611195974226-a6a9be9dd763?w=800",
    aiPrompt:
      "A couple sitting on a cozy rug during a power outage, both looking at the camera with mischievous smiles, playing a board game by the light of several candles, shadows dancing on the walls, rain streaking the window in the background, cozy and safe",
    storyTemplate: createStoryTemplate(
      "find light and laughter in the dark",
      "When the power goes out, they spark their own light. No electricity needed for the chemistry they share.",
    ),
  },
  {
    id: ScenarioId.FURNITURE_ASSEMBLY_TEST,
    title: "The Assembly Test",
    description: "Building a life (and a shelf)",
    icon: "🔧",
    imageUrl:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800",
    aiPrompt:
      "A couple in the middle of building flat-pack furniture, both looking at the camera with confused but laughing expressions, holding a manual and a screwdriver, surrounded by wooden pieces and screws, a partially built shelf in the foreground, relatable and funny",
    storyTemplate: createStoryTemplate(
      "conquer the ultimate relationship test",
      "If they can survive building furniture together without a single argument, they can survive anything. Building a home, one screw at a time.",
    ),
  },
  {
    id: ScenarioId.RAINY_WINDOW_WATCH,
    title: "Rainy Day Watch",
    description: "Quiet reflection",
    icon: "☔",
    imageUrl:
      "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800",
    aiPrompt:
      "A couple standing by a large window during a heavy rainstorm, both looking out at the rain with serene expressions, arms wrapped around each other, wearing soft oversized sweaters, reflections of the rain on the window pane, peaceful and contemplative",
    storyTemplate: createStoryTemplate(
      "find beauty in a rainy day",
      "The world outside is gray and wet, but inside, their world is warm, colorful, and perfectly complete.",
    ),
  },
];
