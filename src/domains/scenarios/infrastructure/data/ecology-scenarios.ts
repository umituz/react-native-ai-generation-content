import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const ECOLOGY_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.TREEHOUSE_KINGDOM,
    title: "Treehouse Haven",
    description: "Living with the canopy",
    icon: "🏠",
    imageUrl: "https://images.unsplash.com/photo-1547038577-da80abbc4f19?w=800",
    aiPrompt:
      "A couple in a massive luxury treehouse balcony, both looking at the camera with peaceful smiles, dressed in sustainable organic linen clothing, lush ancient rainforest and giant trees in background, warm sunlight through leaves, eco-luxury and serene",
    storyTemplate: createStoryTemplate(
      "find peace in the high canopy",
      "High above the forest floor, they've built a life that breathes with the earth and flows with the wind.",
    ),
  },
  {
    id: ScenarioId.VERTICAL_FOREST,
    title: "Eco City Life",
    description: "Green urban future",
    icon: "🏢",
    imageUrl: "https://images.unsplash.com/photo-1545641203-7d072a14e3b2?w=800",
    aiPrompt:
      "A couple on a plant-covered balcony of a futuristic skyscraper, both looking at the camera with content smiles, dressed in modern sustainable fashion, city of the future with buildings covered in vertical forests in background, clean air and bright sky, hopeful and advanced",
    storyTemplate: createStoryTemplate(
      "live in a city that breathes",
      "They are the architects of a harmony where technology and nature are no longer at odds, but in a perfect embrace.",
    ),
  },
  {
    id: ScenarioId.OCEAN_PROTECTORS,
    title: "Ocean Protectors",
    description: "Guardians of the reef",
    icon: "🌊",
    imageUrl:
      "https://images.unsplash.com/photo-1524316325922-77b31ebee784?w=800",
    aiPrompt:
      "A couple on a research vessel at sea, both looking at the camera with passionate smiles, wearing professional marine biology gear, holding underwater cameras, crystal blue ocean and coral reefs visible below in background, bright tropical sun, committed and adventurous",
    storyTemplate: createStoryTemplate(
      "save the sapphire heart of the world",
      "Every dive is a mission, every reef a treasure. Together, they ensure the ocean's song never fades.",
    ),
  },
  {
    id: ScenarioId.ECO_WARRIORS,
    title: "Eco-Warriors",
    description: "Defenders of the wild",
    icon: "🏹",
    imageUrl:
      "https://v3b.fal.media/files/b/0a89bbdb/Q_t0NaB59_MYmsvn86VsC.jpg",
    aiPrompt:
      "A couple as tribal eco-warriors in a pristine wild valley, both looking at the camera with proud determined expressions, wearing traditional clothing made of natural fibers and feathers, holding wooden bows or staves, majestic waterfalls and mountains in background, powerful and grounded",
    storyTemplate: createStoryTemplate(
      "stand as the shield of the earth",
      "The land knows them, and they know the land. They are the guardians of a world that still remembers its soul.",
    ),
  },
];
