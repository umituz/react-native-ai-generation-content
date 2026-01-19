import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const NOSTALGIA_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.FLOWER_POWER,
    title: "60s Flower Power",
    description: "Peace, love, and music",
    icon: "🌸",
    imageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple in 1960s hippie era at music festival, both facing camera with carefree peace-sign smiles, man in colorful paisley shirt and bell-bottom jeans with round sunglasses, woman in flowing maxi dress with fresh flower crown and beaded jewelry, vintage turquoise VW van and sunny wildflower meadow in background",
      "warm vintage film look with soft grain and golden summer light"
    ),
    storyTemplate: createStoryTemplate(
      "spread peace and love",
      "They are the original dreamers, finding that the only thing more colorful than their world is the love they share.",
    ),
  },
  {
    id: ScenarioId.NEON_80S,
    title: "80s Neon Retro",
    description: "Synthwave summer",
    icon: "📼",
    imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple in 1980s synthwave aesthetic at night, both facing camera with cool confident expressions, man in bright turquoise windbreaker with popped collar and aviator sunglasses, woman in neon pink off-shoulder top with big hair and geometric earrings, neon-lit arcade with glowing cabinets or retro city street with palm trees in background",
      "vibrant magenta and cyan neon lighting with synthwave atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "ride the synthwave",
      "In a world of neon grids and digital beats, their love is the only melody that never fades.",
    ),
  },
  {
    id: ScenarioId.GRUNGE_90S_STYLE,
    title: "90s Grunge",
    description: "Authentic and edgy",
    icon: "🎸",
    imageUrl: "https://images.unsplash.com/photo-1485217988980-11786ced9454?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple in 1990s grunge era, both facing camera with edgy nonchalant expressions, man in oversized flannel shirt over band tee with ripped jeans and combat boots, woman in slip dress over t-shirt with choker and Doc Martens, dark city alley with graffiti or underground club with exposed pipes in background",
      "moody raw lighting with film grain and grunge atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "live their own raw story",
      "No pretenses, no filters. Just raw emotion and a connection that's as real as it gets.",
    ),
  },
  {
    id: ScenarioId.Y2K_FUTURE,
    title: "Y2K Vision",
    description: "Millennium futurism",
    icon: "💿",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple in early 2000s Y2K futurism style, both facing camera with optimistic futuristic smiles, man in shiny silver metallic jacket and frosted tips, woman in iridescent holographic mini dress with tiny bubble sunglasses and platform shoes, white minimalist interior with translucent plastic furniture and chrome accents in background",
      "bright high-key lighting with clean white and iridescent reflections"
    ),
    storyTemplate: createStoryTemplate(
      "welcome the new millennium",
      "At the dawn of a new age, they embrace the shiny, plastic, and digital future with open arms and hearts.",
    ),
  },
];
