import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const SUPERHERO_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.HEROIC_DUO,
    title: "The Heroic Duo",
    description: "Guardians of the city",
    icon: "🦸",
    imageUrl:
      "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple as superhero duo standing on skyscraper ledge at night, both facing camera with heroic determined expressions, man in sleek dark armored suit with glowing emblem, woman in high-tech red and gold suit with flowing cape, capes billowing in wind, city skyline with spotlight beams in background",
      "dramatic nighttime lighting with city glow and epic cinematic atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "protect the city together",
      "They aren't just heroes to the city; they are each other's greatest strength and ultimate sanctuary.",
    ),
  },
  {
    id: ScenarioId.SECRET_HIDEOUT,
    title: "Secret Hideout",
    description: "Where heroes relax",
    icon: "🏢",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple in high-tech superhero base, both facing camera with relaxed comfortable smiles, superhero suits half-removed revealing casual clothes underneath, surrounded by floating holographic screens and advanced gadgetry, sleek underground cave with dramatic lighting in background",
      "soft blue tech lighting with intimate powerful atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "find peace behind the masks",
      "In the quiet moments between saving the world, they find that the real hero work is the love they share.",
    ),
  },
  {
    id: ScenarioId.GALACTIC_PROTECTORS,
    title: "Galactic Protectors",
    description: "Defenders of the universe",
    icon: "🌌",
    imageUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple as space-faring superheroes floating above alien planet, both facing camera with adventurous confident expressions, wearing glowing energy suits that pulse with cosmic power, hands radiating energy, purple alien landscape with twin moons and distant galaxies in background",
      "ethereal cosmic lighting with purple and blue energy glow"
    ),
    storyTemplate: createStoryTemplate(
      "guard the furthest reaches of space",
      "Across light-years and galaxies, they are a constant, a binary star shining brighter together than apart.",
    ),
  },
  {
    id: ScenarioId.STREET_VIGILANTES,
    title: "Street Vigilantes",
    description: "Justice in the shadows",
    icon: "🌃",
    imageUrl:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple as street-level vigilantes in rainy city alley at night, both facing camera with gritty focused expressions, wearing tactical black leather gear with domino masks, holding batons and grappling hooks, steam rising from grates and neon signs reflecting in rain puddles in background",
      "moody cinematic rain lighting with neon reflections and noir atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "fight for justice in the shadows",
      "No superpowers needed - just skill, courage, and a bond that's tougher than the city's roughest streets.",
    ),
  },
];
