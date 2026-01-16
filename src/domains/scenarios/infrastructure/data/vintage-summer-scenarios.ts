import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const VINTAGE_SUMMER_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.ICE_CREAM_DATE,
    title: "Ice Cream Date",
    description: "50s soda shop vibes",
    icon: "🍦",
    imageUrl:
      "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=800",
    aiPrompt:
      "A couple in a colorful 1950s soda shop, sitting at the counter, sharing a large milkshake with two straws, both looking at the camera with joyful youthful smiles, wearing pastel colored vintage clothing, polka dot dress for woman, polo shirt for man, checkered floor and neon lights, bright and nostalgic",
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
    aiPrompt:
      "A couple driving a red 1950s vintage convertible along a coastal road, woman wearing a silk headscarf and sunglasses, man in a casual summer shirt, both looking at the camera with ecstatic smiles, a picnic basket in the back seat, bright sunny day, blue ocean in background, carefree and cinematic",
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
    aiPrompt:
      "A couple on a sunny beach in the 1950s, sitting under a large red-and-white striped umbrella, wearing retro high-waisted swimwear, both looking at the camera with pure happy smiles, holding vintage soda bottles, blue ocean and soft golden sand, nostalgic summer bliss",
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
    aiPrompt:
      "A couple in a vintage car at a drive-in theater at night, sharing a large bucket of popcorn, both looking at the camera with romantic smiles, large movie screen in the background, starry sky and other vintage cars, warm dashboard glow, cozy and nostalgic",
    storyTemplate: createStoryTemplate(
      "share a movie and a moment under the midnight sky",
      "The real stars aren't on the silver screen or in the sky; they're right here in the front seat. A night of old-school romance.",
    ),
  },
];
