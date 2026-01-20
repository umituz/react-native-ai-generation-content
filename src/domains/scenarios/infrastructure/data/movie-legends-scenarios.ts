import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const MOVIE_LEGENDS_SCENARIOS: Omit<Scenario, "outputType" | "category">[] = [
  {
    id: ScenarioId.TITANIC_BOW,
    title: "Titanic Bow",
    description: "I'm flying, Jack!",
    icon: "🚢",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
    inputType: "dual",
    aiPrompt: createPhotorealisticPrompt(
      "a couple recreating iconic Titanic bow pose on grand ocean liner, man in period suspenders and white shirt holding woman from behind, woman with arms outstretched in flowing Edwardian dress with windswept hair, both facing camera with blissful romantic smiles, dramatic orange and pink sunset reflecting on endless ocean in background",
      "warm golden sunset backlighting with ocean spray and wind effect",
    ),
    storyTemplate: createStoryTemplate(
      "recreate the most romantic moment in cinema history",
      "With the wind in their hair and the sunset on their faces, they feel like they're flying. A love that's as vast and deep as the ocean.",
    ),
  },
  {
    id: ScenarioId.SMITH_BACK_TO_BACK,
    title: "Action Power Couple",
    description: "Back to back, guns ready",
    icon: "🔫",
    imageUrl: "https://images.unsplash.com/photo-1540324155974-7523202daa3f?w=800",
    inputType: "dual",
    aiPrompt: createPhotorealisticPrompt(
      "a couple as action movie spies standing back-to-back, both facing camera with fierce confident expressions, man in tailored black suit with tactical vest, woman in sleek black dress with thigh holster, modern glass architecture with orange sunset light streaming through in background",
      "dramatic cinematic lighting with warm orange tones and sharp shadows",
    ),
    storyTemplate: createStoryTemplate(
      "step into the shoes of the ultimate power duo",
      "They've got each other's backs, always. Together, they're an unstoppable force that even Hollywood couldn't script.",
    ),
  },
  {
    id: ScenarioId.PULP_FICTION_DANCE,
    title: "Twist Contest",
    description: "Classic 50s diner dance",
    icon: "💃",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    inputType: "dual",
    aiPrompt: createPhotorealisticPrompt(
      "a couple recreating Pulp Fiction twist contest in retro 50s diner, both facing camera with cool deadpan expressions doing classic hand-over-eyes dance move, man in thin black suit and bolo tie, woman in crisp white shirt and slim black pants with sleek dark bob haircut, red vinyl booths and checkered floor and glowing neon signs in background",
      "warm retro diner lighting with neon glow and vintage atmosphere",
    ),
    storyTemplate: createStoryTemplate(
      "ignite the dance floor with iconic moves",
      "They don't follow the rhythm; they create it. A cool, effortless connection that defines an entire era of cool.",
    ),
  },
  {
    id: ScenarioId.LA_LA_LAND_DANCE,
    title: "City of Stars",
    description: "Dancing under the twilight",
    icon: "✨",
    imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
    inputType: "dual",
    aiPrompt: createPhotorealisticPrompt(
      "a couple dancing on hilltop overlooking Los Angeles at magic hour, recreating La La Land bench scene, woman in flowing bright yellow sundress with skirt twirling, man in white button-down and slim navy tie, purple and orange gradient sunset sky with twinkling city lights of LA sprawling below in background",
      "magical twilight lighting with warm golden and cool purple tones",
    ),
    storyTemplate: createStoryTemplate(
      "dance through a dreamscape of stars",
      "In a city of millions, they found the only person who knows the melody of their heart. A love story written in the stars.",
    ),
  },
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
    id: ScenarioId.ROMEO_AQUARIUM,
    title: "Aquarium Glance",
    description: "Love at first sight",
    icon: "🐠",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800",
    inputType: "dual",
    aiPrompt: createPhotorealisticPrompt(
      "a couple gazing at each other through large aquarium tank, both visible through glass with mesmerized love-struck expressions, man in 90s silk shirt and chain, woman in sparkly party dress with 90s makeup, colorful tropical fish and blue water creating dreamy barrier between them, soft ethereal aquarium lighting",
      "soft blue aquarium glow with dreamy underwater light ripples",
    ),
    storyTemplate: createStoryTemplate(
      "relive the moment of first sight",
      "Through the glass and the water, the world blurred away until there was only 'us'. A connection so instant it felt like destiny.",
    ),
  },
  {
    id: ScenarioId.NOTEBOOK_RAIN,
    title: "The Rain Kiss",
    description: "It wasn't over!",
    icon: "🌧️",
    imageUrl: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800",
    inputType: "dual",
    aiPrompt: createPhotorealisticPrompt(
      "a couple in passionate embrace during heavy rainstorm recreating The Notebook, both facing camera with intense emotional smiles showing happy tears mixing with rain, completely soaked with clinging wet clothing, man in drenched white t-shirt woman in rain-soaked summer dress, rustic wooden dock and misty lake with moody gray sky in background",
      "dramatic stormy lighting with rain streaks and emotional atmosphere",
    ),
    storyTemplate: createStoryTemplate(
      "promise to never let go",
      "Let the rain fall; they have everything they need right here. A love that survives every storm and only grows stronger with time.",
    ),
  },
  {
    id: ScenarioId.GHOST_POTTERY,
    title: "Pottery Romance",
    description: "Unchained melody",
    icon: "🏺",
    imageUrl: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800",
    inputType: "dual",
    aiPrompt: createPhotorealisticPrompt(
      "a couple at pottery wheel recreating Ghost scene, man sitting behind woman with his hands gently over hers shaping wet terracotta clay, both facing camera with intimate tender smiles, clay-covered fingers intertwined on spinning vase, soft warm indoor lighting from nearby lamp, rustic pottery studio with shelves of finished ceramics in background",
      "warm intimate golden lamp light with soft romantic atmosphere",
    ),
    storyTemplate: createStoryTemplate(
      "share a moment of artistic connection",
      "In the soft clay and the gentle music, they find a connection that transcends time. A love that's truly unchained.",
    ),
  },
  {
    id: ScenarioId.SPIDERMAN_KISS,
    title: "Upside-Down Kiss",
    description: "Hero in the rain",
    icon: "🕷️",
    imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
    inputType: "dual",
    aiPrompt: createPhotorealisticPrompt(
      "a couple recreating iconic Spider-Man upside-down kiss in rainy alley, man hanging inverted from fire escape with mask pulled up to nose, woman reaching up to kiss him, both with loving expressions from unique angles, heavy rain pouring down in dark city alley with neon signs reflecting on wet pavement in background",
      "dramatic nighttime rain lighting with neon reflections and cinematic atmosphere",
    ),
    storyTemplate: createStoryTemplate(
      "reveal their secret hero love",
      "Even in the rain and the shadows, her love is the anchor that brings him home. A kiss that defined a generation of heroes.",
    ),
  },
  {
    id: ScenarioId.DIRTY_DANCING_LIFT,
    title: "The Time of My Life",
    description: "That legendary lift",
    icon: "🕺",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    inputType: "dual",
    aiPrompt: createPhotorealisticPrompt(
      "a couple recreating iconic Dirty Dancing lift, man with strong arms holding woman high above his head, woman with gracefully arched back and arms spread wide in triumph, both facing camera with ecstatic joyful smiles, 1980s resort ballroom with cheering audience and string lights and stage in background",
      "warm spotlight with 80s golden glow and crowd excitement",
    ),
    storyTemplate: createStoryTemplate(
      "have the time of their lives",
      "Trust, balance, and pure joy. In this lift, they're soaring high, proving that with each other, they can reach any height.",
    ),
  },
  {
    id: ScenarioId.PRETTY_WOMAN_BALCONY,
    title: "Modern Fairytale",
    description: "Rescue on the fire escape",
    icon: "🏢",
    imageUrl: "https://images.unsplash.com/photo-1540324155974-7523202daa3f?w=800",
    inputType: "dual",
    aiPrompt: createPhotorealisticPrompt(
      "a couple recreating Pretty Woman fire escape scene, man climbing rusty iron ladder with red rose in mouth and charming grin, woman in silk robe leaning over balcony railing looking down with amazed ecstatic smile, both facing camera, urban LA sunset with palm trees and city buildings in background",
      "warm golden sunset backlighting with romantic urban glow",
    ),
    storyTemplate: createStoryTemplate(
      "write their own modern fairytale",
      "He climbed the tower to rescue her, and she rescued him right back. A love that changed everything they knew about the world.",
    ),
  },
  {
    id: ScenarioId.TWILIGHT_MEADOW,
    title: "The Meadow",
    description: "A thousand years",
    icon: "🌲",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    inputType: "dual",
    aiPrompt: createPhotorealisticPrompt(
      "a couple lying in lush meadow of purple and yellow wildflowers, heads together hair fanned out, both facing camera with intense devoted smiles, man in casual henley woman in simple cotton dress, golden sunlight filtering through ancient pine forest creating god rays in background",
      "soft dreamy golden hour light with ethereal forest atmosphere",
    ),
    storyTemplate: createStoryTemplate(
      "promise a lifetime of devotion",
      "In the quiet of the meadow, they promised to never leave each other. A love that feels like it's lasted a thousand years.",
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
