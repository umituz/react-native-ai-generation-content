import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const SUPERHERO_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.HEROIC_DUO,
    title: "The Heroic Duo",
    description: "Guardians of the city",
    icon: "🦸",
    imageUrl:
      "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=800",
    aiPrompt:
      "A couple as a superhero duo standing on a skyscraper ledge, both looking at the camera with heroic determination, wearing high-tech sleek armored suits with unique emblems, capes blowing in the wind, city skyline at night with spotlight beams in background, powerful and epic",
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
    aiPrompt:
      "A couple in their high-tech superhero base, both looking at the camera with relaxed smiles, half-removed superhero suits revealing civilian clothes, surrounded by holographic screens and advanced gadgetry, underground cave or high-rise high-tech apartment, intimate and powerful",
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
    aiPrompt:
      "A couple as space-faring superheroes on an alien planet, both looking at the camera with adventurous expressions, wearing glowing energy-suits, floating above a purple alien landscape with two moons in background, cosmic energy radiating from hands, epic and sci-fi",
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
    aiPrompt:
      "A couple as street-level vigilantes in a rainy city alley, both looking at the camera with gritty focused expressions, wearing tactical leather gear and masks, holding batons or grappling hooks, steam rising from grates and neon signs reflecting in puddles in background, authentic and cinematic",
    storyTemplate: createStoryTemplate(
      "fight for justice in the shadows",
      "No superpowers needed - just skill, courage, and a bond that's tougher than the city's roughest streets.",
    ),
  },
];
