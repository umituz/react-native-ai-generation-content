import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const BUCKET_LIST_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.HOT_AIR_BALLOON,
    title: "Hot Air Balloon",
    description: "Soaring above the world",
    icon: "🎈",
    imageUrl: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple in wicker hot air balloon basket high in the sky, both facing camera with thrilled joyful smiles, man in cream linen shirt holding crystal champagne flute, woman in flowing white cotton dress with rose gold bracelet raising glass, colorful striped balloon canopy above, stunning panoramic view of Cappadocia fairy chimneys and green valleys with other balloons dotting the sky far below",
      "magical golden sunrise light with warm orange and pink gradient sky and soft morning mist in valleys"
    ),
    storyTemplate: createStoryTemplate(
      "tick off a dream together",
      "High above the world, they see their future - vast, beautiful, and limitless.",
    ),
  },
  {
    id: ScenarioId.SCUBA_DIVING,
    title: "Scuba Diving",
    description: "Underwater exploration",
    icon: "🌊",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple scuba diving together underwater, both facing camera through clear masks with happy excited eyes, man in black and blue wetsuit with silver oxygen tank and regulator giving thumbs up, woman in teal wetsuit with underwater camera in hand, vibrant coral reef with purple fan corals and schools of orange clownfish and blue tangs swimming around them, crystal clear turquoise Caribbean water with sunbeams penetrating from surface",
      "natural underwater caustic light patterns with vibrant tropical color saturation and blue water gradient"
    ),
    storyTemplate: createStoryTemplate(
      "explore a whole new world",
      "Beneath the surface, they've found a hidden paradise. A silent, beautiful world shared only by them.",
    ),
  },
  {
    id: ScenarioId.THEME_PARK,
    title: "Theme Park Magic",
    description: "Thrills and laughs",
    icon: "🎢",
    imageUrl:
      "https://images.unsplash.com/photo-1502136969935-8d8eef54d77b?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple at magical theme park, both facing camera with ecstatic childlike grins, man wearing sparkly black mouse ear headband and red polo shirt holding giant rainbow swirl lollipop, woman in polka dot dress with sequined bow headband holding pink cotton candy, iconic Cinderella-style castle with blue spires and colorful roller coaster loops in background, festive bunting and balloons everywhere",
      "bright cheerful afternoon sunlight with vibrant saturated colors and magical fairy-tale atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "unleash their inner children",
      "Adrenaline rushes and sweet treats. In the land of magic, they find that their love is the most magical part of all.",
    ),
  },
  {
    id: ScenarioId.CIRCUS_PERFORMANCE,
    title: "Circus Stars",
    description: "Amazing stage adventure",
    icon: "🎪",
    imageUrl:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple as glamorous circus ringmasters, both facing camera with confident showmanship smiles and theatrical poses, man in ruby red velvet tailcoat with gold epaulettes and black top hat with golden band, woman in sparkling silver sequined leotard with matching cape and feathered headdress, inside grand red and gold striped big top tent with dramatic spotlight beams cutting through haze and trapeze rigging visible above",
      "dramatic theatrical spotlight with warm golden center light and deep red shadows around edges"
    ),
    storyTemplate: createStoryTemplate(
      "star in their own spectacular show",
      "Under the big top, with thousands watching, they perform the ultimate act of partnership and trust.",
    ),
  },
];
