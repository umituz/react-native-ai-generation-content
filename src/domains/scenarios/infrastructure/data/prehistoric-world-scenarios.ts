import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const PREHISTORIC_WORLD_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.DINO_RIDER_ADVENTURE,
    title: "Dino Riders",
    description: "Prehistoric speed",
    icon: "🦖",
    imageUrl:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple riding on back of large friendly Velociraptor through lush prehistoric jungle, man holding leather reins with adventurous grin, woman facing camera with ecstatic laugh and windswept hair, both wearing rugged primitive furs and leather straps, massive ferns and ancient trees in background",
      "bright vibrant jungle sunlight with dappled shadows and warm adventure atmosphere"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple inside dark prehistoric cave, man painting ochre mural on rough stone wall, woman holding blazing torch to illuminate art, both facing camera with warm affectionate smiles, wearing simple animal fur garments, ancient cave paintings visible on walls",
      "warm flickering firelight casting dancing shadows on cave walls"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple standing on rocky ridge overlooking massive valley with grazing Brachiosaurus dinosaurs, both facing camera with awestruck expressions leaning into each other, wearing primitive fur clothing, vast lush prehistoric landscape with distant smoking volcanoes in background",
      "epic golden hour lighting with atmospheric haze and primordial grandeur"
    ),
    storyTemplate: createStoryTemplate(
      "stand in awe of the giants that once ruled the world",
      "In a valley dominated by titans, they've found that the strongest thing of all is the bond they share. A love that's truly pre-historic.",
    ),
  },
];
