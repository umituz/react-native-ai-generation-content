import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const DAILY_ESSENCE_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.NEW_HOME_CHAOS,
    title: "New Home Chaos",
    description: "Moving in together",
    icon: "📦",
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple in empty living room on moving day surrounded by cardboard boxes, both facing camera with exhausted but genuinely happy smiles, sitting on hardwood floor eating pepperoni pizza directly from box, man in gray sweatshirt with messy hair and tape gun beside him, woman in oversized flannel shirt with hair in messy ponytail and marker in hand, stacked moving boxes labeled in marker and bubble wrap scattered around",
      "bright natural afternoon sunlight streaming through bare windows casting warm shadows on wood floors"
    ),
    storyTemplate: createStoryTemplate(
      "begin a new chapter in their own home",
      "Amidst the chaos of boxes and tape, they've found the most important thing: a place where they finally belong, together.",
    ),
  },
  {
    id: ScenarioId.LAUNDRY_FUN_DAY,
    title: "Laundry Play",
    description: "Fun in the mundane",
    icon: "🧺",
    imageUrl:
      "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple having fun doing laundry together in bright white laundry room, both facing camera with playful laughing expressions, man in gray t-shirt catching colorful striped sock being thrown at him, woman in white tank top and yoga pants mid-throw with mischievous grin, piles of colorful towels and clothes spilling from wicker basket and front-loading washer and dryer in background",
      "bright cheerful domestic lighting with clean white walls and warm natural light from window"
    ),
    storyTemplate: createStoryTemplate(
      "make even the chores an adventure",
      "They prove that it's not what you're doing, but who you're doing it with. Even laundry day is a highlight when spent together.",
    ),
  },
  {
    id: ScenarioId.MIDNIGHT_KITCHEN_SNACK,
    title: "Midnight Kitchen",
    description: "2 AM conversations",
    icon: "🥪",
    imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple sharing midnight snack in dimly lit kitchen, both facing camera with gentle tired smiles sitting on granite countertop, man in white undershirt with sleepy eyes holding half of turkey sandwich, woman in oversized boyfriend shirt with bare legs holding bowl of colorful cereal, single warm stove light illuminating their faces, dark city view through window above sink",
      "warm amber glow from single stove hood light with cool blue moonlight through window"
    ),
    storyTemplate: createStoryTemplate(
      "share a secret midnight snack",
      "The world is asleep, but their connection is wide awake. The best conversations always happen when the rest of the world is quiet.",
    ),
  },
  {
    id: ScenarioId.GARDEN_GROWTH_STEPS,
    title: "Growing Roots",
    description: "Planting for the future",
    icon: "🌱",
    imageUrl:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple planting together in small backyard garden, both facing camera with proud satisfied smiles, hands covered in rich dark soil, man kneeling in faded jeans and plaid shirt with terracotta pot and trowel, woman in denim overalls and sun hat placing small green sapling in freshly dug hole, raised garden beds with tomatoes and herbs and wooden fence with climbing roses in background",
      "soft golden afternoon sunlight filtering through leaves with warm earthy tones"
    ),
    storyTemplate: createStoryTemplate(
      "plant the seeds of their shared future",
      "Just like the trees they plant, their love takes time, care, and a lot of heart to grow into something magnificent.",
    ),
  },
  {
    id: ScenarioId.STORM_SHELTER_BOARDGAMES,
    title: "Storm Shelter",
    description: "Warmth in the dark",
    icon: "🎲",
    imageUrl:
      "https://images.unsplash.com/photo-1611195974226-a6a9be9dd763?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple playing board games during power outage, both facing camera with mischievous playful smiles sitting on plush area rug, man in hoodie rolling dice over Monopoly board, woman wrapped in blanket holding playing cards with triumphant expression, multiple pillar candles and tea lights creating dancing shadows on walls, rain streaking and lightning flash visible through dark window in background",
      "warm flickering candlelight with orange glow and dramatic dancing shadows on walls"
    ),
    storyTemplate: createStoryTemplate(
      "find light and laughter in the dark",
      "When the power goes out, they spark their own light. No electricity needed for the chemistry they share.",
    ),
  },
  {
    id: ScenarioId.FURNITURE_ASSEMBLY_TEST,
    title: "The Assembly Test",
    description: "Building a life (and a shelf)",
    icon: "🔧",
    imageUrl:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple assembling IKEA furniture together, both facing camera with confused but laughing expressions, man sitting cross-legged in jeans holding instruction manual upside down with bewildered look, woman in casual dress holding Allen wrench and small screwdriver looking amused, scattered wooden panels and metal hardware and plastic bags of screws around them, partially assembled white bookshelf leaning precariously in foreground",
      "bright daylight from nearby window with clean modern apartment interior"
    ),
    storyTemplate: createStoryTemplate(
      "conquer the ultimate relationship test",
      "If they can survive building furniture together without a single argument, they can survive anything. Building a home, one screw at a time.",
    ),
  },
  {
    id: ScenarioId.RAINY_WINDOW_WATCH,
    title: "Rainy Day Watch",
    description: "Quiet reflection",
    icon: "☔",
    imageUrl:
      "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple standing by large floor-to-ceiling window watching rainstorm, both facing window with serene contemplative expressions and arms wrapped around each other, man in chunky cream cable-knit sweater, woman in oversized gray cashmere cardigan with head resting on his shoulder, heavy rain streaking down glass with water droplets catching light, gray cityscape and moody clouds visible through rain-blurred window",
      "soft diffused overcast light with cool blue-gray tones and warm interior glow"
    ),
    storyTemplate: createStoryTemplate(
      "find beauty in a rainy day",
      "The world outside is gray and wet, but inside, their world is warm, colorful, and perfectly complete.",
    ),
  },
];
