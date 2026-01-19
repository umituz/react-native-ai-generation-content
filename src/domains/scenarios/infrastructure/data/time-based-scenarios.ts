/**
 * Time-Based Scenarios
 * Scenarios focused on future time periods
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const TIME_BASED_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.FIVE_YEARS,
    title: "5 Years Ahead",
    description: "See your beautiful near future",
    icon: "🗓️",
    imageUrl:
      "https://media.istockphoto.com/id/1438587977/photo/happy-tourists-couple-friends-sightseeing-city-with-map-together-travel-people-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=vXMmKG7buuS7MMKUt3oUeZwlEJoeO67GQ27M8xbKs8g=",
    aiPrompt: createPhotorealisticPrompt(
      "a couple 5 years in the future, both facing camera with mature happy confident smiles showing subtle signs of maturity, man in upgraded stylish casual blazer, woman in elegant casual-chic dress, vibrant modern cityscape with contemporary architecture in background",
      "bright natural daylight with warm optimistic atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "celebrate five wonderful years together",
      "They've grown stronger as a couple, building a life filled with shared dreams and beautiful memories.",
    ),
  },
  {
    id: ScenarioId.TEN_YEARS,
    title: "10 Years Ahead",
    description: "A glorious decade together",
    icon: "🏡",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1711226109825-4bfa1df2c368?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y291cGxlJTIwMTAlMjB5ZWFyc3xlbnwwfHwwfHx8MA%3D%3D",
    aiPrompt: createPhotorealisticPrompt(
      "a couple 10 years in the future, both facing camera with confident established smiles showing distinct signs of graceful maturity, man in sophisticated tailored clothing, woman in elegant refined attire, beautiful home garden with manicured landscaping or luxury environment in background",
      "warm golden hour lighting with established comfortable atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "mark a beautiful decade of partnership",
      "Ten years of love, laughter, and growth have made their bond unbreakable. They look forward to many more adventures ahead.",
    ),
  },
];
