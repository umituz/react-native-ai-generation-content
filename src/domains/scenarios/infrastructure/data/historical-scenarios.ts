/**
 * Historical Scenarios
 * Scenarios focused on different historical eras
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const HISTORICAL_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.ROARING_20S,
    title: "Roaring 20s",
    description: "Jazz age glamour",
    icon: "🎷",
    imageUrl:
      "https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=800&auto=format&fit=crop&q=60",
    aiPrompt:
      "A couple in the Roaring 20s, both standing together and looking at the camera with joyful expressions, dressed in flapper dress and tuxedo, luxurious ballroom with champagne and jazz atmosphere in background, art deco styling, glamorous and energetic",
    storyTemplate: createStoryTemplate(
      "dance through the Jazz Age",
      "In a swirl of gold dust and jazz, they find a love that outshines the brightest party.",
    ),
  },
  {
    id: ScenarioId.VICTORIAN,
    title: "Victorian Romance",
    description: "Elegant royal love",
    icon: "👑",
    imageUrl:
      "https://images.unsplash.com/photo-1460518451285-97b6aa326961?w=800&auto=format&fit=crop&q=60",
    aiPrompt:
      "A couple in the Victorian era standing in a garden, both looking at the camera with elegant romantic expressions, dressed in intricate lace ballgown and period tailcoat, lush English garden with romantic gazebo in background, romantic and elegant",
    storyTemplate: createStoryTemplate(
      "promenade through a royal romance",
      "Amidst whispers and waltzes, their hearts beat in a rhythm only they can hear.",
    ),
  },
  {
    id: ScenarioId.WILD_WEST,
    title: "Wild West",
    description: "Frontier adventures",
    icon: "🤠",
    imageUrl:
      "https://images.unsplash.com/photo-1635857770451-71634ff4f384?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHdpbGQlMjB3ZXN0fGVufDB8fDB8fHww",
    aiPrompt:
      "A couple as Wild West wranglers riding horses, both looking at the camera with rugged adventurous expressions, dressed in authentic cowboy hats, denim, leather chaps and western shirts, sun-tanned faces, vast open prairie with cattle herd and endless sky in background, rugged and adventurous",
    storyTemplate: createStoryTemplate(
      "ride into the sunset together",
      "On the open frontier, they found a home in the untamed wilderness of their hearts.",
    ),
  },
  {
    id: ScenarioId.VIKING,
    title: "Viking Legends",
    description: "Warrior spirit",
    icon: "⚔️",
    imageUrl:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=60",
    aiPrompt:
      "A couple as Viking warriors, both looking at the camera with fierce strong expressions, dressed in leather and fur armor, dramatic fjord landscape with mist in background, epic and fierce",
    storyTemplate: createStoryTemplate(
      "forge a legend in the north",
      "Bound by honor and heart, their saga will be sung for generations to come.",
    ),
  },
];
