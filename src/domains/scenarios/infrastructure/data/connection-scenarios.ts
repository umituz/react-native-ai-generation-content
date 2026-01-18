import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const CONNECTION_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.SURPRISE_REVEAL,
    title: "The Future Revelation",
    description: "Seeing your future for the first time",
    icon: "📱",
    imageUrl:
      "https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=800",
    aiPrompt:
      "A couple sitting closely on a sofa, one holding a smartphone and showing the screen to the other with a look of pure joy and excitement, the partner reacting with a wide amazed smile and teary eyes, a moment of deep connection and wonder, soft domestic evening lighting, blurred living room background",
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
    aiPrompt:
      "A couple in a close intimate embrace, foreheads touching, eyes locked with deep soulful expressions, looking at each other with pure unconditional love, soft cinematic lighting, minimalist neutral background to focus on facial expressions, raw emotional connection",
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
    aiPrompt:
      "A couple standing on a high balcony overlooking a vast sunset horizon, pointing towards the distance, both looking at the camera with hopeful visionary smiles, imagining their shared future, golden hour lighting, epic and inspiring",
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
    aiPrompt:
      "A couple sitting across from each other at a small rustic cafe table, leaning in, engaged in an intense but loving conversation, looking at each other with deep interest and empathy, warm cafe atmosphere, cinematic focus on facial expressions",
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
    aiPrompt:
      "A couple in a supportive embrace, one partner resting their head on the other's shoulder with a look of relief and peace, the other partner looking at the camera with a protective and loving smile, standing in a peaceful quiet garden, soft natural lighting",
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
    aiPrompt:
      "A couple sitting side by side watching a sunset, not speaking but holding hands firmly, both looking at the camera with content tranquil smiles, the light reflecting in their eyes, peaceful natural landscape background, serene and profound",
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
    aiPrompt:
      "A couple in their older years but with the same spark in their eyes, looking at a photo album of their younger selves, looking at the camera with wise and deeply happy smiles, warm sun-drenched living room with mementos, celebrating a lifetime of growth",
    storyTemplate: createStoryTemplate(
      "honor the journey of a lifetime",
      "Like wine or a great forest, their love has only grown richer, deeper, and more beautiful with every passing year.",
    ),
  },
];
