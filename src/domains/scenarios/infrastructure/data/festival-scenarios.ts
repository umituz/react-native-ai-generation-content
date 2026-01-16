/**
 * Festival Scenarios
 * Scenarios focused on global celebrations and festivals
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const FESTIVAL_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.CARNIVAL,
    title: "Rio Carnival",
    description: "Samba & colors",
    icon: "🎭",
    imageUrl:
      "https://v3b.fal.media/files/b/0a8a56ac/HBTcasxSLgg1E_euqmZY-.jpg",
    previewImageUrl:
      "https://images.unsplash.com/photo-1659700547307-6db624dc0cb4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmlvJTIwY2Fybml2YWx8ZW58MHx8MHx8fDA%3D",
    aiPrompt:
      "A couple at Rio Carnival, both looking at the camera with joyful excited smiles, dressed in vibrant colorful feather costumes, glitter makeup, night-time sambadrome with explosive colors and energy in background, joyous and vibrant",
    storyTemplate: createStoryTemplate(
      "dance to the rhythm of Rio",
      "In the explosion of colors and drums, they only see the rhythm of each other's souls.",
    ),
  },
  {
    id: ScenarioId.MUSIC_FESTIVAL,
    title: "Festival Vibes",
    description: "Boho music dreams",
    icon: "🎡",
    imageUrl:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=60",
    aiPrompt:
      "A couple at a music festival, both looking at the camera with carefree smiles, dressed in boho chic fashion with flower crowns, sun-kissed glow, desert sunset with ferris wheel and festival lights in background, carefree and dreamy",
    storyTemplate: createStoryTemplate(
      "feel the beat of the festival",
      "Under the desert sun and festival lights, their love is the headlining act.",
    ),
  },
  {
    id: ScenarioId.HALLOWEEN,
    title: "Spooky Night",
    description: "Trick or treat love",
    icon: "🎃",
    imageUrl:
      "https://images.unsplash.com/photo-1508361001413-7a9dca21d08a?w=800&auto=format&fit=crop&q=60",
    aiPrompt:
      "A couple at a Halloween party, both looking at the camera with mysterious expressions, dressed in elegant gothic vampire costumes, dramatic makeup, foggy haunted mansion with jack-o-lanterns in background, spooky and mysterious",
    storyTemplate: createStoryTemplate(
      "embrace the magic of the night",
      "In a night of spirits and shadows, their love is the spell that can never be broken.",
    ),
  },
];
