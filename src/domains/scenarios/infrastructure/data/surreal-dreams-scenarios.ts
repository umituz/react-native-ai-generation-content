import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const SURREAL_DREAMS_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.FLOATING_ARCHITECTURE_DANCE,
    title: "Dream Dance",
    description: "Gravity is optional",
    icon: "🌀",
    imageUrl:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple dancing weightlessly in air between surreal floating stone blocks and spiraling impossible bridges, man holding woman as they spin gracefully, both facing camera with peaceful dreamy expressions, wearing flowing silk garments that billow in zero gravity, clouds far below and massive glowing moon in background",
      "ethereal blue and purple lighting with dreamy Inception-style atmosphere"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple standing on giant suspended platform in sky filled with massive brass gears and clockwork mechanisms, both facing camera with awestruck expressions, man pointing at horizon, woman leaning head on his shoulder, wearing elegant Victorian clothing, giant clockwork sun visible in background",
      "surreal golden lighting with epic sci-fi fantasy atmosphere"
    ),
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
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple standing on perfectly reflective black crystal floor in surreal void, surrounded by giant floating mirrors showing different versions of their future, both facing camera with profound knowing smiles, wearing elegant dark clothing, glowing crystalline structures floating in dark environment",
      "artistic ethereal lighting with mirror reflections and surreal atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "see every possibility of your future in a single glance",
      "Thousands of reflections, thousands of paths, but every single one leads back to each other. They've found the ultimate symmetry in a world of echoes.",
    ),
  },
];
