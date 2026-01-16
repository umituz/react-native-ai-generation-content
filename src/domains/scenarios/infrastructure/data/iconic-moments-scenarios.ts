import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const ICONIC_MOMENTS_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.KLIMT_THE_KISS,
    title: "The Kiss (Klimt)",
    description: "Golden age of art",
    icon: "🎨",
    imageUrl:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800",
    aiPrompt:
      "A couple recreating Gustav Klimt's 'The Kiss', man leaning over to kiss woman on the cheek, both wrapped in a massive ornate golden cloak with geometric patterns and flowers, background is a shimmering gold leaf texture, artistic and opulent, masterpiece aesthetic",
    storyTemplate: createStoryTemplate(
      "become a living work of art",
      "Wrapped in gold and flowers, their love is more than a moment - it's a masterpiece that will never fade.",
    ),
  },
  {
    id: ScenarioId.TIMES_SQUARE_KISS,
    title: "V-J Day Kiss",
    description: "Celebration of victory",
    icon: "⚓",
    imageUrl:
      "https://images.unsplash.com/photo-1533230408708-8f9f91d12344?w=800",
    aiPrompt:
      "A couple recreating the iconic V-J Day in Times Square photo, man in a black sailor uniform dipping a woman in a white nurse outfit for a passionate kiss, historic Times Square in 1945 with crowds and flags in background, high-contrast black and white photography style, legendary and historic",
    storyTemplate: createStoryTemplate(
      "relive a legendary moment of history",
      "In the midst of a world at peace, they found their own celebration. A kiss that stopped time and defined a generation.",
    ),
  },
  {
    id: ScenarioId.AMERICAN_GOTHIC_POSE,
    title: "American Gothic",
    description: "Classic duo pose",
    icon: "👩‍🌾",
    imageUrl:
      "https://images.unsplash.com/photo-1495143134241-66df1796c671?w=800",
    aiPrompt:
      "A couple recreating the 'American Gothic' painting, standing side-by-side with serious expressions, man holding a pitchfork, woman wearing a patterned apron and white collar, background is a simple wooden house with a gothic window, painting-like texture, classic and iconic",
    storyTemplate: createStoryTemplate(
      "step into a classic American portrait",
      "Sturdy, steadfast, and together. A testament to the enduring strength of a bond built on shared values and hard work.",
    ),
  },
  {
    id: ScenarioId.ABBEY_ROAD_WALK,
    title: "The Abbey Road Walk",
    description: "The Fab Four style",
    icon: "🚶",
    imageUrl:
      "https://images.unsplash.com/photo-1526313043232-0691e8461877?w=800",
    aiPrompt:
      "A couple walking across a zebra crossing in London, in the style of the Beatles Abbey Road album cover, both looking at camera with cool expressions, wearing 60s London fashion, white Volkswagen Beetle and street in background, vintage film look, musical and iconic",
    storyTemplate: createStoryTemplate(
      "walk the most famous crosswalk in the world",
      "Every step they take is in harmony. A rhythm of love that echoes like a classic hit that never goes out of style.",
    ),
  },
  {
    id: ScenarioId.LENNON_YOKO_POSE,
    title: "The Bed-In",
    description: "Give peace a chance",
    icon: "✌️",
    imageUrl:
      "https://images.unsplash.com/photo-1531746790731-6c087fecd05a?w=800",
    aiPrompt:
      "A couple in a bed-in for peace, sitting in bed surrounded by flowers and 'Peace' signs, wearing simple white pyjamas, looking at camera with gentle peaceful smiles, sunlight through large windows, 70s grain photography vibe, intimate and world-changing",
    storyTemplate: createStoryTemplate(
      "stand for something greater than themselves",
      "They believe in a world of peace, starting with the sanctuary they've created together.",
    ),
  },
  {
    id: ScenarioId.SKY_LUNCH_POSE,
    title: "Lunch atop a Skyscraper",
    description: "High-flying duo",
    icon: "🏗️",
    imageUrl:
      "https://images.unsplash.com/photo-1449156003946-3197ae0107cb?w=800",
    aiPrompt:
      "A couple sitting together on a steel beam high above a city skyline, recreating the iconic 1932 photo, both looking at camera with relaxed daring smiles, legs dangling over the edge, misty city and skyscrapers in background, sepia-toned vintage photography, adventurous and brave",
    storyTemplate: createStoryTemplate(
      "conquer the heights of the world",
      "Fearless and free. At the very top of the world, they find that the only safety they need is in each other's company.",
    ),
  },
  {
    id: ScenarioId.MAGRITTE_LOVERS,
    title: "The Lovers (Magritte)",
    description: "Surreal connection",
    icon: "🌫️",
    imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800",
    aiPrompt:
      "A couple in the style of René Magritte's 'The Lovers', both looking at each other while their faces are covered by white cloths, wearing classic dark suits and dresses, red wall in background, surreal and mysterious artistic aesthetic",
    storyTemplate: createStoryTemplate(
      "experience the mystery of deep connection",
      "To truly see someone, you must look with the heart. A love that knows no barriers, not even those that hide the face.",
    ),
  },
  {
    id: ScenarioId.CREATION_TOUCH,
    title: "Creation of Adam",
    description: "The divine spark",
    icon: "☝️",
    imageUrl: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800",
    aiPrompt:
      "A couple reaching out to touch each other's index fingers, recreating Michelangelo's 'The Creation of Adam', floating in a sea of blue and white marble textures, looking at each other with divine awe, cinematic lighting with a glowing spark between fingers, majestic and celestial",
    storyTemplate: createStoryTemplate(
      "ignite a spark that lasts forever",
      "In that tiny space between their hands, a universe of possibility was born. A connection that feels truly divine.",
    ),
  },
];
