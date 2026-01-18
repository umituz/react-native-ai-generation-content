import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const FOLKLORE_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.RED_RIDING_HOOD,
    title: "The Woods",
    description: "A mysterious encounter",
    icon: "🐺",
    imageUrl:
      "https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?w=800",
    aiPrompt:
      "A couple in a dark misty forest, woman in a lush red velvet hooded cloak looking at the camera with a mysterious smile, man behind her with a subtle wolf-like charisma wearing dark rugged leather, shadows of ancient trees and moonlight, atmospheric and gothic fairytale aesthetic",
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
    aiPrompt:
      "A couple dancing in a grand marble ballroom at midnight, woman in a shimmering powder-blue ballgown, man in a regal military-style formal suit, both looking at the camera with enchanted smiles, large clock in background showing midnight, magical sparks and golden lighting, opulent and romantic",
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
    aiPrompt:
      "A couple in a lush green forest camp, man with a bow and arrow, woman in a sophisticated medieval gown, both looking at the camera with rebellious and noble expressions, sunlight filtering through the leaves, rustic medieval camp details in background, adventurous and romantic",
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
    aiPrompt:
      "A couple at a long eccentric tea table in a surreal garden, both looking at the camera with whimsical and quirky expressions, various mismatched teapots and giant mushrooms in background, wearing extravagant victorian-inspired quirky fashion, colorful and dreamlike",
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
    aiPrompt:
      "A couple dancing in a dark gothic library, woman in an iconic yellow tiered dress, man in a navy blue royal coat with subtle beast-like features or mask, looking at each other with deep affection, single glowing rose in the foreground, cinematic and majestic",
    storyTemplate: createStoryTemplate(
      "find the beauty within the shadows",
      "It's a tale as old as time, yet as fresh as a morning rose. They proved that true love sees far beyond the surface.",
    ),
  },
];
