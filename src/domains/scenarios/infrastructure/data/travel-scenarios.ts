/**
 * Travel Scenarios
 * Scenarios focused on romantic destinations around the world
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

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
    aiPrompt: createPhotorealisticPrompt(
      "a romantic couple standing close together near the iconic Eiffel Tower in Paris during golden hour, both facing camera with warm genuine smiles, man in stylish beige trench coat with dark scarf, woman in elegant camel coat with silk scarf and beret, holding hands, Eiffel Tower fully visible in background, charming Parisian street cafe with bistro chairs nearby",
      "warm golden hour Parisian lighting, soft romantic atmosphere, dreamy city of lights ambiance"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a stylish couple standing in vibrant neon-lit Shibuya street in Tokyo at night, both facing camera with confident cool expressions, dressed in modern Japanese street fashion with layered outfits, illuminated by colorful pink blue and purple neon lights, busy crosswalk and glowing Japanese neon signs in background",
      "vibrant colorful neon lighting, electric nightlife atmosphere, dynamic urban Tokyo energy"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a relaxed elegant couple standing on a terrace in Santorini Greece, both facing camera with happy content smiles, man in white linen shirt and navy pants, woman in flowing blue sundress with gold jewelry, iconic white-washed buildings with famous blue domes visible, spectacular Mediterranean sunset with orange and pink hues over the caldera sea",
      "warm golden sunset Mediterranean lighting, serene Greek island atmosphere, breathtaking romantic ambiance"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "an adventurous couple standing in an open-top safari Land Rover on the African savanna, both facing camera with excited thrilled expressions, dressed in matching khaki safari outfits with wide-brim hats and binoculars, dusty golden savanna landscape stretching to horizon, iconic acacia trees silhouetted against dramatic orange sunset sky",
      "warm golden African sunset lighting, dusty savanna atmosphere, wild adventurous safari ambiance"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a happy couple standing together near a stunning infinity pool at a luxury Bali villa, both facing camera with relaxed natural smiles, man in casual white linen resort shirt and shorts, woman in elegant floral tropical maxi dress, lush green tropical jungle cascading down hillside, spectacular sunset reflecting in infinity pool",
      "soft golden tropical sunset lighting, luxury resort ambiance, serene paradise atmosphere"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a happy couple taking a selfie together in Times Square New York City, both facing camera with joyful excited smiles, dressed in stylish winter fashion with warm coats beanies and scarves, massive bright LED billboards and neon advertisements glowing behind them, bustling crowd and yellow taxis visible, selfie angle perspective",
      "vibrant neon billboard lighting, energetic NYC atmosphere, iconic bustling city ambiance"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a romantic couple sitting closely together in a traditional Venetian gondola with ornate decoration, both facing camera with soft loving smiles, man in smart navy blazer, woman in elegant red dress, gondolier in striped shirt visible behind them, historic Venetian buildings with ornate balconies lining the canal, golden sunset light reflecting on water",
      "warm golden sunset light on water, romantic Venice atmosphere, timeless European elegance"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a happy couple standing under the spectacular Northern Lights in snowy Norwegian landscape, both facing camera with amazed awestruck smiles showing rosy cheeks from cold, dressed in warm colorful winter ski jackets in red and blue with fur-lined hoods, pristine white snow covering ground, vibrant green and purple aurora borealis dancing across dark night sky, snow-covered pine trees",
      "natural aurora borealis illumination, magical winter night atmosphere, breathtaking Nordic landscape"
    ),
    storyTemplate: createStoryTemplate(
      "witness the magic of the aurora",
      "Under the dancing lights of the north, they realize their love is as rare and beautiful as the aurora itself.",
    ),
  },
];
