import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const MUSIC_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.CONCERT_STAGE,
    title: "Concert Finale",
    description: "The roar of the crowd",
    icon: "🎸",
    imageUrl:
      "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=800",
    aiPrompt:
      "A couple standing on a massive concert stage, man with a guitar, woman with a microphone, both looking at the camera with ecstatic smiles and sweaty hair, thousands of crowd lights in the blurred background, confetti falling, stage lights and smoke, rockstar power couple",
    storyTemplate: createStoryTemplate(
      "perform before a sea of lights",
      "The music of the crowd is loud, but the melody of their hearts is louder. A standing ovation for the love of a lifetime.",
    ),
  },
  {
    id: ScenarioId.RECORDING_STUDIO,
    title: "The Studio Session",
    description: "Perfect harmony",
    icon: "🎙️",
    imageUrl:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800",
    aiPrompt:
      "A couple in a high-end recording studio, both looking at the camera with creative focus, wearing large studio headphones, leaning into the same microphone, soundboards and acoustic foam in background, warm creative atmosphere, intimate and professional",
    storyTemplate: createStoryTemplate(
      "record the hit song of their lives",
      "Every note they record is a testament to the harmony they've found together. The world will soon hear the sound of their love.",
    ),
  },
  {
    id: ScenarioId.TOUR_BUS_LIFE,
    title: "Tour Bus Vibes",
    description: "Life on the road",
    icon: "🚌",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    aiPrompt:
      "A couple sitting on a cozy bunk in a luxury tour bus, both looking at the camera with relaxed tired smiles, surrounded by guitars and notebooks, city lights passing by through the bus window, intimate and adventurous",
    storyTemplate: createStoryTemplate(
      "experience the freedom of the open road",
      "From city to city, stage to stage, the only home they need is wherever they are together. A life of music and miles.",
    ),
  },
  {
    id: ScenarioId.VINYL_SHOP_DATE,
    title: "Vinyl Treasure",
    description: "Old-school cool",
    icon: "📻",
    imageUrl:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    aiPrompt:
      "A couple in a dusty nostalgic vinyl record shop, both looking at the camera with cool smiles, holding an old record album, rows of vinyl records in background, warm vintage lighting, wearing indie fashion, hip and timeless",
    storyTemplate: createStoryTemplate(
      "find the soundtrack of their relationship",
      "In a world of digital noise, they've found the authentic crackle and pop of a love that's meant to be played on repeat.",
    ),
  },
  {
    id: ScenarioId.JAZZ_CLUB_DUO,
    title: "Midnight Jazz",
    description: "Soulful rhythm",
    icon: "🎷",
    imageUrl:
      "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800",
    aiPrompt:
      "A couple in a smoky dark jazz club, man playing a saxophone, woman leaning against a piano looking at camera with a soulful expression, wearing elegant evening attire, blue and amber spotlight lighting, intimate and moody",
    storyTemplate: createStoryTemplate(
      "get lost in the rhythm of the night",
      "Soulful, smooth, and perfectly improvised. Their love is like a jazz standard - timeless and always full of beautiful surprises.",
    ),
  },
];
