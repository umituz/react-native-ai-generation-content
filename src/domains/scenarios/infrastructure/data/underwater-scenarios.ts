import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const UNDERWATER_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.CORAL_THRONE_ROYALTY,
    title: "Coral Throne",
    description: "Royalty of the deep",
    icon: "🧜‍♂️",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
    aiPrompt:
      "A couple sitting on a throne made of bioluminescent white coral at the bottom of the ocean, man and woman as mer-people with shimmering iridescent tails, surrounded by schools of tropical fish and glowing jellyfish, both looking at the camera with serene royal smiles, shafts of sunlight filtering through deep water, magical and underwater",
    storyTemplate: createStoryTemplate(
      "rule the silent depths of the ocean as its most elegant guardians",
      "They aren't just visitors to the deep; they are its heart. In the cool blue silence, they've built a kingdom that spans the entire sea.",
    ),
  },
  {
    id: ScenarioId.SUNKEN_LIBRARY_MYSTERY,
    title: "Sunken Library",
    description: "Lost knowledge",
    icon: "📖",
    imageUrl: "https://images.unsplash.com/photo-1544208062-35925507204b?w=800",
    aiPrompt:
      "A couple in an ancient library inside a sunken marble temple underwater, both looking at a stone tablet while floating weightlessly, bubbles rising from their lips, wearing flowing ethereal garments, ancient statues covered in sea plants, soft blue-green lighting, mystery and discovery",
    storyTemplate: createStoryTemplate(
      "uncover the lost secrets of a civilization claimed by the tides",
      "The world above long forgot these stories, but they are here to bring them back to life. A love that's deeper than the deepest abyss.",
    ),
  },
  {
    id: ScenarioId.DEEP_SEA_GLOW,
    title: "Deep Sea Glow",
    description: "Bioluminescent wonder",
    icon: "✨",
    imageUrl:
      "https://images.unsplash.com/photo-1512140411829-2b6fe684be4d?w=800",
    aiPrompt:
      "A couple swimming in the pitch-black deep sea, surrounded by millions of glowing bioluminescent plankton and deep-sea creatures, their faces lit by the soft ethereal glow, looking into each other's eyes, beautiful and surreal underwater environment, cosmic-like underwater photography",
    storyTemplate: createStoryTemplate(
      "become the light in the darkest corners of the ocean",
      "In the total darkness of the deep, their connection is the brightest thing there is. A love that creates its own light in the shadows.",
    ),
  },
];
