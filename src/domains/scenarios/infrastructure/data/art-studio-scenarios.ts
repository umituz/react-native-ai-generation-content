import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const ART_STUDIO_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.CANVAS_TOGETHER,
    title: "Canvas Together",
    description: "Painting our future",
    icon: "🎨",
    imageUrl:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple in bright industrial art studio, both facing camera with joyful creative grins, colorful acrylic paint splatters on cheeks and hands, man in white cotton t-shirt with blue and yellow paint streaks holding thick bristle brush, woman in oversized denim shirt with rolled sleeves and red paint in her hair holding palette knife, standing before massive vibrant abstract expressionist canvas, tall steel-framed windows with exposed brick walls and scattered paint tubes in background",
      "bright natural daylight streaming through industrial windows with paint-speckled atmosphere"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple sketching portraits of each other in cozy art studio, each sitting behind wooden easel with charcoal pencils, peeking at each other over canvases with affectionate playful smiles, man in charcoal gray henley with smudged fingers, woman in cream cable-knit sweater with hair tied up messily, scattered charcoal sticks and crumpled paper sketches on worn wooden floor around them",
      "soft directional north light from skylights creating gentle shadows and highlighting charcoal dust in air"
    ),
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
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple sculpting together in rustic ceramics studio, both facing camera with focused warm smiles, hands covered in wet gray clay and fingers gently intertwined while shaping tall abstract figure on turntable, man in rolled-up chambray shirt with clay on forearms, woman in linen apron over black tank top with clay-dusted cheeks, pottery wheels and terracotta pieces drying on wooden shelves in background",
      "warm soft natural light from high windows with earthy atmosphere and dust particles visible"
    ),
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
      "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple walking through sleek contemporary art gallery with their paintings on display, both facing camera with proud sophisticated smiles while holding hands, man in tailored charcoal wool blazer over black turtleneck, woman in elegant minimalist ivory midi dress with gold pendant necklace, large colorful canvases in gold frames on white walls with polished concrete floors in background",
      "bright clean gallery lighting with soft spotlights on artwork creating even professional illumination"
    ),
    storyTemplate: createStoryTemplate(
      "celebrate their shared achievements on the gallery walls",
      "The greatest art they've ever created is the life they share. Today, they're the stars of their own triumphant exhibition.",
    ),
  },
];
