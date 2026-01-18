/**
 * Intimate & Romantic Scenarios
 * Elegant and sensual scenarios for couples
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const INTIMATE_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.LUXURY_SPA,
    title: "Luxury Spa Romance",
    description: "Relaxation and romance",
    icon: "💆",
    imageUrl:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a sophisticated couple relaxing together in a luxury spa resort, both facing camera with serene genuine smiles, wearing pristine white plush bathrobes, seated by an infinity pool with floating candles and scattered red rose petals, soft steam rising, marble floors and tropical plants visible",
      "warm soft ambient spa lighting, gentle steam diffusion, golden hour glow"
    ),
    storyTemplate: createStoryTemplate(
      "escape to pure relaxation",
      "In this sanctuary of serenity, they find peace in each other's presence, letting the world fade away.",
    ),
  },
  {
    id: ScenarioId.BUBBLE_BATH,
    title: "Bubble Bath Bliss",
    description: "Romantic bath moment",
    icon: "🛁",
    imageUrl:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a romantic couple in a luxurious freestanding bathtub filled with bubbles, both looking at camera with loving genuine smiles, surrounded by dozens of lit candles and fresh rose petals, crystal champagne flutes nearby, elegant marble bathroom with gold fixtures and large mirror",
      "warm candlelight creating soft shadows, intimate golden ambient glow"
    ),
    storyTemplate: createStoryTemplate(
      "soak in pure romance",
      "Surrounded by candlelight and bubbles, every moment becomes a celebration of their love.",
    ),
  },
  {
    id: ScenarioId.SUNRISE_BED,
    title: "Sunrise in Bed",
    description: "Morning golden hour",
    icon: "🌅",
    imageUrl:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a couple lying in a luxurious king bed during early morning, both facing camera with warm sleepy genuine smiles, wearing elegant silk pajamas, crisp white linen sheets slightly rumpled, soft golden sunlight streaming through sheer white curtains, minimalist modern bedroom with neutral tones",
      "golden hour morning sunlight, natural soft window light, warm intimate atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "wake up to a new day together",
      "As the first rays of sun paint the room gold, they realize every morning with each other is a gift.",
    ),
  },
  {
    id: ScenarioId.WINE_TASTING,
    title: "Wine Cellar Romance",
    description: "Sophisticated wine moment",
    icon: "🍷",
    imageUrl:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a sophisticated couple wine tasting in an authentic stone wine cellar, both facing camera with genuine warm smiles showing natural joy, man wearing tailored navy blue suit with white shirt, woman wearing elegant burgundy velvet dress, each holding crystal wine glasses with deep red wine, aged oak wine barrels stacked behind them, cobblestone floor, arched stone ceiling",
      "warm amber candlelight and wall sconces, romantic dim atmospheric lighting, soft shadows on stone walls"
    ),
    storyTemplate: createStoryTemplate(
      "savor the finest moments",
      "Like a perfectly aged wine, their love only grows richer and more complex with time.",
    ),
  },
  {
    id: ScenarioId.ROSE_PETALS,
    title: "Rose Petal Paradise",
    description: "Luxury hotel romance",
    icon: "🌹",
    imageUrl:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a romantic couple in a luxury hotel suite bedroom covered in hundreds of fresh red rose petals, both facing camera with romantic genuine smiles, man in dark suit, woman in elegant black evening dress, champagne bottle in ice bucket and lit candles on bedside table, opulent king bed with white silk sheets, floor-to-ceiling windows showing city skyline at twilight",
      "soft romantic ambient lighting, warm candlelight glow, city lights through windows"
    ),
    storyTemplate: createStoryTemplate(
      "celebrate love in luxury",
      "In a room adorned with a thousand roses, they create memories as beautiful as the petals around them.",
    ),
  },
  {
    id: ScenarioId.PRIVATE_BEACH,
    title: "Private Beach Sunset",
    description: "Exclusive paradise",
    icon: "🏖️",
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a couple on a private tropical beach at sunset, both facing camera with joyful genuine smiles, man in linen shirt and shorts, woman in flowing white beach dress, lounging on luxury daybed with white canopy, champagne glasses in hand, pristine white sand, turquoise ocean waves, palm trees silhouetted against golden orange sunset sky",
      "golden hour sunset lighting, warm orange and pink sky tones, natural beach atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "escape to their private paradise",
      "On this secluded shore, with only the waves as witness, they write their own love story in the sand.",
    ),
  },
  {
    id: ScenarioId.MASQUERADE,
    title: "Masquerade Ball",
    description: "Mysterious elegance",
    icon: "🎭",
    imageUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a elegant couple at a venetian masquerade ball, both facing camera with mysterious alluring genuine smiles, wearing ornate handcrafted venetian masks with gold and feather details, man in black tuxedo with bow tie, woman in stunning red ball gown, grand ballroom with crystal chandeliers, marble columns, other masked guests dancing in background",
      "warm golden chandelier lighting, candlelit ambiance, dramatic theatrical atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "dance behind the masks",
      "In a world of mystery and elegance, they find that true intimacy needs no disguise.",
    ),
  },
  {
    id: ScenarioId.MOONLIGHT_BALCONY,
    title: "Moonlight Balcony",
    description: "City lights romance",
    icon: "🌙",
    imageUrl:
      "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a romantic couple standing on a luxury penthouse balcony at night, both facing camera with tender genuine smiles, man in dark blazer, woman in elegant cocktail dress, holding crystal champagne flutes, wrought iron railing with string lights, sprawling city skyline with twinkling lights, large full moon in clear night sky",
      "soft moonlight combined with warm city glow, romantic night atmosphere, subtle string light illumination"
    ),
    storyTemplate: createStoryTemplate(
      "dance under the moonlight",
      "High above the city, under the watchful moon, they find their own piece of heaven.",
    ),
  },
];
