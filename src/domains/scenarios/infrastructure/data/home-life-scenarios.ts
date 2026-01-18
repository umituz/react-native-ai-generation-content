import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const HOME_LIFE_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.MORNING_COFFEE,
    title: "Morning Coffee",
    description: "Start the day together",
    icon: "☕",
    imageUrl:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800",
    aiPrompt:
      "A couple in a bright modern kitchen, both looking at the camera with morning smiles, dressed in comfortable loungewear, holding coffee mugs, soft morning sunlight streaming through window, cozy and peaceful",
    storyTemplate: createStoryTemplate(
      "share the first moments of the day",
      "The best part of waking up is seeing each other. Quiet conversations and the scent of fresh coffee.",
    ),
  },
  {
    id: ScenarioId.MOVIE_NIGHT,
    title: "Movie Night",
    description: "Home cinema cozy",
    icon: "🍿",
    imageUrl:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800",
    aiPrompt:
      "A couple on a comfy sofa bed, both looking at the camera with happy smiles, wrapped in a soft blanket, holding a bowl of popcorn and remote, dim warm lighting, home theater setup in background, cozy and relaxed",
    storyTemplate: createStoryTemplate(
      "enjoy a movie marathon",
      "Lost in another world on the screen, but perfectly at home in each other's arms.",
    ),
  },
  {
    id: ScenarioId.COZY_SUNDAY,
    title: "Cozy Sunday",
    description: "Relaxed weekend vibes",
    icon: "🛋️",
    imageUrl:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
    aiPrompt:
      "A couple relaxing on a large armchair, both looking at the camera with content smiles, dressed in oversized knit sweaters, books and tea on a side table, soft interior lighting, cozy home library in background, serenity",
    storyTemplate: createStoryTemplate(
      "find peace in a quiet Sunday",
      "Sundays are for slowed-down moments and deep conversations. No rush, just pure connection.",
    ),
  },
  {
    id: ScenarioId.BREAKFAST_IN_BED,
    title: "Breakfast in Bed",
    description: "Lazy morning luxury",
    icon: "🍳",
    imageUrl:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800",
    aiPrompt:
      "A couple in a luxury bedroom, both looking at the camera with joyful smiles, sitting in white linen bed holding a breakfast tray with pancakes and juice, soft morning light, elegant bedroom decor, intimate and happy",
    storyTemplate: createStoryTemplate(
      "savor a slow morning",
      "Starting the day with sweetness. Every bite tastes better when shared in the comfort of their own world.",
    ),
  },
  {
    id: ScenarioId.BEDTIME_CUDDLES,
    title: "Bedtime Cuddles",
    description: "Goodnight romance",
    icon: "🌙",
    imageUrl: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800",
    aiPrompt:
      "A couple lying in bed, both looking at the camera with peaceful sleepy smiles, head on shoulder, soft dim moonlight or warm bedside lamp lighting, white silky sheets, intimate and tranquil atmosphere",
    storyTemplate: createStoryTemplate(
      "end the day together",
      "As the world goes quiet, they find their sanctuary in each other. Sleep comes easy when love is present.",
    ),
  },
  {
    id: ScenarioId.READING_TOGETHER,
    title: "Reading Duo",
    description: "Quiet companionable moments",
    icon: "📚",
    imageUrl:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=800",
    aiPrompt:
      "A couple sitting side by side in a cozy sunroom, both looking at the camera with intelligent smiles, holding books, spectacles on, plants and sunlight in background, peaceful and academic",
    storyTemplate: createStoryTemplate(
      "get lost in stories together",
      "Two souls, two books, one beautiful silence. They don't need words to feel connected.",
    ),
  },
];
