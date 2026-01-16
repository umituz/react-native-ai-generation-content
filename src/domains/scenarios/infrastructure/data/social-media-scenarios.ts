import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const SOCIAL_MEDIA_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.INSTAGRAM_COUPLE,
    title: "Instagram Icons",
    description: "Picture perfect feed",
    icon: "📸",
    imageUrl:
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800",
    aiPrompt:
      "A couple posing for a perfect Instagram photo, both looking at the camera with photogenic smiles, dressed in super-stylish coordinated streetwear, holding a professional camera and coffee cup, trendy minimalist urban background, artistic composition",
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
    aiPrompt:
      "A couple filming a TikTok dance or challenge, both looking at the camera with high-energy smiles, wearing trendy Gen-Z fashion, smartphone on a ring light setup in front, colorful RGB lighting in a modern apartment background, vibrant and dynamic",
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
    aiPrompt:
      "A couple as high-end lifestyle influencers, both looking at the camera with sophisticated smiles, dressed in designer clothing, unboxing luxury gifts or sitting in a high-end car, bright airy luxury hotel suite background, opulent and professional",
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
      "https://images.unsplash.com/photo-1521791136064-7986c2959213?w=800",
    aiPrompt:
      "A couple recording a travel vlog, both looking at the camera with energetic smiles, holding a vlogging camera on a gimbal, dressed in practical yet stylish travel gear, stunning exotic location or chaotic airport in background, authentic and engaging",
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
    aiPrompt:
      "A couple doing a viral couples challenge, both looking at the camera with playful competitive smiles, dressed in fun casual attire, props related to the challenge, bright studio lighting, fun and engaging atmosphere",
    storyTemplate: createStoryTemplate(
      "win the internet today",
      "Whether it's the 'blindfold challenge' or 'who knows who better', they always end up winning because they have each other.",
    ),
  },
];
