import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const PIRATE_ERA_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.STORMY_DECK_LEADERSHIP,
    title: "Stormy Deck",
    description: "Commanding the waves",
    icon: "🌊",
    imageUrl:
      "https://images.unsplash.com/photo-1516939884455-1445c8652f83?w=800",
    aiPrompt:
      "A couple on the deck of a massive wooden pirate ship during a heavy storm, both holding the captain's wheel together, giant waves crashing around them, wearing 18th century pirate attire with leather and buckles, looking at each other with heroic determination, dramatic lightning flashes, epic and intense",
    storyTemplate: createStoryTemplate(
      "navigate the wildest storms of the seven seas",
      "The ocean is deep and the waves are high, but they are the undisputed masters of their fate. Together, they can steer any ship through any storm.",
    ),
  },
  {
    id: ScenarioId.TREASURE_CAVE_DISCOVERY,
    title: "Treasure Cave",
    description: "Found the jackpot",
    icon: "💎",
    imageUrl:
      "https://images.unsplash.com/photo-1541278107931-e00652309623?w=800",
    aiPrompt:
      "A couple in a dark limestone cavern filled with overflowing chests of gold coins, jewels, and ancient artifacts, man holding a flaming torch, both looking at a massive ruby in their hands with ecstatic smiles, wearing rugged pirate clothing, warm flickering firelight, mystery and triumph",
    storyTemplate: createStoryTemplate(
      "uncover a fortune beyond anyone's wildest dreams",
      "They've searched every corner of the map, and finally, the prize is theirs. But the real treasure was the journey they shared to get here.",
    ),
  },
  {
    id: ScenarioId.ISLAND_PARADISE_LONELY,
    title: "Island Paradise",
    description: "Castaways in luxury",
    icon: "🏝️",
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    aiPrompt:
      "A couple on a perfect white sand tropical beach with leaning palm trees, building a luxury hut from driftwood, both looking at the camera with carefree sun-kissed smiles, turquoise ocean in background, wearing tattered but stylish linen clothes, bright sunny day, peaceful and romantic",
    storyTemplate: createStoryTemplate(
      "build your own world on a distant tropical shore",
      "Being shipwrecked never felt so good. In their own private paradise, the only law is love and the only clock is the rising of the sun.",
    ),
  },
];
