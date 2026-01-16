/**
 * Intimate & Romantic Scenarios
 * Elegant and sensual scenarios for couples
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const INTIMATE_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.LUXURY_SPA,
    title: "Luxury Spa Romance",
    description: "Relaxation and romance",
    icon: "💆",
    imageUrl:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=60",
    aiPrompt:
      "A couple relaxing together in a luxury spa, both looking at the camera with serene smiles, dressed in elegant white bathrobes, soft steam and warm lighting, infinity pool with candles and rose petals in background, romantic and luxurious",
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
    aiPrompt:
      "A couple in a romantic bubble bath, both looking at the camera with loving smiles, surrounded by candles and rose petals, champagne glasses nearby, luxury bathroom with marble and gold accents in background, intimate and elegant",
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
    aiPrompt:
      "A couple in bed during sunrise, both looking at the camera with warm morning smiles, dressed in elegant sleepwear, soft golden sunlight streaming through sheer curtains, white linen sheets, luxury bedroom with minimalist decor in background, intimate and dreamy",
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
    aiPrompt:
      "A couple wine tasting in an elegant wine cellar, both looking at the camera with sophisticated smiles, dressed in upscale evening attire, holding wine glasses, rustic wine barrels and dim romantic lighting in background, classy and romantic",
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
    aiPrompt:
      "A couple in a luxury hotel suite covered in rose petals, both looking at the camera with romantic smiles, dressed in elegant evening wear, champagne and candles, opulent bedroom with city view through floor-to-ceiling windows in background, luxurious and romantic",
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
    aiPrompt:
      "A couple on a private beach at sunset, both looking at the camera with joyful smiles, dressed in elegant beach resort wear, lounging on luxury beach beds with champagne, golden sunset over turquoise ocean in background, exclusive and romantic",
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
    aiPrompt:
      "A couple at an elegant masquerade ball, both looking at the camera with mysterious alluring smiles, wearing ornate Venetian masks and formal evening attire, grand ballroom with chandeliers and candlelight in background, mysterious and elegant",
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
    aiPrompt:
      "A couple on a moonlit balcony, both looking at the camera with tender smiles, dressed in elegant evening wear, champagne glasses in hand, city skyline with twinkling lights and full moon in background, romantic and enchanting",
    storyTemplate: createStoryTemplate(
      "dance under the moonlight",
      "High above the city, under the watchful moon, they find their own piece of heaven.",
    ),
  },
];
