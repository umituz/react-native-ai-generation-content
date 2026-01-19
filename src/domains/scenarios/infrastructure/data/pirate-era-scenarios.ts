import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const PIRATE_ERA_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.STORMY_DECK_LEADERSHIP,
    title: "Stormy Deck",
    description: "Commanding the waves",
    icon: "🌊",
    imageUrl:
      "https://images.unsplash.com/photo-1516939884455-1445c8652f83?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple as pirate captains on massive galleon deck during fierce storm, both gripping ornate ship's wheel together with heroic determination, man in weathered leather captain's coat with tricorn hat, woman in billowing pirate shirt with bandana and cutlass at hip, giant waves crashing over deck and lightning illuminating dark churning sea in background",
      "dramatic stormy lighting with lightning flashes and rain spray"
    ),
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
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple discovering treasure in dark limestone cave, both facing camera with ecstatic triumphant smiles holding massive glowing ruby together, man in rugged pirate vest holding flaming torch, woman in corsair blouse with bandana, overflowing wooden chests of gold doubloons and sparkling jewels and ancient artifacts surrounding them",
      "warm flickering torchlight reflecting off gold coins and gems"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple as castaways on pristine tropical island paradise, both facing camera with carefree sun-kissed smiles, man in tattered linen shirt with rope belt, woman in torn cotton dress with shell necklace, building cozy driftwood shelter together, white sand beach with leaning palm trees and crystal turquoise water in background",
      "bright tropical sunlight with warm golden beach atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "build your own world on a distant tropical shore",
      "Being shipwrecked never felt so good. In their own private paradise, the only law is love and the only clock is the rising of the sun.",
    ),
  },
];
