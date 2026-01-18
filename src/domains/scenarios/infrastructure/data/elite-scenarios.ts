import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const ELITE_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.PRIVATE_ISLAND,
    title: "Private Island",
    description: "Your own piece of heaven",
    icon: "🏝️",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple on exclusive private island beach, both facing camera with blissful relaxed smiles, man in tailored white linen Loro Piana shirt and beige shorts barefoot with designer sunglasses, woman in flowing silk Hermes sarong and designer bikini top with gold jewelry and oversized sunhat, stunning infinity pool with glass edge overlooking ocean and modern minimalist luxury villa with thatched roof and palm trees, crystal clear turquoise Maldivian lagoon in background",
      "magical golden sunset lighting with warm amber and coral tones reflecting off calm water"
    ),
    storyTemplate: createStoryTemplate(
      "escape to their private sanctuary",
      "No crowds, no noise. Just the sound of the ocean and the feeling of absolute freedom in their own tropical empire.",
    ),
  },
  {
    id: ScenarioId.ROYAL_PALACE_LIVING,
    title: "Palace Living",
    description: "Modern royalty",
    icon: "🏰",
    imageUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple in grand European palace hall, both facing camera with regal dignified expressions, man in modern navy Brioni suit with subtle brocade waistcoat and royal insignia pin, woman in elegant champagne Oscar de la Renta ballgown with subtle tiara and sapphire jewelry, standing on grand Carrara marble staircase with ornate gold leaf balustrade, massive crystal Baccarat chandeliers and Renaissance oil paintings in gilded frames and soaring frescoed ceiling in background",
      "luxurious warm lighting from crystal chandeliers creating sparkling highlights and rich golden ambiance"
    ),
    storyTemplate: createStoryTemplate(
      "live like modern monarchs",
      "Tradition meets modern luxury. In a world of palaces and protocol, they find their own path together.",
    ),
  },
  {
    id: ScenarioId.MEGA_YACHT_PARTY,
    title: "Mega-Yacht Life",
    description: "The peak of luxury",
    icon: "🛥️",
    imageUrl:
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple on sundeck of 100-meter mega-yacht, both facing camera with successful sophisticated smiles, man in crisp white dinner jacket with black trousers and Patek Philippe watch, woman in flowing red Valentino evening gown with statement diamond necklace holding champagne flute, gleaming teak deck with infinity pool and helicopter on helipad and jet skis on swim platform, Monaco harbor with illuminated superyachts and Monte Carlo casino lights in background",
      "magical golden hour lighting with warm amber sunset reflecting off polished yacht surfaces and calm Mediterranean water"
    ),
    storyTemplate: createStoryTemplate(
      "sail the world in absolute style",
      "The horizon is theirs to conquer. A life of luxury that spans the globe, one exclusive port at a time.",
    ),
  },
  {
    id: ScenarioId.PENTHOUSE_GALA,
    title: "Penthouse Gala",
    description: "Sky-high sophistication",
    icon: "🏙️",
    imageUrl:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple at exclusive penthouse party high above city, both facing camera with charismatic confident smiles, man in impeccable Tom Ford black tuxedo with satin lapels, woman in stunning emerald Elie Saab gown with plunging back and Harry Winston diamond earrings holding crystal Baccarat champagne flute, dramatic floor-to-ceiling windows with panoramic Manhattan skyline at night with Empire State Building and glittering skyscrapers in background",
      "sophisticated interior lighting with warm party ambiance and spectacular blue-hour city lights through windows"
    ),
    storyTemplate: createStoryTemplate(
      "party above the city lights",
      "They aren't just high-fliers; they're the ones other people look up to. Sophistication at the very top of the world.",
    ),
  },
];
