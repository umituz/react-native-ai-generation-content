/**
 * Wedding Journey Scenarios
 * Complete wedding journey from proposal to honeymoon
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const WEDDING_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.PROPOSAL,
    title: "The Proposal",
    description: "Will you marry me?",
    icon: "💍",
    imageUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=60",
    aiPrompt:
      "A couple during a romantic proposal moment, man on one knee holding a ring box, woman with hands over mouth in surprise, both looking at camera with emotional expressions, dressed in elegant evening attire, romantic setting with candles and rose petals in background, magical and emotional",
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
    aiPrompt:
      "A newly engaged couple at their engagement party, both looking at camera with joyful smiles, showing off engagement ring, dressed in elegant party attire, champagne glasses in hand, festive party with balloons and decorations in background, celebratory and joyful",
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
    aiPrompt:
      "A bride trying on wedding dress in a bridal boutique, looking at camera with excited smile, wearing stunning white wedding gown, groom watching admiringly in background, elegant bridal shop with mirrors and soft lighting, dreamy and romantic",
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
    aiPrompt:
      "A couple during engagement photoshoot, both looking at camera with loving smiles, dressed in coordinated elegant casual outfits, holding hands, beautiful outdoor location with golden hour lighting in background, romantic and professional",
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
    aiPrompt:
      "A bride at her bridal shower party, both bride and groom looking at camera with happy smiles, dressed in elegant party attire, surrounded by gifts and decorations, beautiful party venue with flowers and balloons in background, festive and joyful",
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
    aiPrompt:
      "A couple celebrating their bachelor and bachelorette parties, both looking at camera with excited smiles, dressed in fun party outfits, party atmosphere with friends in background, energetic and celebratory",
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
    aiPrompt:
      "A couple at their church wedding ceremony, both looking at camera with emotional smiles, bride in stunning white wedding gown with veil, groom in classic black tuxedo, beautiful church interior with stained glass windows and flowers in background, sacred and elegant",
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
    aiPrompt:
      "A couple at their garden wedding ceremony, both looking at camera with radiant smiles, bride in flowing white gown, groom in light-colored suit, lush garden with blooming flowers and floral arch in background, natural and romantic",
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
    aiPrompt:
      "A couple at their beach wedding ceremony, both looking at camera with joyful smiles, bride in flowing beach wedding dress, groom in linen suit, barefoot on sand, ocean sunset and beach ceremony setup in background, tropical and romantic",
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
    aiPrompt:
      "A couple at their castle wedding, both looking at camera with regal smiles, bride in princess-style ball gown, groom in formal tuxedo, grand castle interior with chandeliers and ornate decorations in background, majestic and fairytale",
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
    aiPrompt:
      "A couple at their wedding reception, both looking at camera with ecstatic smiles, bride and groom in wedding attire, surrounded by guests and decorations, elegant reception venue with lights and flowers in background, festive and joyful",
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
    aiPrompt:
      "A couple during their first dance as married couple, both looking at camera while dancing, bride in wedding gown, groom in tuxedo, romantic dance floor with soft lighting and guests watching in background, intimate and romantic",
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
    aiPrompt:
      "A couple cutting their wedding cake together, both looking at camera with playful smiles, hands together on knife, bride and groom in wedding attire, beautiful multi-tier wedding cake and reception venue in background, sweet and joyful",
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
    aiPrompt:
      "A newlywed couple on their honeymoon, both looking at camera with blissful smiles, dressed in elegant resort wear, relaxing in tropical paradise, luxury resort with ocean view in background, romantic and dreamy",
    storyTemplate: createStoryTemplate(
      "begin their honeymoon",
      "Just the two of them, in paradise. The wedding is over, but the adventure of marriage has just begun.",
    ),
  },
];
