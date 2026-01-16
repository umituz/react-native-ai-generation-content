/**
 * Fashion Scenarios
 * Scenarios focused on iconic fashion eras and styles
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const FASHION_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.DISCO_70S,
    title: "70s Disco",
    description: "Groovy retro party",
    icon: "🪩",
    imageUrl:
      "https://images.unsplash.com/photo-1545128485-c400e7702796?w=800&auto=format&fit=crop&q=60",
    aiPrompt:
      "A couple dancing in 70s disco fashion, both looking at the camera with energetic smiles, dressed in sequins and bell bottoms, vibrant disco dance floor with reflections in background, groovy styling, fun and energetic",
    storyTemplate: createStoryTemplate(
      "boogie all night long",
      "Under the disco ball, their love shines brighter than the sequins on the dance floor.",
    ),
  },
  {
    id: ScenarioId.STEAMPUNK,
    title: "Steampunk",
    description: "Victorian industrial sci-fi",
    icon: "⚙️",
    imageUrl:
      "https://images.unsplash.com/photo-1616790876844-97c0c6057364?w=800&auto=format&fit=crop&q=60",
    aiPrompt:
      "A couple in steampunk fashion, both looking at the camera with intriguing expressions, dressed in Victorian clothes with brass gears and goggles, clockwork industrial setting with steam in background, industrial accessories, innovative and retro-future",
    storyTemplate: createStoryTemplate(
      "engineer a future of steam and gears",
      "In a world of clockwork innovation, their hearts beat with the precision of destiny.",
    ),
  },
  {
    id: ScenarioId.HIGH_FASHION,
    title: "Vogue Editorial",
    description: "Avant-garde runway look",
    icon: "👠",
    imageUrl:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=60",
    aiPrompt:
      "A couple in a high fashion editorial, both standing with dramatic poses and looking at the camera, dressed in avant-garde couture outfits, minimalist architectural setting with harsh studio lighting in background, chic and sophisticated",
    storyTemplate: createStoryTemplate(
      "grace the cover of life",
      "Every street is a runway, and every moment is a cover shot when they are together.",
    ),
  },
  {
    id: ScenarioId.GRUNGE_90S,
    title: "90s Grunge",
    description: "Rock band aesthetic",
    icon: "🎸",
    imageUrl:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&auto=format&fit=crop&q=60",
    aiPrompt:
      "A couple in 90s grunge style leaning against a wall, both looking at the camera with cool edgy expressions, dressed in flannel shirts and ripped jeans, messy hair, urban brick wall with moody lighting in background, raw and edgy",
    storyTemplate: createStoryTemplate(
      "rock their own rhythm",
      "Raw, real, and unfiltered. Their love is the anthem of a generation.",
    ),
  },
];
