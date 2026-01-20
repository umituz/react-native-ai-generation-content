/**
 * Solo Mythology Scenarios
 * Single-person mythological portraits
 */

import { Scenario, ScenarioId, ScenarioCategory } from "../../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../../utils/scenario-utils";

export const SOLO_MYTHOLOGY_SCENARIOS: Scenario[] = [
  {
    id: ScenarioId.SOLO_GREEK_GOD,
    category: ScenarioCategory.SOLO_MYTHOLOGY,
    title: "Greek God",
    description: "Olympian deity",
    icon: "⚡",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a powerful Greek god on Mount Olympus, person wearing flowing white toga and golden laurel crown, majestic commanding expression looking at camera, marble columns clouds and lightning in background",
      "divine golden lighting with heavenly clouds and epic atmosphere"
    ),
    storyTemplate: createStoryTemplate("rule from Olympus", "A god among mortals."),
  },
  {
    id: ScenarioId.SOLO_NORSE_VIKING,
    category: ScenarioCategory.SOLO_MYTHOLOGY,
    title: "Norse Viking",
    description: "Legendary warrior",
    icon: "🪓",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a fierce Viking warrior on dramatic fjord cliff, person wearing fur armor and horned helmet holding battle axe, fierce battle-ready expression looking at camera, longship and stormy northern sea in background",
      "dramatic stormy lighting with cold nordic atmosphere"
    ),
    storyTemplate: createStoryTemplate("sail to Valhalla", "A warrior worthy of legend."),
  },
  {
    id: ScenarioId.SOLO_EGYPTIAN_PHARAOH,
    category: ScenarioCategory.SOLO_MYTHOLOGY,
    title: "Egyptian Pharaoh",
    description: "Divine ruler",
    icon: "👁️",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a majestic Egyptian pharaoh in golden throne room, person wearing ornate headdress and royal regalia with cobra crown, powerful divine expression looking at camera, hieroglyphics and pyramids visible through window",
      "warm golden lighting with dust particles and ancient Egyptian atmosphere"
    ),
    storyTemplate: createStoryTemplate("command the empire", "Living god of the Nile."),
  },
  {
    id: ScenarioId.SOLO_CELTIC_DRUID,
    category: ScenarioCategory.SOLO_MYTHOLOGY,
    title: "Celtic Druid",
    description: "Ancient mystic",
    icon: "🌿",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a wise Celtic druid at ancient stone circle, person wearing hooded robes with oak leaf crown holding wooden staff, mystical knowing expression looking at camera, Stonehenge-like stones and misty forest in background",
      "mystical fog lighting with ethereal green and gold tones"
    ),
    storyTemplate: createStoryTemplate("commune with nature", "Keeper of ancient wisdom."),
  },
  {
    id: ScenarioId.SOLO_JAPANESE_SPIRIT,
    category: ScenarioCategory.SOLO_MYTHOLOGY,
    title: "Japanese Spirit",
    description: "Mystical yokai",
    icon: "🏯",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a mystical Japanese spirit in ancient shrine, person wearing elaborate traditional kimono with ethereal glow, serene otherworldly expression looking at camera, torii gates floating lanterns and cherry blossoms in background",
      "soft magical lighting with floating particles and spiritual atmosphere"
    ),
    storyTemplate: createStoryTemplate("bridge two worlds", "A spirit of eternal beauty."),
  },
];
