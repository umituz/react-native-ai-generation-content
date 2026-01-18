import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const ELEMENTAL_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.FIRE_ICE_DYNAMIC,
    title: "Fire & Ice",
    description: "Elemental opposites",
    icon: "🔥",
    imageUrl:
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple with elemental powers standing back-to-back, man commanding swirling vortex of intense orange and red flames with ember particles rising from his outstretched hand wearing charcoal and crimson flame-patterned robes with glowing orange runes on forearms, woman controlling spiral of shimmering cyan ice crystals and snowflakes wearing silver and arctic blue frost-patterned gown with glowing blue runic tattoos on shoulders, both facing camera with powerful confident gazes, dramatic volcanic obsidian landscape meeting glacial ice shelf with snow falling through rising ash in background",
      "dramatic contrasting lighting with warm orange fire glow and cool cyan ice luminescence meeting in center"
    ),
    storyTemplate: createStoryTemplate(
      "balance the extreme forces of nature with your shared power",
      "They are the perfect harmony of opposites. Like fire and ice, their love creates a world where anything is possible.",
    ),
  },
  {
    id: ScenarioId.EARTH_SHAPER_STRENGTH,
    title: "Earth Shapers",
    description: "Solid as a rock",
    icon: "⛰️",
    imageUrl:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple with earth-shaping powers on dramatic cliffside, hands glowing with golden amber light as massive granite boulders float and orbit around them defying gravity, man in rugged sienna and brown layered robes with bronze leather armor pauldrons and bracers with stone texture, woman in terracotta and olive earth-toned flowing garments with copper jewelry embedded with raw crystals, both facing horizon with determined powerful expressions, vast red rock canyon with layered sedimentary cliffs stretching to distant mountains in background",
      "warm golden hour sunlight with amber glow emanating from floating rocks and dust particles in air"
    ),
    storyTemplate: createStoryTemplate(
      "found your life on the unshakeable strength of the earth",
      "Their connection is as deep as the roots of the world. Together, they can move mountains and build a future that stands for eternity.",
    ),
  },
  {
    id: ScenarioId.STORM_BRINGER_POWER,
    title: "Storm Bringers",
    description: "Lightning in your veins",
    icon: "⚡",
    imageUrl:
      "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple with storm powers on windswept mountain peak at night, man raising crackling hand as massive lightning bolt strikes directly behind him with electric arcs jumping between fingers wearing deep purple and silver storm-weathered cloak, woman with eyes glowing intense electric blue and hair floating with static electricity wearing midnight blue and white flowing dress rippling violently in wind, both facing camera with fierce exhilarated smiles, dramatic dark sky with swirling purple and charcoal thunderclouds and multiple lightning strikes in background",
      "dramatic electrical lighting with bright white lightning flashes and purple atmospheric glow and cyan electricity arcs"
    ),
    storyTemplate: createStoryTemplate(
      "ride the storm and command the lightning together",
      "They don't fear the storm; they are the storm. A love that's as electric and unstoppable as a bolt from the heavens.",
    ),
  },
];
