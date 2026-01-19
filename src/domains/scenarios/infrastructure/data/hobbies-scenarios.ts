/**
 * Hobbies Scenarios
 * Scenarios focused on shared passions and activities
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const HOBBIES_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.POTTERY,
    title: "Pottery & Clay",
    description: "Creating art together",
    icon: "🏺",
    imageUrl:
      "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a couple doing pottery together at spinning wheel, both facing camera with warm creative smiles, hands covered in wet terracotta clay shaping a vase together, man in clay-splattered denim apron over henley, woman in linen apron with messy bun and clay smudge on cheek, warm sunlit studio workshop with finished pottery on shelves and plants in background",
      "warm natural light from large windows with earthy studio atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "shape their future with their own hands",
      "Mold by mold, spin by spin, they are crafting a life as beautiful as the art they create.",
    ),
  },
  {
    id: ScenarioId.BALLROOM_DANCE,
    title: "Ballroom Dance",
    description: "Waltz in elegance",
    icon: "💃",
    imageUrl:
      "https://v3b.fal.media/files/b/0a8a55bc/Q37FWyfX6jAT6MIsWMO0q.jpg",
    previewImageUrl:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a couple in elegant ballroom dance hold, both facing camera with refined romantic expressions in graceful waltz pose, woman in flowing scarlet ballgown with crystal details and elegant updo, man in classic black tuxedo with white pocket square, grand palace ballroom with massive crystal chandeliers and gold-framed mirrors and polished marble floor in background",
      "warm golden chandelier light with romantic sparkle and reflections"
    ),
    storyTemplate: createStoryTemplate(
      "glide across the floor in perfect harmony",
      "Two hearts beating in one rhythm, they dance through life with grace and elegance.",
    ),
  },
  {
    id: ScenarioId.GAMER_DUO,
    title: "Gamer Duo",
    description: "Player 1 & Player 2",
    icon: "🎮",
    imageUrl:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a couple gaming together on couch, both facing camera with excited competitive smiles, wearing matching gaming headsets with RGB lights, man in comfortable hoodie holding controller intensely, woman in oversized band tee leaning forward with controller, modern gaming setup with dual ultrawide monitors showing game and purple RGB LED ambient lighting in background",
      "moody purple and blue RGB ambient lighting with screen glow"
    ),
    storyTemplate: createStoryTemplate(
      "level up together",
      "It's not just a game. It's a partnership where Player 1 always has Player 2's back.",
    ),
  },
  {
    id: ScenarioId.MUSICIANS,
    title: "Music Duo",
    description: "Harmony on stage",
    icon: "🎸",
    imageUrl:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a couple performing music on intimate stage, both facing camera with passionate expressions mid-performance, man playing electric guitar in leather jacket and vintage band tee, woman at keyboard microphone in flowing bohemian dress with tambourine nearby, warm stage spotlights with atmospheric haze and exposed brick venue wall in background",
      "dramatic warm stage lighting with atmospheric haze and spotlight beams"
    ),
    storyTemplate: createStoryTemplate(
      "create a melody of love",
      "Their voices blend in a harmony that the world stops to listen to.",
    ),
  },
];
