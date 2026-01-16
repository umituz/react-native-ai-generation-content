import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const SURREAL_DREAMS_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.FLOATING_ARCHITECTURE_DANCE,
    title: "Dream Dance",
    description: "Gravity is optional",
    icon: "🌀",
    imageUrl:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800",
    aiPrompt:
      "A couple dancing in the air between surreal floating stone blocks and spiraling bridges, clouds below them, man holding woman as they spin weightlessly, wearing flowing silk garments, massive glowing moon in background, ethereal blue and purple lighting, Inception-style dreamscape",
    storyTemplate: createStoryTemplate(
      "transcend the laws of physics in a world of pure imagination",
      "When they're together, gravity has no power. They've found a way to dance among the stars, where every step is a leap of faith into the infinite.",
    ),
  },
  {
    id: ScenarioId.CLOCKWORK_SKY_MOMENT,
    title: "Clockwork Sky",
    description: "Master of time",
    icon: "⚙️",
    imageUrl:
      "https://images.unsplash.com/photo-1501139083538-0139583c060f?w=800",
    aiPrompt:
      "A couple standing on a giant suspended platform in a sky filled with massive brass gears and clockwork mechanisms, looking at a giant ticking Sun, man pointing at the horizon, woman leaning her head on his shoulder, both looking at camera with awe, surreal and epic sci-fi fantasy",
    storyTemplate: createStoryTemplate(
      "watch the gears of the universe turn from your front-row seat",
      "Time is a vast and complex machine, but in this moment, it has stopped just for them. They are the heartbeat in the center of the world's clock.",
    ),
  },
  {
    id: ScenarioId.MIRROR_WORLD_REFLECTIONS,
    title: "Mirror World",
    description: "Symmetry of love",
    icon: "🪞",
    imageUrl:
      "https://images.unsplash.com/photo-1481349518771-2dc0feed76ad?w=800",
    aiPrompt:
      "A couple standing on a perfectly reflective black crystal floor, surrounded by giant floating mirrors that show different versions of their future together, looking at their reflections with profound smiles, dark void environment with glowing crystalline structures, highly artistic and surreal",
    storyTemplate: createStoryTemplate(
      "see every possibility of your future in a single glance",
      "Thousands of reflections, thousands of paths, but every single one leads back to each other. They've found the ultimate symmetry in a world of echoes.",
    ),
  },
];
