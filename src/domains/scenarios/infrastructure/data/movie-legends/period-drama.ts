/**
 * Period Drama Movie Legends
 * Classic and period film moments
 */

import { Scenario, ScenarioId } from "../../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../../utils/scenario-utils";

export const PERIOD_DRAMA_MOVIE_SCENARIOS: Omit<Scenario, "outputType" | "category">[] = [
  {
    id: ScenarioId.GATSBY_CHEERS,
    title: "The Gatsby Toast",
    description: "Old Sport!",
    icon: "🥂",
    imageUrl: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?w=800",
    inputType: "dual",
    aiPrompt: createPhotorealisticPrompt(
      "a couple as grand Gatsby party hosts in 1920s mansion, both facing camera with charismatic knowing smiles raising crystal champagne coupes, woman in extravagant gold sequined flapper dress with feathered headpiece and long pearls, man in impeccable white dinner jacket with slicked hair, spectacular fireworks and glamorous party guests and art deco mansion in background",
      "lavish golden party lighting with firework sparkle and champagne glow",
    ),
    storyTemplate: createStoryTemplate(
      "host the most legendary party of the century",
      "A little party never killed nobody, especially when you're celebrating a love as bright as the green light across the bay.",
    ),
  },
  {
    id: ScenarioId.PRIDE_PREJUDICE_WALK,
    title: "Dawn of Love",
    description: "A walk at sunrise",
    icon: "🚶‍♂️",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
    inputType: "dual",
    aiPrompt: createPhotorealisticPrompt(
      "a couple walking toward each other through misty English field at dawn recreating Pride and Prejudice, man in long dark greatcoat with windswept hair, woman in flowing white nightdress with wool shawl, meeting as golden sun rises behind them casting long shadows through morning mist",
      "magical golden dawn light with atmospheric mist and romantic haze",
    ),
    storyTemplate: createStoryTemplate(
      "find their way to each other through the mist",
      "No more pride, no more prejudice. Just two hearts seeing each other clearly for the first time as a new day begins.",
    ),
  },
  {
    id: ScenarioId.CASABLANCA_FAREWELL,
    title: "Casablanca Farewell",
    description: "Here's looking at you, kid",
    icon: "🛫",
    imageUrl: "https://images.unsplash.com/photo-1485686531765-ba63b07845a7?w=800",
    inputType: "dual",
    aiPrompt: createPhotorealisticPrompt(
      "a couple recreating Casablanca airport farewell at night, both facing camera with dramatic emotional expressions of bittersweet goodbye, man in tan trench coat and fedora, woman in elegant suit and wide-brimmed hat with tears in eyes, 1940s propeller plane and swirling fog on tarmac in background, high-contrast black and white film style",
      "dramatic noir lighting with fog and high-contrast black and white aesthetic",
    ),
    storyTemplate: createStoryTemplate(
      "share one last unforgettable look",
      "We'll always have Paris. In a world of chaos, their love is the one thing that will never change, no matter where they go.",
    ),
  },
];
