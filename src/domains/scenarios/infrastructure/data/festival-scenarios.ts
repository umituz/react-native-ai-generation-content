/**
 * Festival Scenarios
 * Scenarios focused on global celebrations and festivals
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

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
    aiPrompt: createPhotorealisticPrompt(
      "a couple at Rio Carnival parade, both facing camera with joyful ecstatic smiles mid-dance, man in elaborate gold and emerald green feathered headpiece and sequined vest showing athletic physique, woman in stunning magenta and turquoise sequined bikini costume with massive peacock feather backpiece and rhinestone body jewelry and glitter makeup, nighttime Sambadrome with thousands of dancers and colorful floats and confetti explosion in background",
      "vibrant nighttime festival lighting with colorful spotlights and golden warm glow on skin"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple at Coachella-style music festival, both facing camera with carefree blissful smiles and golden sun-kissed skin, man in unbuttoned linen shirt and round sunglasses with leather bracelets, woman in flowing white crochet crop top and high-waisted denim shorts with fresh wildflower crown and layered boho necklaces, desert landscape at golden hour with giant illuminated ferris wheel and colorful festival tents and stage lights in background",
      "warm golden hour desert light with soft orange and pink sunset tones and magical backlit dust particles"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple at elegant Halloween masquerade party, both facing camera with mysterious seductive expressions, man in aristocratic black Victorian suit with blood-red cravat and ornate silver vampire mask with fangs and slicked back hair, woman in dramatic black lace and burgundy velvet corset gown with elaborate venetian mask and deep red lips and pale theatrical makeup, misty Gothic mansion entrance with carved jack-o-lanterns lining steps and bare twisted trees in background",
      "eerie atmospheric lighting with cool blue moonlight and warm orange glow from jack-o-lanterns"
    ),
    storyTemplate: createStoryTemplate(
      "embrace the magic of the night",
      "In a night of spirits and shadows, their love is the spell that can never be broken.",
    ),
  },
];
