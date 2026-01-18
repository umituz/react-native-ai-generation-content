import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const COZY_PLUSH_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.PAJAMA_PILLOW_FIGHT,
    title: "Pillow Fight!",
    description: "Playful home energy",
    icon: "☁️",
    imageUrl:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800",
    aiPrompt:
      "A couple in a bright cozy bedroom, in the middle of a playful pillow fight, feathers flying in the air, both looking at the camera with ecstatic laughing expressions, wearing colorful matching pajamas, soft morning sunlight, pure joy and domestic bliss",
    storyTemplate: createStoryTemplate(
      "unleash the playful energy of a shared home",
      "Because being an adult doesn't mean you can't have a pillow fight. A love that's as light and airy as a floating feather.",
    ),
  },
  {
    id: ScenarioId.GIANT_TEDDY_MOVIE,
    title: "Giant Teddy Hug",
    description: "The ultimate soft nest",
    icon: "🧸",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    aiPrompt:
      "A couple nestled together on a giant 2-meter tall soft teddy bear on a living room floor, watching a movie (glow reflecting on faces), both looking at the camera with sleepy contented smiles, wrapped in a fluffy blanket, soft fairy lights in background, ultra-cozy",
    storyTemplate: createStoryTemplate(
      "sink into the softest embrace ever",
      "When the world outside is cold, they have their own plush paradise. A nest of comfort built for the sweetest dreams.",
    ),
  },
  {
    id: ScenarioId.CLOUD_NINE_SOFTNESS,
    title: "Cloud Nine",
    description: "Dreamy comfort",
    icon: "☁️",
    imageUrl:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
    aiPrompt:
      "A couple lying face-up on a sea of white plush cushions and soft blankets, looking at each other with peaceful dreamy smiles, glowing soft white environment, feeling of weightlessness and ultimate comfort, ethereal and heartwarming",
    storyTemplate: createStoryTemplate(
      "float on a sea of soft dreams",
      "They've found their own corner of heaven. A place where gravity doesn't exist and the only thing that matters is the softness they share.",
    ),
  },
];
