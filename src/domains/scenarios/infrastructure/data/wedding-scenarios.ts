/**
 * Wedding Journey Scenarios
 * Complete wedding journey from proposal to honeymoon
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const WEDDING_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.PROPOSAL,
    title: "The Proposal",
    description: "Will you marry me?",
    icon: "💍",
    imageUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a romantic proposal moment, man on one knee holding an open velvet ring box with sparkling diamond ring, woman with hands over her mouth in surprise showing happy tears, both facing camera with emotional expressions, man in tailored dark suit, woman in elegant cocktail dress, romantic restaurant terrace with candlelit tables and rose petals scattered on floor",
      "warm romantic candlelight, soft golden ambient glow, magical emotional atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "ask the most important question",
      "In this perfect moment, one question changes everything. The answer is written in their eyes.",
    ),
  },
  {
    id: ScenarioId.ENGAGEMENT_PARTY,
    title: "Engagement Celebration",
    description: "Celebrating the yes",
    icon: "🎉",
    imageUrl:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a newly engaged couple at their elegant engagement party, both facing camera with joyful smiles, woman showing off sparkling engagement ring on extended hand, man in navy blazer with pocket square, woman in champagne colored cocktail dress, holding crystal champagne flutes, festive venue with gold balloons and floral centerpieces",
      "warm festive party lighting, soft golden ambient glow, celebratory joyful atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "celebrate their engagement",
      "Surrounded by loved ones, they toast to forever. The journey to 'I do' has officially begun.",
    ),
  },
  {
    id: ScenarioId.DRESS_SHOPPING,
    title: "Finding The Dress",
    description: "The perfect gown",
    icon: "👗",
    imageUrl:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a bride trying on wedding dress in an elegant bridal boutique, facing camera with excited beaming smile, wearing stunning white A-line wedding gown with delicate lace details, groom visible in background watching admiringly, floor-to-ceiling mirrors and plush seating, crystal chandelier overhead",
      "soft flattering boutique lighting, diffused natural light from windows, dreamy romantic atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "find the perfect dress",
      "When she sees herself in THE dress, she knows. This is the one she'll wear to marry her soulmate.",
    ),
  },
  {
    id: ScenarioId.ENGAGEMENT_SHOOT,
    title: "Engagement Photos",
    description: "Capturing the love",
    icon: "📸",
    imageUrl:
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a couple during professional engagement photoshoot, both facing camera with loving genuine smiles, dressed in coordinated elegant casual outfits in neutral tones, holding hands with fingers interlaced, standing in beautiful outdoor location with trees and open field",
      "golden hour backlighting, warm sun flare, professional romantic photography atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "capture their love story",
      "Every photo tells their story - from the first glance to this moment, ready to say forever.",
    ),
  },
  {
    id: ScenarioId.BRIDAL_SHOWER,
    title: "Bridal Shower",
    description: "Girls celebration",
    icon: "💐",
    imageUrl:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a bride at her elegant bridal shower party, bride in beautiful white lace dress with groom in smart casual attire, both facing camera with happy radiant smiles, surrounded by wrapped gifts with white ribbon bows, venue decorated with pink and white flowers, rose gold balloons",
      "soft warm party lighting, natural daylight through windows, festive joyful celebration atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "celebrate with loved ones",
      "Laughter, tears of joy, and endless love. Her closest friends gather to celebrate the bride-to-be.",
    ),
  },
  {
    id: ScenarioId.BACHELOR_PARTY,
    title: "Last Night Out",
    description: "Bachelor/Bachelorette party",
    icon: "🎊",
    imageUrl:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a fun couple celebrating their bachelor and bachelorette parties, both facing camera with excited energetic smiles, man wearing party sash and fun accessories, woman in sparkly dress with bride-to-be tiara, upscale venue with friends cheering in background, confetti in air",
      "vibrant party lighting, colorful ambient glow, energetic celebratory nightlife atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "celebrate their last night of freedom",
      "One last adventure before the biggest adventure of all. Tomorrow, everything changes for the better.",
    ),
  },
  {
    id: ScenarioId.CHURCH_WEDDING,
    title: "Church Ceremony",
    description: "Traditional sacred vows",
    icon: "⛪",
    imageUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a couple at their traditional church wedding ceremony, both facing camera with emotional joyful smiles, bride in stunning white wedding gown with delicate lace veil, groom in classic black tuxedo with white boutonniere, beautiful historic church interior with ornate stained glass windows casting colorful light, white floral arrangements along the aisle",
      "soft natural light through stained glass, warm ambient church lighting, sacred elegant atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "exchange sacred vows",
      "In this holy place, before God and witnesses, they promise forever. Two souls become one.",
    ),
  },
  {
    id: ScenarioId.GARDEN_WEDDING,
    title: "Garden Wedding",
    description: "Nature's blessing",
    icon: "🌸",
    imageUrl:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a couple at their beautiful garden wedding ceremony, both facing camera with radiant joyful smiles, bride in flowing white chiffon gown with flower crown, groom in light beige linen suit, standing under a lush floral arch covered in pink and white roses, manicured garden with blooming peonies and hedges",
      "natural golden afternoon sunlight, dappled light through trees, romantic outdoor garden atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "marry in nature's cathedral",
      "Surrounded by blooming flowers and gentle breezes, nature itself celebrates their union.",
    ),
  },
  {
    id: ScenarioId.BEACH_WEDDING,
    title: "Beach Wedding",
    description: "Sunset vows",
    icon: "🏖️",
    imageUrl:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a couple at their romantic beach wedding ceremony, both facing camera with joyful genuine smiles, bride in flowing white bohemian beach wedding dress with windswept hair, groom in cream linen suit, both barefoot on pristine white sand, turquoise ocean waves and stunning sunset sky, bamboo wedding arch with white fabric and tropical flowers",
      "warm golden sunset backlighting, ocean breeze atmosphere, tropical romantic beach wedding ambiance"
    ),
    storyTemplate: createStoryTemplate(
      "say I do by the ocean",
      "With the waves as their witness and the sunset painting the sky, they begin their forever.",
    ),
  },
  {
    id: ScenarioId.CASTLE_WEDDING,
    title: "Castle Wedding",
    description: "Fairytale come true",
    icon: "🏰",
    imageUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a couple at their fairytale castle wedding, both facing camera with regal elegant smiles, bride in princess-style ball gown with sweetheart neckline and long train, groom in formal black and white tuxedo with tails, grand castle great hall with massive crystal chandeliers, stone walls with tapestries, ornate gold decorations",
      "warm golden chandelier lighting, dramatic castle interior ambiance, majestic fairytale atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "live their fairytale",
      "In a castle fit for royalty, their love story becomes the stuff of legends.",
    ),
  },
  {
    id: ScenarioId.RECEPTION_PARTY,
    title: "Wedding Reception",
    description: "Party celebration",
    icon: "🎆",
    imageUrl:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a couple at their wedding reception celebration, both facing camera with ecstatic joyful smiles, bride in elegant white reception dress, groom in formal suit, surrounded by cheering guests in formal attire, elegant ballroom venue with string lights, white draping, and elaborate floral centerpieces",
      "warm festive reception lighting, soft string lights and candles, joyful celebration atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "celebrate with everyone they love",
      "The ceremony is over, the party begins. Tonight, love is the only thing that matters.",
    ),
  },
  {
    id: ScenarioId.FIRST_DANCE,
    title: "First Dance",
    description: "As husband and wife",
    icon: "💃",
    imageUrl:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a newlywed couple sharing their first dance as husband and wife, both facing camera while dancing elegantly, bride in flowing white wedding gown, groom in classic black tuxedo, romantic dance floor with soft spotlight, guests watching adoringly from surrounding tables with candles",
      "soft romantic spotlight, warm ambient dance floor lighting, intimate magical first dance atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "share their first dance",
      "In each other's arms, they dance as husband and wife for the first time. The world fades away.",
    ),
  },
  {
    id: ScenarioId.CAKE_CUTTING,
    title: "Cake Cutting",
    description: "Sweet tradition",
    icon: "🍰",
    imageUrl:
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a couple cutting their elegant wedding cake together, both facing camera with playful loving smiles, hands together on silver cake knife, bride in white gown, groom in tuxedo, beautiful four-tier white wedding cake with sugar flowers and gold accents on decorated table",
      "soft warm reception lighting, romantic ambient glow, sweet celebratory moment"
    ),
    storyTemplate: createStoryTemplate(
      "cut their wedding cake",
      "A sweet moment, a playful tradition. The first of many things they'll share as one.",
    ),
  },
  {
    id: ScenarioId.HONEYMOON,
    title: "Honeymoon Bliss",
    description: "Just married paradise",
    icon: "🌅",
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a blissful newlywed couple on their honeymoon vacation, both facing camera with relaxed happy smiles, man in white linen shirt and shorts, woman in elegant flowing tropical maxi dress, relaxing by infinity pool at luxury resort, stunning turquoise ocean view and palm trees in background",
      "warm tropical sunlight, golden hour glow, romantic paradise honeymoon atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "begin their honeymoon",
      "Just the two of them, in paradise. The wedding is over, but the adventure of marriage has just begun.",
    ),
  },
];
