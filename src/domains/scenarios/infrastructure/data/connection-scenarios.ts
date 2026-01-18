import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const CONNECTION_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.SURPRISE_REVEAL,
    title: "The Future Revelation",
    description: "Seeing your future for the first time",
    icon: "📱",
    imageUrl:
      "https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple sitting closely together on a modern gray sofa, one partner holding a smartphone showing the screen to the other with a look of pure joy and excitement, the other partner reacting with wide amazed smile and happy tears, both in comfortable casual home attire, cozy modern living room with soft lamps and plants",
      "soft warm evening domestic lighting, intimate cozy atmosphere, emotional connection moment"
    ),
    storyTemplate: createStoryTemplate(
      "see a glimpse of their future together",
      "One look at the screen, and the world stands still. Seeing their future self together makes every moment of the present feel infinitely more precious.",
    ),
  },
  {
    id: ScenarioId.SOULMATE_CONNECTION,
    title: "Soulmate Connection",
    description: "A gaze that says everything",
    icon: "👁️",
    imageUrl:
      "https://images.unsplash.com/photo-1516589091380-5d8e87df6999?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple in a close intimate embrace, foreheads gently touching, eyes locked gazing at each other with deep soulful expressions of pure unconditional love, man in dark henley shirt, woman in soft cream sweater, minimalist neutral soft background",
      "soft cinematic lighting with warm tones, intimate shallow depth of field, raw emotional connection atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "connect on a soul-deep level",
      "Words aren't needed when two souls recognize each other. In this silent moment, they promise a lifetime of understanding.",
    ),
  },
  {
    id: ScenarioId.FUTURE_VISIONS,
    title: "Future Visions",
    description: "Dreaming together",
    icon: "🌠",
    imageUrl:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple standing together on a high modern penthouse balcony overlooking a vast sunset horizon, man pointing towards the distance, both facing camera with hopeful visionary smiles, man in casual blazer, woman in flowing dress, city skyline and mountains visible in distance",
      "golden hour sunset lighting, warm orange and pink sky tones, epic inspiring atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "dream of the thousand paths ahead",
      "Hand in hand, they look towards the horizon. Whatever the future holds, they know they'll face it together with courage and love.",
    ),
  },
  {
    id: ScenarioId.DEEP_CONVERSATION,
    title: "Meaningful Talk",
    description: "Connecting through words",
    icon: "💬",
    imageUrl:
      "https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple sitting across from each other at a small rustic wooden cafe table, leaning in engaged in an intense but loving conversation, looking at each other with deep interest and empathy, coffee cups on table, cozy cafe interior with exposed brick and warm decor",
      "warm cafe ambient lighting, soft natural window light, intimate conversational atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "share their deepest thoughts",
      "Every word builds a bridge, every secret shared strengthens the foundation of their life together.",
    ),
  },
  {
    id: ScenarioId.SUPPORTIVE_EMBRACE,
    title: "Unwavering Support",
    description: "Your safe harbor",
    icon: "⚓",
    imageUrl:
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple in a supportive embrace in a peaceful garden, one partner resting their head on the other's shoulder with a look of relief and peace, the other partner facing camera with a protective loving smile, surrounded by green hedges and flowering roses, casual comfortable clothing",
      "soft natural outdoor lighting, gentle dappled sunlight, peaceful comforting atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "find strength in each other",
      "In a world that can be loud and chaotic, they are each other's peace. A safe harbor for every storm.",
    ),
  },
  {
    id: ScenarioId.UNSPOKEN_BOND,
    title: "The Unspoken Bond",
    description: "Harmony in silence",
    icon: "🤝",
    imageUrl:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple sitting side by side on a wooden bench watching a spectacular sunset, holding hands firmly without speaking, both facing camera with content tranquil smiles, golden sunset light reflecting in their eyes, peaceful rolling hills and wildflower meadow in background",
      "warm golden sunset lighting, natural outdoor atmosphere, serene peaceful romantic mood"
    ),
    storyTemplate: createStoryTemplate(
      "share a moment of perfect harmony",
      "They don't need much to be happy - just a quiet moment and the knowledge that they are exactly where they are supposed to be.",
    ),
  },
  {
    id: ScenarioId.GROWING_OLD_TOGETHER_DEPTH,
    title: "Eternal Growth",
    description: "Love that deepens with time",
    icon: "🌳",
    imageUrl:
      "https://images.unsplash.com/photo-1447005497901-b3e9ee359928?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a loving elderly couple in their 70s with gray hair but the same spark in their eyes, sitting together looking at an old leather photo album of their younger selves, both facing camera with wise deeply happy smiles showing laugh lines, warm cozy living room with family photos and mementos on shelves",
      "warm sun-drenched living room lighting, nostalgic golden afternoon light, celebrating a lifetime of love"
    ),
    storyTemplate: createStoryTemplate(
      "honor the journey of a lifetime",
      "Like wine or a great forest, their love has only grown richer, deeper, and more beautiful with every passing year.",
    ),
  },
];
