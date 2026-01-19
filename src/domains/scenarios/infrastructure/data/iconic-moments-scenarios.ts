import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const ICONIC_MOMENTS_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.KLIMT_THE_KISS,
    title: "The Kiss (Klimt)",
    description: "Golden age of art",
    icon: "🎨",
    imageUrl:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple recreating Gustav Klimt's The Kiss, man leaning to kiss woman on cheek while both wrapped in ornate golden cloak with geometric Art Nouveau patterns and flowers, woman with flowers in hair and eyes closed in bliss, shimmering gold leaf texture background with meadow of wildflowers at their feet",
      "warm golden lighting with rich metallic gold tones and artistic glow"
    ),
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
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple recreating iconic V-J Day Times Square kiss, man in crisp navy sailor uniform with white cap dipping woman backwards for passionate kiss, woman in white nurse uniform and cap with arm around his neck, 1945 Times Square with celebrating crowds waving American flags and vintage cars in background, high-contrast black and white photography style",
      "high-contrast black and white with dramatic shadows"
    ),
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
      "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple recreating American Gothic painting, standing side-by-side with serious stoic expressions facing camera, man in round glasses holding three-pronged pitchfork wearing dark jacket over collarless shirt, woman in patterned apron over black dress with white collar and cameo brooch, simple white wooden farmhouse with distinctive pointed gothic window in background",
      "flat even lighting with muted earth tones and painting-like quality"
    ),
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
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple walking across famous Abbey Road zebra crossing in London, both facing camera with cool relaxed expressions mid-stride, man in period-accurate 1960s suit and barefoot, woman in mod minidress and boots, white Volkswagen Beetle and leafy trees lining street in background, vintage warm film photography aesthetic",
      "warm vintage film look with soft grain and muted 60s color palette"
    ),
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
      "https://images.unsplash.com/photo-1482424917728-d82d29662023?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple in bed-in for peace protest, sitting up in large white bed surrounded by flowers and hand-drawn Peace signs, both facing camera with gentle peaceful smiles, wearing simple white cotton pyjamas, holding up peace signs, bright sunlight streaming through large hotel windows, 1970s documentary photography aesthetic with warm film grain",
      "bright natural window light with warm 70s film aesthetic"
    ),
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
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple sitting together on steel beam high above 1930s New York City skyline, both facing camera with relaxed daring smiles, legs dangling casually over the edge, man in worker's cap and suspenders with lunch pail, woman in period dress with headscarf, misty cityscape with art deco skyscrapers and Empire State Building visible below, sepia-toned vintage photography",
      "hazy atmospheric lighting with sepia vintage tone"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple recreating Rene Magritte's The Lovers painting, facing each other with faces completely covered by draped white cloth veils about to kiss, both wearing formal dark attire man in black suit woman in elegant black dress, plain deep crimson red wall background, surrealist art aesthetic with crisp edges",
      "flat even lighting with rich saturated red background and surreal clarity"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple recreating Michelangelo's Creation of Adam, reaching out index fingers toward each other with small gap between them, floating in ethereal space with soft flowing fabric, both gazing at each other with divine awe, swirling blue and cream marble cloud textures surrounding them, glowing spark of light between their nearly touching fingertips",
      "dramatic cinematic lighting with ethereal glow and celestial atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "ignite a spark that lasts forever",
      "In that tiny space between their hands, a universe of possibility was born. A connection that feels truly divine.",
    ),
  },
];
