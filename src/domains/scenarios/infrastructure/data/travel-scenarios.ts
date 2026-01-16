/**
 * Travel Scenarios
 * Scenarios focused on romantic destinations around the world
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const TRAVEL_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.PARIS,
    title: "Paris In Love",
    description: "Romance in the City of Lights",
    icon: "🗼",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBPW-W_p8omCIO4jC9E88ZkWI4G7x4A9WaUNs7z6uX9E-cnEY4EmE5wdSGid6lnX_4SYuyZpEgLcnQrlNsvD34qCuvSMh2CG5e7d4gQRjZP3gEd6VCfQ0H-hUHk0oUZtr6Ts21UvnPaBDvue0-UHwHHN9nZ2pG2g6tBTYdOVdfe7e63p_O6__bw5WuZcaWS_a7IJSF4aGmu3jkyiPuIXGLEFZEvHSkm-nw0vfI_DH0lLAB-CfgFa14PDXIZecY7oVL3yQ0WJev6ZsJ_",
    previewImageUrl:
      "https://v3b.fal.media/files/b/0a89920b/EquFYP5myLnqw0C-SZDOO.jpg",
    aiPrompt:
      "A romantic couple standing close together near the Eiffel Tower during golden hour, both looking directly at the camera with warm smiles, dressed in elegant Parisian fashion (stylish trench coats, scarves), soft lighting, Eiffel Tower and charming street cafe in background, romantic and dreamy",
    storyTemplate: createStoryTemplate(
      "fall in love all over again in Paris",
      "Beneath the Eiffel Tower's glow, they rediscover the magic that brought them together. Every cobblestone street tells their story.",
    ),
  },
  {
    id: ScenarioId.TOKYO,
    title: "Tokyo Dreams",
    description: "Neon nights and ancient temples",
    icon: "🏮",
    imageUrl:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop&q=60",
    previewImageUrl:
      "https://v3b.fal.media/files/b/0a89b9b9/beZVuzZA1Xz32p6yr-jRZ.jpg",
    aiPrompt:
      "A cool couple standing in a vibrant neon-lit street in Tokyo at night, both looking at the camera with confident expressions, dressed in modern Japanese street fashion, illuminated by colorful neon lights, modern neon signs and bustling crowds in background, electric and vibrant",
    storyTemplate: createStoryTemplate(
      "explore the electric energy of Tokyo",
      "From ancient temples to neon-lit streets, they discover a city as dynamic and multifaceted as their love.",
    ),
  },
  {
    id: ScenarioId.SANTORINI,
    title: "Santorini Bliss",
    description: "Breathtaking Greek island paradise",
    icon: "🏛️",
    imageUrl:
      "https://v3b.fal.media/files/b/0a8a5217/d3uJplQNHwn4y7OhQlLx4.jpg",
    previewImageUrl:
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&auto=format&fit=crop&q=60",
    aiPrompt:
      "A relaxed couple standing on a terrace in Santorini, both looking at the camera with happy smiles, dressed in elegant white and blue summer clothing (linen shirts, sundress), white-washed buildings with blue domes and Mediterranean sunset in background, serene and beautiful",
    storyTemplate: createStoryTemplate(
      "watch the sunset over the Aegean Sea",
      "In this island paradise, time stands still. Every moment together feels like a scene from a dream.",
    ),
  },
  {
    id: ScenarioId.SAFARI,
    title: "Safari Adventure",
    description: "Wild African romance and thrills",
    icon: "🦁",
    imageUrl:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&auto=format&fit=crop&q=60",
    previewImageUrl:
      "https://v3b.fal.media/files/b/0a89b997/l51_GnDeNjJB7qE2LEEqq.jpg",
    aiPrompt:
      "An adventurous couple standing in an open-top safari jeep on an African savanna, both looking at the camera with excited expressions, dressed in matching khaki safari outfits and hats, golden savanna landscape with acacia trees at sunset in background, wild and adventurous",
    storyTemplate: createStoryTemplate(
      "embark on the adventure of a lifetime",
      "Under the vast African sky, surrounded by untamed beauty, they discover that the greatest adventure is the journey they share.",
    ),
  },
  {
    id: ScenarioId.BALI,
    title: "Bali Paradise",
    description: "Tropical luxury and serenity",
    icon: "🌴",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCiohoJfw_zeIAOSrt_IwYiMl4AvBB_-mcZ9ykbSBWT0T_-VMpofL4jyfGbGyHJG57BEJujKulGllz_DhqNZxz6vlMua2MOg5v4DDOS5pNvxWNeRtcSNlJ4HQsAB1fOphCQoXPvG-GWg85JWWfaoQGMcgEkzwSiNkaJoI8ILEDgZyolD-s0qZ7Lm4aes4aCBVrjHrNkscY8fRSamyuVWGezh7gsgMEZzUdQ4RrbWjL-FXADG2y19_C12AH03u94cJWZQJwlkMUqCuxD",
    previewImageUrl:
      "https://v3b.fal.media/files/b/0a89a049/LBAwDT7B1IahzFw6Cfx2K.jpg",
    aiPrompt:
      "A happy couple standing side-by-side near an infinity pool in a luxury Bali villa, both looking directly at the camera with natural smiles, man wearing casual linen resort wear, woman wearing elegant tropical dress, lush tropical jungle and sunset over pool in background, soft golden lighting",
    storyTemplate: createStoryTemplate(
      "escape to a tropical paradise in Bali",
      "Surrounded by lush jungle and tranquil waters, they find true serenity in each other's arms.",
    ),
  },
  {
    id: ScenarioId.NEW_YORK,
    title: "New York Lights",
    description: "City that never sleeps",
    icon: "🗽",
    imageUrl:
      "https://media.istockphoto.com/id/1471601560/photo/couple-taking-selfie-at-time-square.webp?a=1&b=1&s=612x612&w=0&k=20&c=ev2blexKgqknAKig0-ZlsbYIGtWxNIIzQH0p4kEoeqE=",
    aiPrompt:
      "A happy couple taking a selfie in Times Square New York, both looking at the camera with joyful smiles, dressed in cozy winter fashion (stylish coats, beanies), vibrant neon billboards and bustling city energy in background, selfie angle, energetic and iconic",
    storyTemplate: createStoryTemplate(
      "conquer the concrete jungle",
      "Amidst the dazzling lights of Times Square, they find that the brightest light is the one they share.",
    ),
  },
  {
    id: ScenarioId.VENICE,
    title: "Venice Romance",
    description: "Gondola rides & canals",
    icon: "🚣",
    imageUrl:
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&auto=format&fit=crop&q=60",
    aiPrompt:
      "A romantic couple sitting together in a Venetian gondola, both looking at the camera with soft smiles, dressed in elegant smart-casual European fashion, historic canals and architecture at sunset in background, timeless and romantic",
    storyTemplate: createStoryTemplate(
      "glide through the canals of love",
      "Drifting through centuries of history, their love story becomes part of Venice's eternal romance.",
    ),
  },
  {
    id: ScenarioId.AURORA,
    title: "Northern Lights",
    description: "Aurora Borealis magic",
    icon: "🌌",
    imageUrl:
      "https://media.istockphoto.com/id/536314367/photo/strolling-norway.webp?a=1&b=1&s=612x612&w=0&k=20&c=rtur0SHLxDZB8fDb9bFM_nhY8_L3iNQxqueb7oAEokI=",
    aiPrompt:
      "A happy couple standing under the Northern Lights in snowy Norway, both looking at the camera with amazed smiles, dressed in warm colorful winter ski jackets and fur hats, rosy cheeks from cold, dreamy snowy landscape with vibrant purple and green aurora borealis in night sky, magical and breathtaking",
    storyTemplate: createStoryTemplate(
      "witness the magic of the aurora",
      "Under the dancing lights of the north, they realize their love is as rare and beautiful as the aurora itself.",
    ),
  },
];
