/**
 * Lifestyle Scenarios
 * Scenarios focused on different lifestyles and activities
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const LIFESTYLE_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.VACATION,
    title: "Beach Paradise",
    description: "Escape to tropical heaven",
    icon: "🏖️",
    imageUrl:
      "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&auto=format&fit=crop&q=60",
    aiPrompt:
      "A happy couple walking side-by-side on a white sand beach, both looking at the camera with relaxed smiles, dressed in elegant summer resort wear (white linen shirt, flowy beach dress), tropical paradise with crystal blue ocean and palm trees in background, sun-kissed glow, relaxed and joyful",
    storyTemplate: createStoryTemplate(
      "escape to their dream paradise",
      "Crystal waters, golden sunsets, and each other - the perfect recipe for unforgettable moments.",
    ),
  },
  {
    id: ScenarioId.SUCCESS,
    title: "Power Couple",
    description: "Living your ultimate success story",
    icon: "🚀",
    imageUrl:
      "https://media.istockphoto.com/id/2165132898/photo/senior-couple-reviewing-energy-bill-on-laptop-at-home.webp?a=1&b=1&s=612x612&w=0&k=20&c=B4CTG_R4n6aJNDpfFXEO2tVJ82F-7Fxwr1he7y32MAI=",
    aiPrompt:
      "A successful couple standing confidently in a modern home office, both looking directly at the camera with proud smiles, dressed in smart-casual business attire, sleek organized home office with a view in background, peaceful and accomplished",
    storyTemplate: createStoryTemplate(
      "stand at the pinnacle of their success",
      "Together they've built an empire, proving that the strongest partnerships create the greatest achievements.",
    ),
  },
  {
    id: ScenarioId.ADVENTURE,
    title: "Mountain Explorers",
    description: "Conquer epic peaks together",
    icon: "🏔️",
    imageUrl:
      "https://v3b.fal.media/files/b/0a89bbdb/Q_t0NaB59_MYmsvn86VsC.jpg",
    previewImageUrl:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=60",
    aiPrompt:
      "An adventurous couple standing on a mountain peak, both looking at the camera with triumphant expressions, dressed in professional colorful hiking gear, windswept hair, epic mountain summit with vast vistas in background, dramatic and majestic",
    storyTemplate: createStoryTemplate(
      "conquer another breathtaking peak",
      "With each adventure, they discover not just the world, but new depths of their love for each other.",
    ),
  },
  {
    id: ScenarioId.COTTAGECORE,
    title: "Country Living",
    description: "Simple joys, pure happiness",
    icon: "🌻",
    imageUrl:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=60",
    aiPrompt:
      "A sweet couple standing in a blooming garden, both looking at the camera with gentle smiles, dressed in rustic country clothing (flannel shirt, floral dress, overalls), idyllic countryside with rustic barn and rolling hills in background, pastoral and serene",
    storyTemplate: createStoryTemplate(
      "find peace in their countryside haven",
      "Away from the chaos of the world, they've built a life of simple pleasures and pure happiness.",
    ),
  },

  {
    id: ScenarioId.WINTER_CABIN,
    title: "Cozy Winter",
    description: "Warm moments by the fire",
    icon: "🔥",
    imageUrl:
      "https://v3b.fal.media/files/b/0a89f3d5/EZHOPz6oMJR5dAVZGVXpI.jpg",
    previewImageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBRJkY4OPg87EL1WC0-HBlz2ivbhmARFcRLZxrx8Mbv9sqlUedRFK7jWbciGccEoSYnd9WcSFOxizpHkqPknpFMSWjqkY-W39YIfBBlElj0HWmRiZfqawQKwFvQj5E68p3-8gMlWfdx3Avg4FOd6UOnGLY3yyXsAqt4lsjWBKYeLNJQutmFDalVSm6MZw9Qdb6VFTefFdMwUdoXo2DA2DeLZqHNdjEAoX7KjP9fkmJabK8TDwmPhF0EOUtNCcv31p-_fFAIQpg7Hfo6",
    aiPrompt:
      "A cozy couple sitting on a rug by a fireplace, both looking at the camera with warm smiles, dressed in comfortable thick knitted sweaters, warm firelight glow on faces, rustic wooden cabin interior with snow visible through window in background, warm and romantic",
    storyTemplate: createStoryTemplate(
      "find warmth in each other's embrace",
      "When winter winds howl outside, they create their own paradise by the fire.",
    ),
  },
  {
    id: ScenarioId.VINTAGE_90S,
    title: "Vintage Vibes",
    description: "Nostalgic 90s romance",
    icon: "📼",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDQmVb5l4voc_PbAqBG9SbXS1QNftFmbOu8I6SbfVLdDZg--XJj96eWbNesEJ0vFVOza6P3a9eJFn_AgZeM27zVaSDcjyMZJbhLeSmBdKOfUH6wwwUdZlDExFxwOV9yaw9xxz8RxohLjze0adbs0Hd6WCuXwqA6aLSvcMRiMmN21bPDNlf7VY5qQjRt4cUJmRMAyWATz-ny6VjMcDF_irchuZlVYxr5-T9T9yI1Um1HDO-MaDtaUXqb9OcKJRNVMeX2yLK81Km-jYya",
    aiPrompt:
      "A cool couple posing in a field with vintage 90s aesthetic, both looking at the camera, dressed in authentic retro 90s fashion (denim, oversized jackets), golden hour field in background, film grain effect, nostalgic and dreamy",
    storyTemplate: createStoryTemplate(
      "relive the golden days of romance",
      "Like a treasured photograph, their love story has that timeless, unforgettable quality.",
    ),
  },

  {
    id: ScenarioId.RED_CARPET,
    title: "Red Carpet",
    description: "Hollywood glamour night",
    icon: "🎭",
    imageUrl:
      "https://images.unsplash.com/photo-1540324155974-7523202daa3f?w=800&auto=format&fit=crop&q=60",
    aiPrompt:
      "A glamorous couple standing on a red carpet, both looking directly at the camera with confident celebrity smiles, dressed in black tuxedo and sparkling elegant red evening gown, Hollywood event with paparazzi flashes in background, glamorous and star-studded",
    storyTemplate: createStoryTemplate(
      "shine under the spotlight",
      "Tonight they are the stars. Camera flashes fade away when they look at each other.",
    ),
  },
  {
    id: ScenarioId.FITNESS,
    title: "Fitness Duo",
    description: "Stronger together",
    icon: "💪",
    imageUrl:
      "https://v3b.fal.media/files/b/0a8a60be/XzjGs0XSFw9NTraL5FuXP.jpg",
    previewImageUrl:
      "https://images.unsplash.com/photo-1683509602596-f04aca698097?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zml0bmVzcyUyMGR1byUyMGNvdXBsZXxlbnwwfHwwfHx8MA%3D%3D",
    aiPrompt:
      "A fit couple standing side-by-side in a gym, both looking at the camera with determined smiles, male shirtless with defined muscles, female wearing matching sports bra and leggings, sweat sheen, moody gym studio with dramatic lighting in background, powerful and attractive",
    storyTemplate: createStoryTemplate(
      "push their limits together",
      "Building strength side by side, they prove that a couple that trains together, stays together.",
    ),
  },
  {
    id: ScenarioId.COOKING,
    title: "Master Chefs",
    description: "Cooking with love",
    icon: "🍳",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1663089236650-3efc51597de5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y291cGxlJTIwbWFzdGVyJTIwY2hlZnN8ZW58MHx8MHx8fDA%3D",
    aiPrompt:
      "A chef couple standing in a professional kitchen, both looking at the camera with warm smiles, dressed in professional black chef aprons and white shirts, arms crossed confidently or holding fresh ingredients, bustling commercial kitchen with stainless steel equipment in background, professional and culinary",
    storyTemplate: createStoryTemplate(
      "create a masterpiece in the kitchen",
      "The secret ingredient is always love. Together they whip up memories that taste like home.",
    ),
  },
];
