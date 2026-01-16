import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const ART_STUDIO_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.CANVAS_TOGETHER,
    title: "Canvas Together",
    description: "Painting our future",
    icon: "🎨",
    imageUrl:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800",
    aiPrompt:
      "A couple in a messy, bright art studio, standing in front of a massive abstract canvas, both with paint splatters on their faces and clothes, looking at the camera with joyful creative smiles, holding paintbrushes, sunlit industrial windows in background, artistic and messy-chic",
    storyTemplate: createStoryTemplate(
      "create a masterpiece of shared creativity",
      "They aren't just painting a canvas; they're painting a life together. Every splash of color is a memory, every stroke a promise.",
    ),
  },
  {
    id: ScenarioId.PORTRAIT_SKETCHING,
    title: "Portrait Sketching",
    description: "Seeing each other",
    icon: "✏️",
    imageUrl:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800",
    aiPrompt:
      "A couple in a cozy studio, each sitting behind an easel, sketching a portrait of the other, looking at each other over the easels with affectionate and playful smiles, soft directional lighting, charcoal and sketches scattered around, intimate and creative",
    storyTemplate: createStoryTemplate(
      "capture the beauty they see in each other",
      "To draw is to truly see. In every line and shadow they sketch, they discover something new to love about the person in front of them.",
    ),
  },
  {
    id: ScenarioId.SCULPTING_LOVE,
    title: "Sculpting Love",
    description: "Shaping destiny",
    icon: "🏺",
    imageUrl:
      "https://images.unsplash.com/photo-1565193998941-8656113e11f1?w=800",
    aiPrompt:
      "A couple working together on a large clay sculpture, hands covered in grey clay and intertwined as they shape the figure, both looking at the camera with focused warm smiles, rustic studio with pottery wheels in background, soft natural lighting, tactile and intimate",
    storyTemplate: createStoryTemplate(
      "shape their bond from the raw clay of life",
      "With patience and care, they mold their relationship into something strong and beautiful. A love that's truly hand-crafted.",
    ),
  },
  {
    id: ScenarioId.GALLERY_WALK,
    title: "Gallery Walk",
    description: "Our own exhibition",
    icon: "🖼️",
    imageUrl:
      "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=800",
    aiPrompt:
      "A couple in a sleek modern art gallery, walking hand-in-hand past their own paintings on the walls, both looking at the camera with proud sophisticated smiles, man in a sharp blazer, woman in an elegant minimalist dress, bright clean lighting, achievement and shared pride",
    storyTemplate: createStoryTemplate(
      "celebrate their shared achievements on the gallery walls",
      "The greatest art they've ever created is the life they share. Today, they're the stars of their own triumphant exhibition.",
    ),
  },
];
