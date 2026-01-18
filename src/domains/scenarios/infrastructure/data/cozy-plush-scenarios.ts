import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const COZY_PLUSH_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.PAJAMA_PILLOW_FIGHT,
    title: "Pillow Fight!",
    description: "Playful home energy",
    icon: "☁️",
    imageUrl:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple having epic pillow fight in bright cozy bedroom, both facing camera with ecstatic laughing expressions and genuine joy, white goose feathers floating dramatically in air, man in navy blue cotton pajama pants and white t-shirt swinging large white pillow, woman in soft lavender silk pajama set with messy hair wielding fluffy pillow, plush white duvet and scattered decorative pillows on king-sized bed in background",
      "bright soft morning sunlight streaming through sheer white curtains creating dreamy backlit atmosphere"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple snuggled together on massive 2-meter tall cream-colored plush teddy bear in cozy living room, both facing camera with sleepy contented smiles, TV glow reflecting softly on happy faces, man in gray hoodie, woman in oversized cream sweater with messy bun wrapped together in chunky knit caramel blanket, warm string fairy lights draped around and scattered throw pillows on wooden floor in background",
      "warm cozy ambient lighting from fairy lights and soft TV glow creating intimate atmosphere"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple lying face-up on sea of fluffy white cloud-like cushions and soft mohair blankets, gazing at each other with peaceful dreamy smiles and fingers gently touching, man in soft white linen shirt, woman in delicate cream silk camisole, surrounded by endless white plush pillows and faux fur throws creating ethereal weightless environment, soft white atmosphere with gentle ambient glow",
      "ethereal soft diffused lighting with pure white tones and heavenly glow from all directions"
    ),
    storyTemplate: createStoryTemplate(
      "float on a sea of soft dreams",
      "They've found their own corner of heaven. A place where gravity doesn't exist and the only thing that matters is the softness they share.",
    ),
  },
];
