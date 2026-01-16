import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const NOSTALGIA_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.FLOWER_POWER,
    title: "60s Flower Power",
    description: "Peace, love, and music",
    icon: "🌸",
    imageUrl:
      "https://images.unsplash.com/photo-1523456720240-276632c020f0?w=800",
    aiPrompt:
      "A couple in the 1960s hippie era, both looking at the camera with carefree smiles, wearing colorful paisley shirts and bell-bottom jeans, flower crowns, vintage VW van and sunny meadow in background, film grain and warm vintage lighting, peaceful and free",
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
    aiPrompt:
      "A couple in the 1980s synthwave aesthetic, both looking at the camera with cool confident expressions, wearing retro windbreakers and aviator sunglasses, neon-lit arcade or retro city street at night in background, magenta and cyan lighting, nostalgic and vibrant",
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
    imageUrl: "https://images.unsplash.com/photo-1542013858-69389be90709?w=800",
    aiPrompt:
      "A couple in the 1990s grunge era, both looking at the camera with edgy nonchalant expressions, wearing flannel shirts and combat boots, city alley or underground music venue in background, raw film texture and moody lighting, authentic and cool",
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
    aiPrompt:
      "A couple in the early 2000s Y2K futurism style, both looking at the camera with futuristic smiles, wearing shiny silver metallic clothing and bubble sunglasses, white plastic minimalist interior with translucent accents in background, bright high-key lighting, retro-futuristic",
    storyTemplate: createStoryTemplate(
      "welcome the new millennium",
      "At the dawn of a new age, they embrace the shiny, plastic, and digital future with open arms and hearts.",
    ),
  },
];
