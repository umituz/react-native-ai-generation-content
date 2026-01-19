/**
 * Historical Scenarios
 * Scenarios focused on different historical eras
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const HISTORICAL_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.ROARING_20S,
    title: "Roaring 20s",
    description: "Jazz age glamour",
    icon: "🎷",
    imageUrl:
      "https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a couple at glamorous 1920s speakeasy party, both facing camera with joyful vivacious expressions, man in crisp black tuxedo with white waistcoat and slicked-back hair holding champagne coupe, woman in shimmering gold beaded flapper dress with fringe and feather headband and long pearl necklace and finger waves hairstyle, opulent art deco ballroom with geometric gold patterns and live jazz band and champagne tower and dancing couples in background",
      "warm golden glamorous lighting with art deco sparkle and smoky jazz club atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "dance through the Jazz Age",
      "In a swirl of gold dust and jazz, they find a love that outshines the brightest party.",
    ),
  },
  {
    id: ScenarioId.VICTORIAN,
    title: "Victorian Romance",
    description: "Elegant royal love",
    icon: "👑",
    imageUrl:
      "https://images.unsplash.com/photo-1460518451285-97b6aa326961?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a couple in Victorian English garden, both facing camera with elegant romantic expressions showing refined emotion, man in charcoal morning coat with gray waistcoat and cravat and top hat held at side, woman in exquisite ivory lace ballgown with full bustle and parasol and pearl drop earrings, lush manicured English garden with climbing roses on white iron gazebo and stone fountain in background",
      "soft romantic afternoon light filtering through trees with warm golden highlights"
    ),
    storyTemplate: createStoryTemplate(
      "promenade through a royal romance",
      "Amidst whispers and waltzes, their hearts beat in a rhythm only they can hear.",
    ),
  },
  {
    id: ScenarioId.WILD_WEST,
    title: "Wild West",
    description: "Frontier adventures",
    icon: "🤠",
    imageUrl:
      "https://images.unsplash.com/photo-1635857770451-71634ff4f384?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHdpbGQlMjB3ZXN0fGVufDB8fDB8fHww",
    aiPrompt: createPhotorealisticPrompt(
      "a couple as Wild West ranch hands on horseback, both facing camera with rugged confident smiles and sun-weathered tanned faces, man in worn brown leather vest over chambray work shirt and cowboy hat and bandana with lasso coiled at saddle on palomino horse, woman in fitted denim shirt and leather chaps and dusty cowboy hat on paint horse, vast golden prairie with longhorn cattle herd and dramatic big sky with towering cumulus clouds in background",
      "warm golden hour western light with dust particles and dramatic sky"
    ),
    storyTemplate: createStoryTemplate(
      "ride into the sunset together",
      "On the open frontier, they found a home in the untamed wilderness of their hearts.",
    ),
  },
  {
    id: ScenarioId.VIKING,
    title: "Viking Legends",
    description: "Warrior spirit",
    icon: "⚔️",
    imageUrl:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a couple as legendary Viking warriors, both facing camera with fierce proud expressions, man in authentic leather and chainmail armor with fur cloak and braided beard and Norse rune tattoos holding battle axe, woman in leather armor with metal accents and braided warrior hair with bone beads and shield on back, dramatic Norwegian fjord with steep cliffs and swirling mist and longship with carved dragon prow on dark water in background",
      "dramatic overcast Nordic light with moody atmosphere and mist in fjord valley"
    ),
    storyTemplate: createStoryTemplate(
      "forge a legend in the north",
      "Bound by honor and heart, their saga will be sung for generations to come.",
    ),
  },
];
