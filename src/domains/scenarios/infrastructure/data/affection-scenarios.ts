import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const AFFECTION_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.BACK_HUG_SURPRISE,
    title: "Back-Hug Surprise",
    description: "Unexpected warmth",
    icon: "🤗",
    imageUrl:
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a loving couple in a bright modern Scandinavian living room, man surprising woman with a warm embrace from behind with his arms wrapped around her waist, both facing camera with genuine joyful smiles, woman in casual cream sweater, man in gray henley, minimalist furniture and large windows with sheer curtains",
      "soft natural morning light streaming through windows, bright airy atmosphere, warm domestic feeling"
    ),
    storyTemplate: createStoryTemplate(
      "feel the warmth of an unexpected embrace",
      "Sometimes the best words are spoken through a silent hug from behind. A moment where the world disappears, leaving only the beat of two hearts in sync.",
    ),
  },
  {
    id: ScenarioId.REUNION_EMBRACE,
    title: "The Big Reunion",
    description: "Never letting go",
    icon: "🤝",
    imageUrl:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "an emotional couple reuniting in a busy modern airport terminal, dropped luggage bags beside them, man lifting woman slightly off the ground in tight embrace, both with teary joyful expressions looking at each other, other travelers blurred in background, departure boards and large windows visible",
      "bright airport lighting with natural daylight from windows, emotional cinematic atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "reunite after a long time apart",
      "The distance was long, but it only made this moment of reunion sweeter. In this hug, every mile they spent apart is finally forgotten.",
    ),
  },
  {
    id: ScenarioId.COZY_BLANKET_HUG,
    title: "Blanket Sanctuary",
    description: "Warmth on a cold night",
    icon: "🛋️",
    imageUrl:
      "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a cozy couple wrapped together in a large chunky knit wool blanket in cream color, sitting on a wooden cabin porch at night, hugging closely with only their happy faces visible peeking out, both facing camera with warm content smiles, string of warm fairy lights wrapped around porch railing, starry night sky visible",
      "soft warm fairy light glow, cool night air contrast with cozy warmth, intimate winter atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "share a cozy sanctuary under the stars",
      "Winter air may be cold, but inside their shared blanket, it's the warmest place on earth. A fortress of comfort built for two.",
    ),
  },
  {
    id: ScenarioId.BEAR_HUG_LIFT,
    title: "The Bear Hug",
    description: "Lifting your spirits",
    icon: "🐻",
    imageUrl:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a joyful man giving woman a big bear hug and lifting her high in the air, woman's legs wrapped around his waist, both laughing with pure joy and facing camera with genuine wide smiles, sunny green meadow with wildflowers, blue sky with fluffy white clouds, casual summer clothing",
      "bright natural sunlight, cheerful outdoor atmosphere, energetic and vibrant mood"
    ),
    storyTemplate: createStoryTemplate(
      "get swept off your feet by love",
      "There's no better feeling than being lifted up by the person who knows you best. A hug that feels like victory, laughter, and home all at once.",
    ),
  },
  {
    id: ScenarioId.RAINY_STREET_EMBRACE,
    title: "Rainy Street Hug",
    description: "Love in the downpour",
    icon: "☔",
    imageUrl:
      "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a romantic couple standing in a heavy rainstorm on a city street at night, man in dark coat wrapping it protectively around woman while embracing her closely, both facing camera with serene loving smiles, rain visibly falling, colorful neon shop signs reflecting in wet pavement puddles, rain droplets caught in light",
      "dramatic cinematic night lighting, neon reflections in rain puddles, moody protective romantic atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "find shelter in each other's arms",
      "When the rain falls, they don't look for a roof. They look for each other. A protective embrace that says 'I've got you, always'.",
    ),
  },
  {
    id: ScenarioId.KITCHEN_WARMTH_HUG,
    title: "Kitchen Warmth",
    description: "Morning affection",
    icon: "🍳",
    imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a loving couple in a sun-filled modern kitchen with white cabinets and marble countertops, man hugging woman from the side while she holds a coffee mug, both leaning heads together and facing camera with peaceful morning smiles, wearing soft cotton loungewear in neutral tones, fresh fruit and plants visible on counter",
      "warm golden morning sunlight streaming through kitchen window, bright domestic atmosphere, cozy morning ambiance"
    ),
    storyTemplate: createStoryTemplate(
      "start the day with a simple gesture of love",
      "Before the coffee is ready, before the day begins, there's always time for a hug. The best fuel for any day is the warmth they share.",
    ),
  },
];
