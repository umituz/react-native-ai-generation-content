import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const VINTAGE_SUMMER_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.ICE_CREAM_DATE,
    title: "Ice Cream Date",
    description: "50s soda shop vibes",
    icon: "🍦",
    imageUrl:
      "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple in colorful 1950s soda shop sitting at chrome counter, sharing large milkshake with two striped straws, both facing camera with joyful youthful smiles, woman in pastel pink polka dot dress with hair ribbon, man in light blue polo shirt, checkered black and white floor and glowing neon signs in background",
      "bright cheerful vintage indoor lighting with nostalgic 50s atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "step back into a simpler time of sweet treats and first dates",
      "One milkshake, two straws, and a lifetime of sweetness ahead. They've found the perfect recipe for a timeless love.",
    ),
  },
  {
    id: ScenarioId.VINTAGE_CONVERTIBLE,
    title: "Vintage Convertible",
    description: "Wind in your hair",
    icon: "🚗",
    imageUrl:
      "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple driving cherry red 1950s vintage convertible along scenic coastal road, woman wearing silk headscarf and cat-eye sunglasses, man in casual summer shirt with windswept hair, both facing camera with ecstatic carefree smiles, wicker picnic basket in back seat, blue ocean and cliffs in background",
      "bright sunny coastal lighting with cinematic carefree atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "drive towards the horizon in classic style",
      "The road is open, the sun is shining, and they have each other. A journey that proves the best destination is wherever they're together.",
    ),
  },
  {
    id: ScenarioId.RETRO_BEACH_DAY,
    title: "Retro Beach Day",
    description: "Classic seaside fun",
    icon: "🏖️",
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple on sunny 1950s beach sitting under large red-and-white striped umbrella, both facing camera with pure happy smiles, man in vintage high-waisted swim trunks, woman in retro one-piece swimsuit with headband, holding vintage glass soda bottles, blue ocean waves and soft golden sand in background",
      "warm golden summer sunlight with nostalgic beach atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "relive the golden age of summer holidays",
      "Salty skin, sandy toes, and a love as warm as the summer sun. They've captured the essence of a perfect, timeless afternoon.",
    ),
  },
  {
    id: ScenarioId.DRIVE_IN_CINEMA,
    title: "Drive-In cinema",
    description: "Movie under the stars",
    icon: "🍿",
    imageUrl:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple in vintage turquoise car at drive-in theater at night, sharing large bucket of buttery popcorn, both facing camera with romantic smiles from front seat, large glowing movie screen visible through windshield, starry sky and rows of other vintage cars with speaker posts in background",
      "warm romantic dashboard glow with cozy nostalgic night atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "share a movie and a moment under the midnight sky",
      "The real stars aren't on the silver screen or in the sky; they're right here in the front seat. A night of old-school romance.",
    ),
  },
];
