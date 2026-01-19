import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const MAGICAL_REALISM_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.INDOOR_FOREST_LIVING,
    title: "Indoor Forest",
    description: "Nature in the living room",
    icon: "🌿",
    imageUrl:
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple sitting on modern gray sofa in living room transformed into forest, both facing camera with peaceful knowing smiles, floor covered in thick emerald moss and wildflowers, massive oak tree growing through center of room with branches spreading across ceiling, monarch butterflies fluttering around them, man in earth-toned sweater woman in flowing green dress",
      "warm golden sunlight filtering through indoor leaves creating dappled magical light"
    ),
    storyTemplate: createStoryTemplate(
      "watch as your home becomes a wild and magical sanctuary",
      "Who says you need to leave the house to find a forest? In their world, nature doesn't just surround them; it grows from the very heart of their shared space.",
    ),
  },
  {
    id: ScenarioId.LEVITATING_COFFEE_BREAK,
    title: "Floating Breakfast",
    description: "Gravity-defying morning",
    icon: "☕",
    imageUrl:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple in bright sunlit kitchen with floating breakfast, both facing camera with playful amazed smiles, ceramic coffee cups and plates and golden pancakes levitating 20cm above wooden table, man in white t-shirt reaching for floating orange juice, woman in silk robe with messy morning hair giggling at floating croissant",
      "soft warm morning sunlight streaming through windows with magical sparkle particles"
    ),
    storyTemplate: createStoryTemplate(
      "experience the weightlessness of a magical morning",
      "Even the most ordinary breakfast can become extraordinary when you're in love. A morning where gravity is just a suggestion and joy is the only constant.",
    ),
  },
  {
    id: ScenarioId.STARLIT_ROOM_GALAXY,
    title: "Galaxy Room",
    description: "Stars beneath the ceiling",
    icon: "🌌",
    imageUrl:
      "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple lying face-up on plush bedroom carpet, both facing camera with dreamy profound expressions, ceiling transformed into real swirling deep-space galaxy with millions of stars and purple nebulae, room bathed in ethereal starlight, man in comfortable gray sweats woman in soft white pajamas, hands intertwined between them",
      "cosmic starlight illumination with purple and blue nebula glow"
    ),
    storyTemplate: createStoryTemplate(
      "sleep beneath the stars without ever leaving your bed",
      "They aren't just looking at the universe; they're inviting it into their most private space. A love that's as vast and deep as the galaxy above them.",
    ),
  },
];
