import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const MAGICAL_REALISM_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.INDOOR_FOREST_LIVING,
    title: "Indoor Forest",
    description: "Nature in the living room",
    icon: "🌿",
    imageUrl:
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800",
    aiPrompt:
      "A couple sitting on a modern sofa in their living room, but the floor is covered in thick green moss and flowers, a real oak tree growing through the center of the room, butterflies fluttering around, both looking at the camera with peaceful and knowing smiles, sunlight filtering through leaves indoors, magical realism",
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
    aiPrompt:
      "A couple in a bright sunlit kitchen, sitting at a table where the coffee cups, plates, and pancakes are all sifting and levitating 20cm above the surface, both looking at each other over the floating items with playful and amazed smiles, soft morning highlights, ordinary life touched by magic",
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
    aiPrompt:
      "A couple lying face-up on their bedroom floor, looking up at the ceiling which has turned into a real, swirling deep-space galaxy with stars and nebulae, the room is dimly lit by the starlight, both looking at the camera with dreamy and profound expressions, magical realism and cosmic wonder",
    storyTemplate: createStoryTemplate(
      "sleep beneath the stars without ever leaving your bed",
      "They aren't just looking at the universe; they're inviting it into their most private space. A love that's as vast and deep as the galaxy above them.",
    ),
  },
];
