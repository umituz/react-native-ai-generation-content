import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const UNDERWATER_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.CORAL_THRONE_ROYALTY,
    title: "Coral Throne",
    description: "Royalty of the deep",
    icon: "🧜‍♂️",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple as mer-people sitting on throne made of bioluminescent white coral at ocean bottom, both facing camera with serene royal smiles, man with shimmering blue-green iridescent tail, woman with violet-pink tail and shell crown, schools of tropical fish and glowing jellyfish surrounding them, shafts of golden sunlight filtering through deep water",
      "ethereal underwater lighting with bioluminescent glow and magical atmosphere"
    ),
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
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple in ancient library inside sunken marble temple underwater, both facing camera while floating weightlessly examining glowing stone tablet together, wearing flowing ethereal garments with hair floating, tiny bubbles rising, ancient statues covered in sea plants and coral in background",
      "soft blue-green underwater lighting with mysterious discovery atmosphere"
    ),
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
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple swimming in pitch-black deep sea, faces illuminated by millions of glowing bioluminescent plankton and ethereal deep-sea creatures, both facing camera with wonder-filled expressions, surrounded by swirling blue and green light particles creating cosmic-like underwater environment",
      "ethereal bioluminescent glow with cosmic deep-sea atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "become the light in the darkest corners of the ocean",
      "In the total darkness of the deep, their connection is the brightest thing there is. A love that creates its own light in the shadows.",
    ),
  },
];
