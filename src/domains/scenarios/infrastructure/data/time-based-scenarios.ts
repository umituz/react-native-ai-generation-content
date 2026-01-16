/**
 * Time-Based Scenarios
 * Scenarios focused on future time periods
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const TIME_BASED_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.FIVE_YEARS,
    title: "5 Years Ahead",
    description: "See your beautiful near future",
    icon: "🗓️",
    imageUrl:
      "https://media.istockphoto.com/id/1438587977/photo/happy-tourists-couple-friends-sightseeing-city-with-map-together-travel-people-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=vXMmKG7buuS7MMKUt3oUeZwlEJoeO67GQ27M8xbKs8g=",
    aiPrompt:
      "A couple 5 years in the future, both looking at the camera with mature happy smiles, subtle maturity, dressed in upgraded stylish casual-chic attire, vibrant modern cityscape or upscale lifestyle setting in background, photorealistic",
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
    aiPrompt:
      "A couple 10 years in the future, both looking at the camera with confident established smiles, distinct signs of maturity, dressed in sophisticated clothing, warm golden hour lighting in beautiful home garden or luxury environment, hyper-realistic",
    storyTemplate: createStoryTemplate(
      "mark a beautiful decade of partnership",
      "Ten years of love, laughter, and growth have made their bond unbreakable. They look forward to many more adventures ahead.",
    ),
  },
];
