import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const AFFECTION_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.BACK_HUG_SURPRISE,
    title: "Back-Hug Surprise",
    description: "Unexpected warmth",
    icon: "🤗",
    imageUrl:
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800",
    aiPrompt:
      "A couple in a bright modern living room, man surprising woman with a warm hug from behind, hands clasped over her waist, both looking at the camera with beautiful joyful smiles, soft natural morning light, feel of safety and love",
    storyTemplate: createStoryTemplate(
      "feel the warmth of an unexpected embrace",
      "Sometimes the best words are spoken through a silent hug from behind. A moment where the world disappears, leaving only the beat of two hearts in sync.",
    ),
  },
  {
    id: ScenarioId.REUNION_EMBRACE,
    title: "The Big Reunion",
    description: "Never letting go",
    icon: "🤝",
    imageUrl:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
    aiPrompt:
      "A couple in a crowded airport or train station, dropping their bags to embrace deeply, man lifting woman slightly off the ground, both looking at each other with teary happy expressions, emotional and powerful connection, blurred background stars",
    storyTemplate: createStoryTemplate(
      "reunite after a long time apart",
      "The distance was long, but it only made this moment of reunion sweeter. In this hug, every mile they spent apart is finally forgotten.",
    ),
  },
  {
    id: ScenarioId.COZY_BLANKET_HUG,
    title: "Blanket Sanctuary",
    description: "Warmth on a cold night",
    icon: "🛋️",
    imageUrl:
      "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800",
    aiPrompt:
      "A couple wrapped together in a large thick wool blanket, sitting on an outdoor porch at night, hugging closely to stay warm, only their faces visible with cozy happy smiles, looking at camera, soft glowing fairy lights in background",
    storyTemplate: createStoryTemplate(
      "share a cozy sanctuary under the stars",
      "Winter air may be cold, but inside their shared blanket, it's the warmest place on earth. A fortress of comfort built for two.",
    ),
  },
  {
    id: ScenarioId.BEAR_HUG_LIFT,
    title: "The Bear Hug",
    description: "Lifting your spirits",
    icon: "🐻",
    imageUrl:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    aiPrompt:
      "A man giving a woman a giant bear hug and lifting her high in the air, woman's legs wrapping around his waist, both laughing with pure joy and looking at camera, sunny park or meadow background, energetic and full of life",
    storyTemplate: createStoryTemplate(
      "get swept off your feet by love",
      "There's no better feeling than being lifted up by the person who knows you best. A hug that feels like victory, laughter, and home all at once.",
    ),
  },
  {
    id: ScenarioId.RAINY_STREET_EMBRACE,
    title: "Rainy Street Hug",
    description: "Love in the downpour",
    icon: "☔",
    imageUrl:
      "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800",
    aiPrompt:
      "A couple standing in a heavy rainstorm on a city street, man wrapping his coat around the woman to keep her dry while hugging her closely, both looking at camera with serene romantic smiles, neon lights reflecting in puddles, cinematic and protective",
    storyTemplate: createStoryTemplate(
      "find shelter in each other's arms",
      "When the rain falls, they don't look for a roof. They look for each other. A protective embrace that says 'I've got you, always'.",
    ),
  },
  {
    id: ScenarioId.KITCHEN_WARMTH_HUG,
    title: "Kitchen Warmth",
    description: "Morning affection",
    icon: "🍳",
    imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800",
    aiPrompt:
      "A couple in a sun-drenched kitchen, man hugging woman from the side while she's making coffee, both leaning their heads together and looking at camera with peaceful morning smiles, dressed in soft loungewear, domestic and deeply affectionate",
    storyTemplate: createStoryTemplate(
      "start the day with a simple gesture of love",
      "Before the coffee is ready, before the day begins, there's always time for a hug. The best fuel for any day is the warmth they share.",
    ),
  },
];
