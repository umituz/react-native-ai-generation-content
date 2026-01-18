import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const VINTAGE_CIRCUS_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.RINGMASTER_POSER,
    title: "The Ringmasters",
    description: "The show is ours",
    icon: "🎩",
    imageUrl:
      "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=800",
    aiPrompt:
      "A couple dressed as 19th century circus ringmasters, standing in the center of a giant spotlighted circus ring, wearing red velvet coats with gold embroidery and top hats, both looking at the camera with charismatic and confident smiles, blurred circus audience in background, grand and theatrical",
    storyTemplate: createStoryTemplate(
      "take the lead in the greatest show on earth",
      "They aren't just part of the act; they're the ones holding the baton. A relationship that's as grand and spectacular as a three-ring circus.",
    ),
  },
  {
    id: ScenarioId.HIGH_WIRE_BALANCE,
    title: "High Wire Trust",
    description: "Perfect balance",
    icon: "🎪",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    aiPrompt:
      "A couple standing on a thin wire high above a circus floor, man holding woman's hands for balance, both looking at each other with intense trust and loving smiles, wearing shimmering acrobatic outfits, dramatic spotlight from above, atmosphere of tension and absolute connection",
    storyTemplate: createStoryTemplate(
      "find your balance in the highest of stakes",
      "In the air, with no net below, they only have each other to hold onto. And that's exactly where they feel the safest. A bond that never wavers.",
    ),
  },
  {
    id: ScenarioId.MYSTIC_TENT_SECRETS,
    title: "Mystic Tent",
    description: "Predicting our future",
    icon: "🔮",
    imageUrl:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800",
    aiPrompt:
      "A couple inside a dark velvet circus tent, sitting at a table with a glowing crystal ball and tarot cards, both looking into each other's eyes with mysterious smiles, wearing bohemian vintage circus attire, warm purple and gold lighting, intimate and magical atmosphere",
    storyTemplate: createStoryTemplate(
      "peek into a future that's already written in the stars",
      "The crystal ball shows many things, but for them, the answer is always the same. A future of magic, mystery, and an unbreakable shared destiny.",
    ),
  },
];
