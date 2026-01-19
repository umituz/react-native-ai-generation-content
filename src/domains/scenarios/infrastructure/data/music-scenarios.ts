import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const MUSIC_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.CONCERT_STAGE,
    title: "Concert Finale",
    description: "The roar of the crowd",
    icon: "🎸",
    imageUrl:
      "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple as rockstars on massive concert stage finale, both facing camera with ecstatic triumphant smiles and sweaty glistening skin, man in leather jacket with electric guitar raised, woman with microphone in sparkly stage outfit with windswept hair, thousands of phone lights and crowd silhouettes in background, golden confetti falling, dramatic stage spotlights and smoke",
      "dramatic concert lighting with colorful spotlights and atmospheric haze"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple in professional recording studio, both facing camera with creative focused expressions, wearing matching Sony studio headphones, leaning into vintage Neumann microphone together, man in casual black tee woman in oversized flannel, mixing console with illuminated faders and acoustic foam panels in background",
      "warm amber studio lighting with soft glow from equipment LEDs"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple on cozy bunk in luxury tour bus at night, both facing camera with relaxed tired happy smiles, man in worn band hoodie with acoustic guitar, woman curled up with notebook and coffee mug in oversized sweater, city lights blurring past through tinted bus window, fairy lights strung along ceiling",
      "warm intimate interior lighting with passing city lights through window"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple browsing dusty vintage vinyl record shop, both facing camera with cool knowing smiles, holding classic album cover together, man in corduroy jacket and round glasses woman in vintage band tee and high-waisted jeans, endless rows of vinyl records in wooden crates and vintage concert posters on walls in background",
      "warm golden vintage tungsten lighting with dust particles floating"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple performing in intimate smoky jazz club, man playing golden saxophone with closed eyes, woman in elegant black cocktail dress leaning on grand piano facing camera with soulful expression, dim blue and amber spotlight creating dramatic shadows, exposed brick walls and small candlelit tables in background",
      "moody blue and amber spotlight with atmospheric smoke haze"
    ),
    storyTemplate: createStoryTemplate(
      "get lost in the rhythm of the night",
      "Soulful, smooth, and perfectly improvised. Their love is like a jazz standard - timeless and always full of beautiful surprises.",
    ),
  },
];
