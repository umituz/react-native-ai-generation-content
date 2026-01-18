/**
 * Fashion Scenarios
 * Scenarios focused on iconic fashion eras and styles
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const FASHION_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.DISCO_70S,
    title: "70s Disco",
    description: "Groovy retro party",
    icon: "🪩",
    imageUrl:
      "https://images.unsplash.com/photo-1545128485-c400e7702796?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a couple dancing together in authentic 70s disco fashion, both facing camera with energetic joyful smiles mid-dance, man in tight white polyester suit with wide lapels and gold chain necklace and platform shoes with pompadour hair, woman in shimmering silver halter jumpsuit with flared bell bottoms and chunky platform heels with feathered Farrah hair, vibrant light-up dance floor with colored squares and giant spinning mirror ball scattering rainbow reflections in background",
      "dynamic disco lighting with colorful rotating spots and rainbow reflections from mirror ball"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple in elaborate steampunk fashion, both facing camera with intriguing mysterious expressions, man in brown leather waistcoat over white high-collar shirt with brass pocket watch and welding goggles on top hat with gear decorations, woman in corseted burgundy velvet dress with bustle and brass clockwork jewelry and aviator goggles around neck, industrial Victorian workshop with massive brass gears and copper pipes releasing steam and glowing vacuum tubes in background",
      "warm amber lighting with dramatic steam atmosphere and copper metallic highlights"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple in high fashion editorial photoshoot, both striking dramatic confident poses facing camera with fierce model expressions, man in deconstructed Comme des Garcons asymmetric black suit with architectural silhouette, woman in avant-garde Iris van Herpen sculptural white gown with geometric 3D elements, minimalist white concrete architectural setting with dramatic harsh directional studio lighting creating sharp shadows",
      "high-contrast editorial studio lighting with stark white and deep shadows creating dramatic shapes"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple in authentic 90s Seattle grunge style leaning against brick wall, both facing camera with cool disaffected expressions, man in oversized red flannel shirt over band tee and ripped baggy jeans with combat boots and messy chin-length hair, woman in black slip dress over thermal undershirt with Doc Martens and choker necklace and smudged eyeliner, urban alley with weathered brick wall and band posters and moody overcast sky",
      "moody desaturated lighting with cool gray tones and gritty urban atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "rock their own rhythm",
      "Raw, real, and unfiltered. Their love is the anthem of a generation.",
    ),
  },
];
