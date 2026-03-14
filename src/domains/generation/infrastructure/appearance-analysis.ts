/**
 * Appearance Analysis Utility
 *
 * Fotoğraf analizi ve appearance context çıkarma utility'si.
 * Vision analysis暂时禁用 - 返回空上下文。
 */

import { refinePromptForCouple } from "../../../infrastructure/utils/couple-input.util";

/**
 * Fotoğrafları analiz eder ve appearance context string'i döndürür.
 * Şu an vision analysis devre dışı - boş string döndürür.
 *
 * @param photoUris - Analiz edilecek fotoğraf URI'leri
 * @param isCoupleMode - Çift modu mu?
 * @returns Appearance context string (şu an boş)
 */
export async function getAppearanceContext(
  photoUris: string[],
  isCoupleMode: boolean,
): Promise<string> {
  // Vision analysis temporarily disabled due to API limitations
  // Future: Implement vision analysis to extract appearance features
  return "";
}

/**
 * Fotoğraf analizi based prompt enhancement
 *
 * Tüm generation tab'larında kullanılan standard logic.
 *
 * @param originalPrompt - Orijinal prompt
 * @param photoUris - Fotoğraf URI'leri
 * @param isCoupleMode - Çift modu mu?
 * @returns Enhanced prompt
 */
export async function enhancePromptWithAnalysis(
  originalPrompt: string,
  photoUris: string[],
  isCoupleMode: boolean,
): Promise<string> {
  // Always apply basic couple refinement first
  let finalPrompt = refinePromptForCouple(originalPrompt, isCoupleMode);

  if (photoUris.length === 0) return finalPrompt;

  const appearanceContext = await getAppearanceContext(photoUris, isCoupleMode);

  if (appearanceContext) {
    finalPrompt = `${appearanceContext}\n\n${finalPrompt}`;
  }

  return finalPrompt;
}
