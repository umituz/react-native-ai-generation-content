/**
 * Wedding Preparation Scenarios
 * From proposal to bachelor party
 */

import { Scenario, ScenarioId } from "../../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../../utils/scenario-utils";

export const WEDDING_PREPARATION_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
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
];
