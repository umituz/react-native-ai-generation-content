import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const POST_APOCALYPTIC_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.LAST_SURVIVORS_CABIN,
    title: "The Last Survivors",
    description: "Protection and peace",
    icon: "🏚️",
    imageUrl:
      "https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple in rustic fortified cabin in dense forest, both facing camera with determined protective expressions, man in weathered leather jacket holding crossbow, woman in rugged survival gear studying worn map, barricaded windows and stockpiled supplies visible, afternoon sunlight streaming through dust motes in background",
      "warm golden afternoon light filtering through dusty cabin windows"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple standing next to rusted custom-built post-apocalyptic buggy in desert wasteland, both facing camera with fierce confident smiles, man in leather armor with metal shoulder plates, woman in spiked leather jacket with goggles on forehead, swirling dust storm and orange sky in background",
      "dramatic high-contrast desert lighting with dust particles in golden hour"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple sitting on roof of rusted bus overgrown with vines in deserted city square, both facing camera with hopeful peaceful smiles, wearing weathered but clean clothing, crumbling skyscrapers covered in green foliage and wildflowers in background, nature reclaiming urban landscape",
      "soft misty morning light with ethereal atmosphere and green tones"
    ),
    storyTemplate: createStoryTemplate(
      "discover the beauty of a world returned to nature",
      "Silence has returned to the city, and in its peace, they hear each other more clearly than ever. A love that thrives in the green wild.",
    ),
  },
];
