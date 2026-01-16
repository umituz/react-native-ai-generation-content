import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const POST_APOCALYPTIC_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.LAST_SURVIVORS_CABIN,
    title: "The Last Survivors",
    description: "Protection and peace",
    icon: "🏚️",
    imageUrl:
      "https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?w=800",
    aiPrompt:
      "A couple in a rustic fortified cabin in a dense forest, both wearing rugged weathered survival gear, man holding a crossbow, woman looking at a map, both looking at camera with determined protective expressions, afternoon sunlight through dust motes, grit and devotion",
    storyTemplate: createStoryTemplate(
      "build a life when the old world is gone",
      "The cities have fallen, but their love is a fortress that can't be breached. Together, they are the architects of a new beginning.",
    ),
  },
  {
    id: ScenarioId.WASTELAND_RAIDERS,
    title: "Wasteland Raiders",
    description: "Dust and iron",
    icon: "🏍️",
    imageUrl:
      "https://images.unsplash.com/photo-1540324155974-7523202daa3f?w=800",
    aiPrompt:
      "A couple standing next to a rusted custom-built post-apocalyptic buggy in a desert, both wearing leather and metal scrap armor, looking at the camera with fierce confident smiles, dust storm in background, high-contrast dramatic lighting, Mad Max style",
    storyTemplate: createStoryTemplate(
      "conquer the endless desert as a duo",
      "In a world of sand and fire, they are the ones who write the rules. Fast, fierce, and focused on each other.",
    ),
  },
  {
    id: ScenarioId.CITY_RECLAIMED_NATURE,
    title: "Reclaimed City",
    description: "Beauty in the ruins",
    icon: "🌿",
    imageUrl:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    aiPrompt:
      "A couple sitting on the roof of a rusted bus overgrown with vines in the middle of a deserted city square, skyscrapers in background being reclaimed by nature, both looking at the horizon with hopeful smiles, soft morning mist, cinematic and beautiful ruins",
    storyTemplate: createStoryTemplate(
      "discover the beauty of a world returned to nature",
      "Silence has returned to the city, and in its peace, they hear each other more clearly than ever. A love that thrives in the green wild.",
    ),
  },
];
