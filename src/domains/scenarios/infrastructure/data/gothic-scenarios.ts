import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const GOTHIC_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.VAMPIRE_ROYALTY,
    title: "Vampire Royalty",
    description: "Eternal elegance",
    icon: "🧛",
    imageUrl:
      "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple as aristocratic vampire royalty in moonlit Gothic manor, both facing camera with alluring intense gazes and subtle fang hints, pale luminous skin, man in black velvet Victorian frock coat with crimson brocade waistcoat and silver cravat pin holding crystal goblet of deep red wine, woman in dramatic black and burgundy lace Victorian gown with high collar and cameo brooch and blood-red lipstick, roaring grand stone fireplace and ancestral portraits and wrought iron candelabras in dark manor hall in background",
      "dramatic moonlight through tall windows with warm firelight creating deep shadows and pale highlights on skin"
    ),
    storyTemplate: createStoryTemplate(
      "live eternally in the shadows",
      "Time means nothing when you have forever. An eternal bond that transcends mortal life.",
    ),
  },
  {
    id: ScenarioId.WEREWOLF_PACK,
    title: "Werewolf Alphas",
    description: "Strength of the pack",
    icon: "🐺",
    imageUrl:
      "https://v3b.fal.media/files/b/0a89bbdb/Q_t0NaB59_MYmsvn86VsC.jpg",
    aiPrompt: createPhotorealisticPrompt(
      "a couple as powerful werewolf pack alphas in primeval forest, both facing camera with fierce protective expressions and subtly glowing amber eyes, man in weathered dark leather vest over bare chest with tribal scars and wild windswept hair, woman in rugged fur-trimmed leather corset and arm bracers with untamed flowing hair, swirling silver mist and massive luminous full moon rising through ancient twisted trees in background",
      "dramatic moonlight with cool silver tones and amber glow from eyes creating supernatural atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "lead the wild pack",
      "Wild and untamed, they find their true strength in the primal connection they share under the moon.",
    ),
  },
  {
    id: ScenarioId.VICTORIAN_GHOSTS,
    title: "Victorian Echoes",
    description: "Hauntingly beautiful",
    icon: "👻",
    imageUrl:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple as elegant ethereal Victorian ghosts in abandoned manor library, both facing camera with gentle melancholic smiles showing peaceful acceptance, subtly translucent shimmering appearance with soft glow, man in ornate 19th-century tailcoat with ascot and pocket watch chain, woman in elaborate cream lace mourning gown with pearl jewelry, golden dust motes dancing in pale shafts of sunlight through tall dusty windows and leather-bound books on dark wood shelves in background",
      "soft ethereal lighting with pale golden sunbeams and ghostly luminescence on translucent figures"
    ),
    storyTemplate: createStoryTemplate(
      "linger in the halls of history",
      "Even death couldn't separate them. A love that still echoes through the corridors of time.",
    ),
  },
  {
    id: ScenarioId.GOTHIC_CATHEDRAL,
    title: "Gothic Sanctuary",
    description: "Dark architectural beauty",
    icon: "⛪",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple standing in vast Gothic cathedral nave, both facing camera with serene contemplative expressions, man in long black wool overcoat with silver cross pendant, woman in flowing black velvet coat with ornate silver jewelry and dark veil, towering pointed stone arches and soaring ribbed vaults and magnificent rose window with deep jewel-colored stained glass casting colored light patterns on stone floor in background",
      "dramatic cathedral lighting with colored light from stained glass and long mysterious shadows on stone"
    ),
    storyTemplate: createStoryTemplate(
      "find peace in the high vaults",
      "Surrounded by the grandeur of stone and glass, they find a sanctuary for their dark and beautiful love.",
    ),
  },
];
