import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const HOME_LIFE_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.MORNING_COFFEE,
    title: "Morning Coffee",
    description: "Start the day together",
    icon: "☕",
    imageUrl:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a happy couple in a bright modern Scandinavian kitchen with white cabinets, both facing camera with warm morning smiles, dressed in comfortable cotton loungewear, each holding ceramic coffee mugs, soft golden morning sunlight streaming through large window, fresh flowers in vase on counter, cozy domestic scene",
      "soft warm morning sunlight through windows, bright airy atmosphere, cozy peaceful domestic mood"
    ),
    storyTemplate: createStoryTemplate(
      "share the first moments of the day",
      "The best part of waking up is seeing each other. Quiet conversations and the scent of fresh coffee.",
    ),
  },
  {
    id: ScenarioId.MOVIE_NIGHT,
    title: "Movie Night",
    description: "Home cinema cozy",
    icon: "🍿",
    imageUrl:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a cozy couple on a large comfortable sectional sofa, both facing camera with happy relaxed smiles, wrapped together in a soft gray knit blanket, woman holding a bowl of popcorn, man holding remote control, dimly lit living room with large TV screen glow visible",
      "warm dim ambient living room lighting, soft TV glow, cozy relaxed movie night atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "enjoy a movie marathon",
      "Lost in another world on the screen, but perfectly at home in each other's arms.",
    ),
  },
  {
    id: ScenarioId.COZY_SUNDAY,
    title: "Cozy Sunday",
    description: "Relaxed weekend vibes",
    icon: "🛋️",
    imageUrl:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a relaxed couple sitting together on a large overstuffed armchair, both facing camera with content peaceful smiles, dressed in oversized chunky cable-knit sweaters in cream and gray, hardcover books and ceramic tea cups on wooden side table, cozy home library with bookshelves and houseplants visible",
      "soft warm interior lighting, diffused natural window light, serene peaceful Sunday atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "find peace in a quiet Sunday",
      "Sundays are for slowed-down moments and deep conversations. No rush, just pure connection.",
    ),
  },
  {
    id: ScenarioId.BREAKFAST_IN_BED,
    title: "Breakfast in Bed",
    description: "Lazy morning luxury",
    icon: "🍳",
    imageUrl:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a happy couple in a luxurious bedroom sitting up in bed with crisp white linen sheets, both facing camera with joyful radiant smiles, wearing silk pajamas, wooden breakfast tray between them with fluffy pancakes fresh berries orange juice and coffee, elegant minimalist bedroom with soft curtains",
      "soft golden morning light streaming through sheer curtains, warm intimate atmosphere, lazy morning luxury"
    ),
    storyTemplate: createStoryTemplate(
      "savor a slow morning",
      "Starting the day with sweetness. Every bite tastes better when shared in the comfort of their own world.",
    ),
  },
  {
    id: ScenarioId.BEDTIME_CUDDLES,
    title: "Bedtime Cuddles",
    description: "Goodnight romance",
    icon: "🌙",
    imageUrl: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a loving couple lying in bed cuddling, both facing camera with peaceful sleepy content smiles, woman's head resting on man's shoulder, wearing comfortable sleepwear, soft white silk sheets slightly rumpled, elegant bedside lamp casting warm glow, modern minimalist bedroom",
      "soft warm bedside lamp lighting mixed with cool moonlight through window, intimate tranquil nighttime atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "end the day together",
      "As the world goes quiet, they find their sanctuary in each other. Sleep comes easy when love is present.",
    ),
  },
  {
    id: ScenarioId.READING_TOGETHER,
    title: "Reading Duo",
    description: "Quiet companionable moments",
    icon: "📚",
    imageUrl:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple sitting side by side on a comfortable window seat in a bright sunroom, both facing camera with intelligent warm smiles, each holding hardcover books, man wearing reading glasses, surrounded by lush houseplants, bright natural sunlight streaming in through large windows",
      "bright natural sunlight through windows, peaceful academic atmosphere, quiet comfortable companionship"
    ),
    storyTemplate: createStoryTemplate(
      "get lost in stories together",
      "Two souls, two books, one beautiful silence. They don't need words to feel connected.",
    ),
  },
];
