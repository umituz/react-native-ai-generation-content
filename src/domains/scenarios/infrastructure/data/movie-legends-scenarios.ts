import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const MOVIE_LEGENDS_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.TITANIC_BOW,
    title: "Titanic Bow",
    description: "I'm flying, Jack!",
    icon: "🚢",
    imageUrl:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
    aiPrompt:
      "A couple recreating the iconic Titanic pose at the bow of a grand ship, man holding woman from behind with her arms outstretched, both looking at the camera with blissful romantic smiles, wearing elegant 1910s period clothing, orange sunset ocean horizon in background, cinematic and legendary",
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
    imageUrl:
      "https://images.unsplash.com/photo-1540324155974-7523202daa3f?w=800",
    aiPrompt:
      "A couple standing back-to-back in an iconic action movie pose, both looking at the camera with fierce confident expressions, dressed in sleek black tactical formal wear, holding silver props, sophisticated modern architecture and orange-tinted lighting in background, sleek and powerful",
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
    aiPrompt:
      "A couple recreating the iconic Pulp Fiction dance scene in a 50s diner, both looking at the camera with cool deadpan expressions, man in black suit, woman in white shirt and black trousers with bob haircut, doing the 'twist' hand gesture over eyes, checkered floor and neon signs in background, cult classic style",
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
    imageUrl:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
    aiPrompt:
      "A couple dancing on a hilltop overlooking a city at twilight, recreating the iconic La La Land pose, woman in bright yellow dress, man in white shirt and slim tie, purple and orange sunset sky with city lights in background, whimsical and romantic",
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
    imageUrl:
      "https://images.unsplash.com/photo-1516939884455-1445c8652f83?w=800",
    aiPrompt:
      "A couple as grand hosts of a 1920s party, recreating the iconic Gatsby toast, both looking at the camera with charismatic billionaire smiles, holding champagne coupes, wearing extravagant gold-accented flapper dress and sharp tuxedo, fireworks and grand mansion party in background, lavish and legendary",
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
    imageUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800",
    aiPrompt:
      "A couple looking at each other through a large fish tank, both looking at the camera through the glass with mesmerized expressions, wearing 90s era party clothing, colorful tropical fish and blue water between them, soft ethereal lighting, romantic and symbolic",
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
    imageUrl:
      "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800",
    aiPrompt:
      "A couple in a passionate embrace during a heavy rainstorm, recreating the iconic Notebook pose, both looking at the camera with intense emotional smiles, soaked clothing, rustic wooden dock and lake in background, misty atmosphere, raw and deeply romantic",
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
    imageUrl:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800",
    aiPrompt:
      "A couple at a pottery wheel, man behind woman with his hands over hers as they shape wet clay, both looking at the camera with intimate warm smiles, soft warm indoor lighting, rustic studio background, deeply romantic and legendary",
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
    imageUrl:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
    aiPrompt:
      "A couple recreating the iconic upside-down kiss, man hanging upside down from a web-like rope, woman pulling his mask up halfway to kiss him, both looking at camera from their unique angles with loving expressions, heavy rain in a city alley at night, cinematic lighting, epic and unique",
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
    aiPrompt:
      "A couple recreating the iconic Dirty Dancing lift, man holding woman high above his head with straight arms, woman with back arched and arms spread wide, both looking at camera with triumphant joyful smiles, 80s resort ballroom background with lights and audience, energetic and iconic",
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
    imageUrl:
      "https://images.unsplash.com/photo-1540324155974-7523202daa3f?w=800",
    aiPrompt:
      "A couple on a rustic metal fire escape balcony, man climbing high with a rose in his mouth, woman leaning over the railing looking down at him with an amazed ecstatic smile, both looking at camera, urban sunset background, romantic and grand",
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
    imageUrl:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    aiPrompt:
      "A couple lying in a lush meadow of wildflowers, heads together, both looking directly at the camera with intense protective smiles, sunlight filtering through ancient pine trees in background, soft dreamy lighting, cinematic and ethereal",
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
    imageUrl:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
    aiPrompt:
      "A couple walking towards each other in a misty field at dawn, recreating the iconic Pride & Prejudice sunrise scene, man in a long coat, woman in a simple nightdress and shawl, meeting as the sun rises behind them, golden hazy lighting, deeply romantic and classic",
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
    imageUrl:
      "https://images.unsplash.com/photo-1485686531765-ba63b07845a7?w=800",
    aiPrompt:
      "A couple in a 1940s airport setting at night, recreating the iconic Casablanca farewell, both looking at camera with dramatic emotional expressions, wearing trench coats and a wide-brimmed hat, fog and airplane propeller in background, high-contrast black and white film style, legendary and tragic",
    storyTemplate: createStoryTemplate(
      "share one last unforgettable look",
      "We'll always have Paris. In a world of chaos, their love is the one thing that will never change, no matter where they go.",
    ),
  },
];
