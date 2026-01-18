/**
 * Lifestyle Scenarios
 * Scenarios focused on different lifestyles and activities
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const LIFESTYLE_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.VACATION,
    title: "Beach Paradise",
    description: "Escape to tropical heaven",
    icon: "🏖️",
    imageUrl:
      "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a happy couple walking side-by-side on pristine white sand beach, both facing camera with relaxed genuine smiles showing sun-kissed glow, man in white linen button-down shirt and shorts, woman in flowing cream beach dress, crystal clear turquoise ocean water, swaying palm trees, tropical paradise setting",
      "warm tropical golden hour sunlight, beach vacation atmosphere, relaxed joyful island vibes"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a successful power couple standing confidently in a modern sleek home office, both facing camera with proud accomplished smiles, man in smart navy blazer with white shirt, woman in elegant blouse, minimalist desk with laptop and city view through floor-to-ceiling windows",
      "bright natural office lighting, professional accomplished atmosphere, successful modern lifestyle"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "an adventurous couple standing triumphantly on a dramatic mountain peak summit, both facing camera with exhilarated triumphant expressions, wearing professional colorful hiking gear with backpacks, windswept hair, epic panoramic mountain vista with snow-capped peaks and clouds below",
      "dramatic bright mountain sunlight, epic vista atmosphere, triumphant adventure mood"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a sweet couple standing in a blooming cottage garden with colorful wildflowers, both facing camera with gentle warm smiles, man in worn flannel shirt with rolled sleeves, woman in vintage floral cotton dress, rustic red barn and rolling green hills visible in background, butterflies and bees in garden",
      "soft warm golden afternoon light, pastoral serene countryside atmosphere, peaceful simple living"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a cozy couple sitting close together on a plush rug in front of a crackling stone fireplace, both facing camera with warm content smiles, dressed in comfortable thick cable-knit sweaters in cream and burgundy, warm orange firelight glowing on their faces, rustic wooden log cabin interior with snow-covered pine trees visible through frosted window",
      "warm amber fireplace glow reflecting on faces, cozy cabin atmosphere, romantic winter retreat"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a cool retro couple posing in an open golden field with authentic vintage 90s aesthetic, both facing camera with casual cool expressions, wearing classic 90s fashion with oversized denim jackets high-waisted jeans and chunky sneakers, tall grass and wildflowers, film grain texture, analog photography style",
      "warm golden hour backlighting, vintage film aesthetic, nostalgic dreamy 90s mood"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a glamorous couple standing confidently on a red carpet at a Hollywood premiere event, both facing camera with confident celebrity smiles, man in classic black tuxedo with bow tie, woman in stunning sparkling red sequined evening gown with elegant updo, velvet ropes and paparazzi camera flashes visible in background",
      "bright paparazzi flash lighting, glamorous star-studded Hollywood atmosphere, celebrity red carpet moment"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a fit athletic couple standing together in a modern gym, both facing camera with determined confident smiles, man in fitted tank top showing toned arms, woman in matching sports bra and high-waisted leggings, light sweat sheen on skin, premium gym equipment and mirrors visible, dramatic moody gym lighting",
      "dramatic moody gym lighting with highlights on muscles, powerful fitness atmosphere, healthy active lifestyle"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a talented chef couple standing together in a professional commercial kitchen, both facing camera with warm proud smiles, wearing professional black chef aprons over crisp white chef shirts, holding fresh colorful ingredients like herbs and vegetables, gleaming stainless steel equipment and copper pots visible in background",
      "bright professional kitchen lighting, culinary atmosphere, warm passionate cooking mood"
    ),
    storyTemplate: createStoryTemplate(
      "create a masterpiece in the kitchen",
      "The secret ingredient is always love. Together they whip up memories that taste like home.",
    ),
  },
];
