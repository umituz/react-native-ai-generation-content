import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const FOLKLORE_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.RED_RIDING_HOOD,
    title: "The Woods",
    description: "A mysterious encounter",
    icon: "🐺",
    imageUrl:
      "https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple in dark enchanted forest, woman in luxurious crimson red velvet hooded cloak with gold clasps facing camera with mysterious knowing smile, man emerging from shadows behind her with intense wolf-like gaze wearing rugged dark leather jacket with fur collar and wild tousled hair, ancient gnarled oak trees with twisted branches and swirling silver mist and shafts of pale moonlight cutting through canopy in background",
      "mysterious atmospheric moonlight with cool blue shadows and single warm highlight on her face"
    ),
    storyTemplate: createStoryTemplate(
      "venture deep into the heart of the ancient woods",
      "They found that the most dangerous thing in the forest wasn't the shadows, but the depth of the love they discovered together.",
    ),
  },
  {
    id: ScenarioId.CINDERELLA_BALL,
    title: "Midnight Ball",
    description: "A magical dance",
    icon: "👠",
    imageUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple dancing in grand palace ballroom at stroke of midnight, woman in shimmering powder-blue silk ballgown with layers of tulle and crystal embellishments and glass slippers visible, man in regal navy military dress uniform with gold epaulettes and white gloves holding her waist, both facing camera with enchanted delighted smiles, massive ornate clock showing midnight and magical golden sparkles swirling and crystal chandeliers and marble columns in background",
      "magical warm golden lighting with sparkle effects and romantic fairytale glow"
    ),
    storyTemplate: createStoryTemplate(
      "dance the night away in a dream of gold and glass",
      "Even when the clock strikes twelve, the magic they've built together will never fade into a pumpkin. Their story is just beginning.",
    ),
  },
  {
    id: ScenarioId.ROBIN_HOOD_MARIAN,
    title: "Sherwood Outlaws",
    description: "Noble thieves",
    icon: "🏹",
    imageUrl:
      "https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple in lush Sherwood Forest outlaw camp, man in Lincoln green tunic with leather quiver on back holding longbow with drawn arrow showing confident smile, woman in sophisticated forest green velvet medieval gown with gold trim showing rebellious noble expression, both facing camera, rustic camp with canvas tents and campfire smoke and dappled sunlight filtering through ancient oak canopy in background",
      "warm dappled forest sunlight with golden green tones filtering through leaves"
    ),
    storyTemplate: createStoryTemplate(
      "fight for justice in the heart of Sherwood",
      "They may be outlaws to the world, but in each other's arms, they've found the greatest treasure of all: freedom and devotion.",
    ),
  },
  {
    id: ScenarioId.ALICE_WONDERLAND,
    title: "Wonderland Tea",
    description: "Surreal tea party",
    icon: "☕",
    imageUrl:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple at whimsical Wonderland tea party, both facing camera with delightfully quirky mad expressions, man in oversized purple velvet top hat and mismatched Victorian coat with pocket watch chain, woman in pale blue Victorian dress with white apron and black headband holding oversized teacup, impossibly long table laden with colorful mismatched teapots and pastries with giant spotted mushrooms and roses of unusual colors in surreal garden in background",
      "soft diffused dreamy lighting with saturated candy colors and slight soft focus haze"
    ),
    storyTemplate: createStoryTemplate(
      "lose themselves in a world of impossible things",
      "In a land where nothing makes sense, their love is the only thing that's true. Curiosity didn't kill the cat; it led them to each other.",
    ),
  },
  {
    id: ScenarioId.BEAUTY_BEAST_DANCE,
    title: "Enchanted Dance",
    description: "A tale as old as time",
    icon: "🌹",
    imageUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple dancing in enchanted castle library ballroom, woman in iconic golden yellow silk ballgown with off-shoulder neckline and full skirt and upswept hair, man in ornate midnight blue royal coat with gold embroidery and subtle beast-like noble features or elegant half-mask, gazing at each other with deep romantic affection, single red rose glowing under glass dome in foreground and towering bookshelves and magical candlelight floating in background",
      "romantic warm candlelight with magical golden glow and soft rose-colored highlights"
    ),
    storyTemplate: createStoryTemplate(
      "find the beauty within the shadows",
      "It's a tale as old as time, yet as fresh as a morning rose. They proved that true love sees far beyond the surface.",
    ),
  },
];
