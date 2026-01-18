import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const CASINO_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.HIGH_ROLLER_ROULETTE,
    title: "The High Roller",
    description: "All on red",
    icon: "🎰",
    imageUrl:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple at exclusive high-stakes roulette table in glamorous Monaco casino, exchanging intense daring glances with confident smiles, man in perfectly tailored black wool tuxedo with satin lapels and silver cufflinks placing chips on red, woman in shimmering champagne gold sequined evening gown with diamond drop earrings and platinum bracelet, polished mahogany roulette wheel with ivory ball spinning, other elegantly dressed high rollers watching intently in background",
      "warm luxurious golden ambient lighting from crystal chandeliers with dramatic shadows on green felt table"
    ),
    storyTemplate: createStoryTemplate(
      "play the ultimate game of chance and charm",
      "They aren't just gambling on the wheel; they're betting on each other. And with a bond like theirs, they always come out on top.",
    ),
  },
  {
    id: ScenarioId.MARTINI_POWER_COUPLE,
    title: "Martini Secrets",
    description: "Shaken, not stirred",
    icon: "🍸",
    imageUrl:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple at sleek marble bar in luxury casino lounge, both facing camera with mysterious alluring half-smiles, man in midnight blue dinner jacket with black satin bowtie holding crystal martini glass with olive, woman in form-fitting black velvet dress with plunging back and diamond stud earrings holding martini, polished black marble bar top with gold accents and mirrored shelves of premium spirits in background",
      "sophisticated low amber lighting with subtle blue accent lights reflecting off glassware"
    ),
    storyTemplate: createStoryTemplate(
      "share a secret in the heart of high society",
      "In a world of glamour and intrigue, they are the most interesting pair in the room. Cool, collected, and completely devoted.",
    ),
  },
  {
    id: ScenarioId.CASINO_HEIST_ESCAPE,
    title: "The Great Escape",
    description: "Winners take all",
    icon: "🏎️",
    imageUrl:
      "https://images.unsplash.com/photo-1540324155974-7523202daa3f?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple making stylish exit from grand casino at night, man in black tuxedo carrying polished aluminum briefcase with confident stride, woman in red satin gown with thigh-high slit looking over shoulder at camera with triumphant knowing smile, ornate casino entrance with brass revolving doors and red carpet, valet parking with black Aston Martin and red Ferrari visible in background",
      "dramatic cinematic night lighting with warm golden casino glow contrasting cool blue street lights"
    ),
    storyTemplate: createStoryTemplate(
      "pull off the most stylish heist of the century",
      "They came, they saw, and they won. Not just the chips, but a life of thrill that only a duo like them could handle.",
    ),
  },
];
