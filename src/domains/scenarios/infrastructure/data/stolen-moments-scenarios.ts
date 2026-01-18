import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const STOLEN_MOMENTS_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.UNDER_TABLE_HAND_HOLD,
    title: "The Silent Promise",
    description: "Secretly together in public",
    icon: "🤝",
    imageUrl:
      "https://images.unsplash.com/photo-1516939884455-1445c8652f83?w=800",
    aiPrompt:
      "A couple at a formal dinner party, faces calm and detached as they look at other guests, but underneath the white-clothed table, their hands are tightly and passionately intertwined, man's fingers laced with woman's, wedding bands reflecting dim light, high emotional tension in a public setting",
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
    aiPrompt:
      "A crowded high-end party, blurred guests moving in background, focus on a couple at opposite ends of the room locking eyes with intense desire, woman holding a cocktail glass, man leaning against a pillar, the world between them is a blur, high-tension gaze",
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
    aiPrompt:
      "A couple standing very close in a modern glass elevator, man behind woman leaning in towards her neck, woman looking at the camera through the mirror reflection with a breathless expression, silver metal surfaces and digital floor numbers in background, high-tension proximity",
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
    aiPrompt:
      "A couple hidden between tall dark wooden library shelves, woman pressed against the books, man leaning in to kiss her, both looking at camera with secretive mischievous smiles, soft dust motes in sunbeams filtering through shelves, intimate and intellectual",
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
    aiPrompt:
      "A couple in the dark wings of a theater stage, heavy red curtains in background, man in a tuxedo, woman in a shimmering performance dress, leaning into each other with intense expressions just before going on stage, dramatic spotlight spill from off-camera, electric anticipation",
    storyTemplate: createStoryTemplate(
      "share a moment of passion before the spotlight",
      "The crowd is waiting, the lights are up, but for this one heartbeat in the shadows, they are the only audience that matters.",
    ),
  },
];
