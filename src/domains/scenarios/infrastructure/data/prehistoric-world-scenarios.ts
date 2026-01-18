import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const PREHISTORIC_WORLD_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.DINO_RIDER_ADVENTURE,
    title: "Dino Riders",
    description: "Prehistoric speed",
    icon: "🦖",
    imageUrl:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800",
    aiPrompt:
      "A couple riding on the back of a large friendly-looking Velociraptor through a lush prehistoric jungle, man holding the reins, woman looking at the camera with an ecstatic laugh, wearing rugged primitive furs and leather, massive ferns and trees in background, sunny and vibrant adventure",
    storyTemplate: createStoryTemplate(
      "ride into the dawn of time on the back of a legend",
      "They aren't just survivors; they're explorers of a world where everything is new. A love that's as wild and powerful as the creatures they ride.",
    ),
  },
  {
    id: ScenarioId.CAVE_ART_FIRE,
    title: "Cave Fire",
    description: "The first storytellers",
    icon: "🔥",
    imageUrl:
      "https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?w=800",
    aiPrompt:
      "A couple inside a dark cave, man painting a mural on the wall using red ochre, woman holding a torch to light the wall, both looking at each other with warm affectionate smiles, wearing simple animal furs, flickering firelight, intimate and primitive connection",
    storyTemplate: createStoryTemplate(
      "write your own story on the very first walls of humanity",
      "By the light of a flickering torch, they are documenting their history. A love that began at the very start of time and will outlast the stone itself.",
    ),
  },
  {
    id: ScenarioId.VALLEY_OF_TITANS,
    title: "Valley of Titans",
    description: "Walking with giants",
    icon: "🦕",
    imageUrl:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
    aiPrompt:
      "A couple standing on a ridge overlooking a massive valley where several Brachiosaurus are grazing, man and woman looking at the giants with awe, leaning into each other, wearing primitive furs, vast lush landscape with volcanoes in the far distance, epic and primordial",
    storyTemplate: createStoryTemplate(
      "stand in awe of the giants that once ruled the world",
      "In a valley dominated by titans, they've found that the strongest thing of all is the bond they share. A love that's truly pre-historic.",
    ),
  },
];
