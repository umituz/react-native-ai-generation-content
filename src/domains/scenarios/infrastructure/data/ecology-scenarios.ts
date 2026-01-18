import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const ECOLOGY_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.TREEHOUSE_KINGDOM,
    title: "Treehouse Haven",
    description: "Living with the canopy",
    icon: "🏠",
    imageUrl: "https://images.unsplash.com/photo-1547038577-da80abbc4f19?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple on wraparound balcony of stunning luxury treehouse in ancient rainforest, both facing camera with peaceful content smiles, man in natural undyed linen shirt and hemp pants barefoot, woman in flowing organic cotton dress in sage green with wooden bead jewelry, massive ancient ceiba trees with hanging vines and tropical orchids and mist rising from emerald canopy below in background",
      "warm dappled golden sunlight filtering through jungle canopy with soft green ambient light"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple on lush plant-covered balcony of futuristic eco-skyscraper, both facing camera with content optimistic smiles, man in minimalist sustainable bamboo fiber jacket in earth tones, woman in recycled fabric dress in terracotta with succulent plant in hand, stunning futuristic cityscape with buildings entirely covered in vertical forests and green living walls with wind turbines and solar panels integrated and crystal clear blue sky in background",
      "bright clean natural daylight with fresh green tones and clear atmospheric quality"
    ),
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
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple as marine biologists on deck of research vessel at sea, both facing camera with passionate committed smiles, man in navy blue wetsuit top with NOAA patch holding underwater housing camera with large dome port, woman in teal rash guard with marine conservation logo holding clipboard with coral health data, crystal clear turquoise water with vibrant coral reef and sea turtles visible below surface in background",
      "bright tropical midday sun with sparkling water reflections and vivid blue sky"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple as indigenous eco-warriors in pristine wild valley, both facing camera with proud determined expressions, man in traditional woven natural fiber tunic with feather headdress and ceremonial face paint holding carved wooden staff, woman in hand-dyed earth-toned garments with bone and seed jewelry holding handcrafted bow, majestic waterfall cascading down moss-covered cliff face with snow-capped mountains and untouched old-growth forest in background",
      "dramatic natural lighting with golden sun rays breaking through clouds and mist from waterfall"
    ),
    storyTemplate: createStoryTemplate(
      "stand as the shield of the earth",
      "The land knows them, and they know the land. They are the guardians of a world that still remembers its soul.",
    ),
  },
];
