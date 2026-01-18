/**
 * Cultural Scenarios
 * Scenarios with cultural and historical themes
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const CULTURAL_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: "japanese_traditional" as ScenarioId,
    title: "Japanese Elegance",
    description: "Timeless beauty of Edo period",
    icon: "🏯",
    imageUrl:
      "https://v3b.fal.media/files/b/0a8a3e0e/s6SBpgKeHS3AL0ykrc4ac.jpg",
    previewImageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB7NHQEX8jKFPnEH9iS3W2NKLRHeLAnBfBB-qi8tDU-HPv0DFNgqNwANgIJIPv1O7B9YHC4E7GtVoSLLhm-tbWHGXh0bUcm20VxSsn-0GHO0AoPCz6NFkgKg2hwYzBWT9I0Ts7MaB7Ip86HB75mKBvrI_fRM38CncAz4K1ZKxFreFokuRp-V2VMO4CmOgBFHv6l36oRr-Pqx5l03ygPSVvSv6iZVNBi_dVdGNy8ERbBm6Ob5enFIbURqwb89AnoQL51yoeubQv65Kjc",
    aiPrompt: createPhotorealisticPrompt(
      "a couple in traditional Japanese Edo period attire, both facing camera with gentle serene expressions, man in navy blue silk hakama and gray haori jacket with family crest, woman in elegant burgundy and gold silk kimono with floral obi sash and traditional kanzashi hair ornament, standing in serene Japanese temple garden with pink cherry blossom branches and wooden torii gate and koi pond with stone lantern in background",
      "soft diffused overcast lighting with delicate pink tones from cherry blossoms"
    ),
    storyTemplate: createStoryTemplate(
      "step into traditional Japan",
      "In the timeless elegance of the Edo period, their love story unfolds like a delicate fan painting.",
    ),
  },
  {
    id: "ancient_egypt" as ScenarioId,
    title: "Egyptian Royalty",
    description: "Rule like ancient pharaohs",
    icon: "🏛️",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCTPP4dellqI7FGcpf0o1oJiiukArG5TpjxHZcdo3GRpl51Bq36tTyNevGOK3ns2eaH2jfL5q3V2tPhHBdNMXzzRu5C126OQb4sqNecwiXC7WIFxoVgqpaQtEt8qjQ0eZ15gFuCnhk4e3T4Mos0BZOCM7SflBdvJI2NIj-l-ro3pKH_SVWx7HZ5POS3PLS6G-frikx0jvDosiQhAuag4Cwg5Jew0d1WCYNWRVYoixsRwYUStUyb8ysq_ykvpYaLljvcnoGVzkrvdWgU",
    previewImageUrl:
      "https://v3b.fal.media/files/b/0a89baa4/lr98UkFQjWRDE7br8Nj6r.jpg",
    aiPrompt: createPhotorealisticPrompt(
      "a couple as Ancient Egyptian pharaoh and queen, both facing camera with regal commanding expressions, man in golden Nemes headdress with cobra uraeus and blue and gold pectoral collar with pleated white linen kilt, woman in elaborate gold and lapis lazuli vulture crown with braided black wig and turquoise broad collar and white sheer linen gown, Great Pyramids of Giza silhouetted against dramatic orange and purple sunset sky with hieroglyph-covered obelisk in background",
      "dramatic golden sunset lighting with warm amber and deep purple tones casting long shadows"
    ),
    storyTemplate: createStoryTemplate(
      "rule ancient Egypt together",
      "Like the eternal pyramids, their bond transcends time, written in hieroglyphs of gold.",
    ),
  },

  {
    id: "ottoman_miniature" as ScenarioId,
    title: "Ottoman Art",
    description: "Exquisite palace miniature painting",
    icon: "🎨",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC9aTZBLOrBoP4_wneQHqxdhMfoZ5dqRq_b8Vu4qopR9BrnUpHnzw1zw08sOvio-mGwdjMo31q7IJ9THFMUDGmSOR84IyMvDs_CdCmPVm61MuQWN5TraIUZzYRDNDMygi1_dqCPrMJboRovzAav_M6l-7yKlR25BPvkwcZ_T4TcWhqwqBF4cqhAG5wfUMS2IygeBDAC2qYREQCdARUjL3FBuNwz4qXy8TrFJhzykkcO5aKLYwW36z4tFcCTeHIiN1aIli9Vcxdq9wqb",
    previewImageUrl:
      "https://v3b.fal.media/files/b/0a89ba0d/FK1o-Yy-L1FiTAAd_SOdv.jpg",
    aiPrompt: createPhotorealisticPrompt(
      "a couple in Ottoman palace miniature painting style, both facing camera with regal dignified expressions, man in richly embroidered emerald green kaftan with gold thread and white turban with ruby brooch, woman in elaborate crimson and gold brocade entari dress with pearl headpiece and delicate gold filigree jewelry, ornate Topkapi Palace interior with Iznik tile patterns in blue and turquoise and gilded calligraphy panels and carved wooden screens in background",
      "flat even lighting characteristic of miniature painting with rich saturated jewel-tone colors and gold accents"
    ),
    storyTemplate: createStoryTemplate(
      "become part of palace art",
      "Immortalized in the delicate brushstrokes of a master miniaturist, their love becomes timeless art.",
    ),
  },

  {
    id: "indian_bollywood" as ScenarioId,
    title: "Bollywood Magic",
    description: "Vibrant cinematic romance",
    icon: "🎬",
    imageUrl:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&auto=format&fit=crop&q=60",
    previewImageUrl:
      "https://v3b.fal.media/files/b/0a89ba32/Asyucw3VIpGtLMn109X-z.jpg",
    aiPrompt: createPhotorealisticPrompt(
      "a couple in grand Bollywood wedding scene, both facing camera with vibrant romantic smiles in dramatic pose, man in rich burgundy sherwani with gold zari embroidery and matching turban with pearl sehra, woman in stunning red and gold bridal lehenga with heavy gold jewelry including maang tikka and choker and jhumka earrings and mehndi on hands, majestic white marble Taj Mahal or ornate Rajasthani palace with marigold garlands and rose petals floating in air in background",
      "rich warm golden lighting with vibrant saturated colors and subtle cinematic flare"
    ),
    storyTemplate: createStoryTemplate(
      "star in their own Bollywood romance",
      "With the grandeur of Indian cinema, their love story unfolds in vibrant colors and timeless melody.",
    ),
  },
];
