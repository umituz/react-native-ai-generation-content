import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const STOLEN_MOMENTS_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.UNDER_TABLE_HAND_HOLD,
    title: "The Silent Promise",
    description: "Secretly together in public",
    icon: "🤝",
    imageUrl:
      "https://images.unsplash.com/photo-1516939884455-1445c8652f83?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple at an elegant formal dinner party, split composition showing their composed calm faces above white linen tablecloth while talking to other guests, and below the table their hands are secretly and passionately intertwined with fingers interlaced, wedding bands catching soft light, man in dark suit, woman in elegant dress, crystal glassware on table",
      "warm ambient dining room lighting, soft candlelight, sophisticated formal atmosphere with hidden tension"
    ),
    storyTemplate: createStoryTemplate(
      "share a secret connection amidst a crowd",
      "While the world talks around them, their most important conversation is happening in silence under the table. A bond that doesn't need an audience.",
    ),
  },
  {
    id: ScenarioId.CROWD_STOLEN_LOOK,
    title: "Across the Room",
    description: "Magnetic eye contact",
    icon: "👁️",
    imageUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a crowded upscale cocktail party, blurred elegantly dressed guests moving in background, sharp focus on a couple at opposite ends of the room locking eyes with intense desire, woman in red dress holding a champagne flute, man in tailored dark suit leaning against marble pillar, everything between them softly blurred, magnetic eye contact",
      "warm golden ambient party lighting, bokeh from background lights, high-tension romantic atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "connect across a crowded room",
      "In a sea of faces, there is only one that matters. Their eyes meet, and the noise of the party fades into a distant hum.",
    ),
  },
  {
    id: ScenarioId.ELEVATOR_PROXIMITY,
    title: "The Lift",
    description: "Close enough to touch",
    icon: "🛗",
    imageUrl:
      "https://images.unsplash.com/photo-1527684651001-731c474bbb5a?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple standing very close together in a modern sleek glass and steel elevator, man standing behind woman leaning in close towards her neck, woman looking at camera through the mirrored wall reflection with breathless anticipation, polished metal surfaces, glowing digital floor numbers, business professional attire",
      "cool modern elevator lighting with warm skin tones, reflective surfaces, intimate high-tension atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "feel the electricity of being close",
      "Thirty floors of silence, and a tension that feels like it could break the cables. Every second in this small space is a world of its own.",
    ),
  },
  {
    id: ScenarioId.LIBRARY_SECRET_KISS,
    title: "Shhh...",
    description: "Stolen kiss in the stacks",
    icon: "📚",
    imageUrl:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a romantic couple hidden between tall dark wooden library bookshelves filled with leather-bound books, woman gently pressed against the books, man leaning in for a kiss, both facing camera with secretive mischievous playful smiles, soft dust particles visible in golden sunbeams filtering through the stacks, academic casual attire",
      "soft golden light filtering through bookshelves, dust motes in sunbeams, intimate intellectual atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "steal a kiss where the world is quiet",
      "Between the pages of ancient stories, they're writing a chapter of their own. A secret shared in the hush of a thousand books.",
    ),
  },
  {
    id: ScenarioId.BACKSTAGE_TENSION,
    title: "Before the Show",
    description: "Last minute intensity",
    icon: "🎭",
    imageUrl:
      "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple in the dark backstage wings of a grand theater, heavy red velvet curtains visible in background, man in classic black tuxedo with bow tie, woman in shimmering sequined silver performance gown, leaning into each other with intense expressions moments before going on stage, dramatic warm spotlight spilling from offstage",
      "dramatic theatrical lighting with warm spotlight spill, deep shadows backstage, electric anticipation atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "share a moment of passion before the spotlight",
      "The crowd is waiting, the lights are up, but for this one heartbeat in the shadows, they are the only audience that matters.",
    ),
  },
];
