import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const SOCIAL_MEDIA_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.INSTAGRAM_COUPLE,
    title: "Instagram Icons",
    description: "Picture perfect feed",
    icon: "📸",
    imageUrl:
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple posing for perfect Instagram photo, both facing camera with photogenic natural smiles, man in stylish coordinated streetwear holding professional camera, woman in trendy outfit with designer coffee cup, minimalist urban cafe with exposed brick in background",
      "bright natural daylight with soft shadows and artistic composition"
    ),
    storyTemplate: createStoryTemplate(
      "create a viral moment",
      "Feed goals! Every photo they post is a masterpiece of style and a testament to their incredible chemistry.",
    ),
  },
  {
    id: ScenarioId.TIKTOK_STARS,
    title: "TikTok Trends",
    description: "Moving to the beat",
    icon: "🎬",
    imageUrl:
      "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple filming TikTok dance in modern apartment, both facing camera with high-energy excited smiles mid-dance move, wearing trendy Gen-Z fashion with bold colors, smartphone on ring light tripod in foreground, modern apartment with colorful RGB LED lighting in background",
      "vibrant colorful RGB lighting with dynamic energetic atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "dance through their feed",
      "They've got the moves and the millions of likes. The ultimate power duo of the digital age.",
    ),
  },
  {
    id: ScenarioId.INFLUENCER_LIFE,
    title: "Influencer Life",
    description: "Living the dream online",
    icon: "✨",
    imageUrl:
      "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple as lifestyle influencers in luxury hotel suite, both facing camera with sophisticated confident smiles, man in designer blazer, woman in elegant dress unboxing luxury gift box with tissue paper, bright airy suite with floor-to-ceiling windows and city view in background",
      "bright airy natural light with opulent luxurious atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "influence the world together",
      "Authenticity meets luxury. They don't just follow trends; they create them, all while staying true to each other.",
    ),
  },
  {
    id: ScenarioId.YOUTUBE_VLOG,
    title: "YouTube Vloggers",
    description: "Documenting our journey",
    icon: "📹",
    imageUrl:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple recording travel vlog at exotic location, both facing camera with energetic authentic smiles, man holding vlogging camera on gimbal, woman gesturing excitedly, wearing practical stylish travel outfits with backpacks, stunning tropical beach or ancient temple in background",
      "bright golden hour travel lighting with authentic adventure atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "share their story with the world",
      "Hey guys! Welcome back to their journey. Every video is a new chapter in their epic shared adventure.",
    ),
  },
  {
    id: ScenarioId.TREND_CHALLENGE,
    title: "Trend Challenge",
    description: "The ultimate duo test",
    icon: "🎭",
    imageUrl:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple doing viral couples challenge, both facing camera with playful competitive smiles, wearing fun casual matching outfits, holding challenge props like blindfolds or quiz cards, clean bright studio setup with ring light visible in background",
      "bright studio lighting with fun playful atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "win the internet today",
      "Whether it's the 'blindfold challenge' or 'who knows who better', they always end up winning because they have each other.",
    ),
  },
];
