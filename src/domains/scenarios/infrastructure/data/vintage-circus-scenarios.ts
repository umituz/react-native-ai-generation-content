import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const VINTAGE_CIRCUS_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.RINGMASTER_POSER,
    title: "The Ringmasters",
    description: "The show is ours",
    icon: "🎩",
    imageUrl:
      "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple as 19th century circus ringmasters standing in center of giant spotlighted circus ring, both facing camera with charismatic confident showman smiles, man in red velvet tailcoat with gold embroidery and top hat holding cane, woman in matching red and gold costume with feathered headpiece, blurred circus audience and striped tent in background",
      "dramatic theatrical spotlight with golden circus atmosphere"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple standing on thin high wire far above circus floor, man holding woman's hands for perfect balance, both facing camera with expressions of intense trust and loving connection, wearing shimmering silver and gold acrobatic leotards, dramatic spotlight from above illuminating them against dark circus tent",
      "dramatic spotlight from above with tension-filled atmospheric lighting"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple inside dark velvet circus fortune-teller tent, sitting at round table with glowing crystal ball and spread tarot cards, both facing camera with mysterious knowing smiles, man in bohemian vest and rings, woman in vintage circus fortune-teller costume with scarves and jewelry, draped fabrics and mystical objects in background",
      "warm purple and gold candlelight with intimate magical atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "peek into a future that's already written in the stars",
      "The crystal ball shows many things, but for them, the answer is always the same. A future of magic, mystery, and an unbreakable shared destiny.",
    ),
  },
];
