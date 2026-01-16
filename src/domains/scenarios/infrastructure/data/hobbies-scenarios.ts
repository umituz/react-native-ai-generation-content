/**
 * Hobbies Scenarios
 * Scenarios focused on shared passions and activities
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const HOBBIES_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.POTTERY,
    title: "Pottery & Clay",
    description: "Creating art together",
    icon: "🏺",
    imageUrl:
      "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=800&auto=format&fit=crop&q=60",
    aiPrompt:
      "A couple doing pottery together at a wheel, both looking at the camera with warm smiles, dressed in casual clothes with clay mess on hands, warm studio workshop in background, intimate and artistic",
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
    aiPrompt:
      "A couple in ballroom dancing hold, both looking at the camera with elegant romantic expressions, dressed in flowing elegant gown and tuxedo, graceful stance, grand ballroom with crystal chandeliers in background, elegant and romantic",
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
    aiPrompt:
      "A couple gaming together with headsets on, both looking at the camera with excited smiles, dressed in casual clothes, modern gaming setup with purple RGB lighting in background, fun and modern",
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
    aiPrompt:
      "A couple performing music on stage, both holding instruments and looking at the camera with passionate expressions, dressed in cool stage outfits, stage with spotlight and haze in background, artistic and passionate",
    storyTemplate: createStoryTemplate(
      "create a melody of love",
      "Their voices blend in a harmony that the world stops to listen to.",
    ),
  },
];
