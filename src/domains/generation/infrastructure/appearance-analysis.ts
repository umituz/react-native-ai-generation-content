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
  const DEV = typeof __DEV__ !== "undefined" && __DEV__;

  if (DEV) {
    console.log("[AppearanceAnalysis] ===== ANALYSIS START =====");
    console.log("[AppearanceAnalysis] Photo URIs:", photoUris.length);
    console.log("[AppearanceAnalysis] Is couple mode:", isCoupleMode);
    console.log("[AppearanceAnalysis] URIs:", photoUris.map((uri, i) => `  ${i + 1}. ${uri.substring(0, 60)}...`));
    console.log("[AppearanceAnalysis] Vision analysis: DISABLED (returning empty context)");
    console.log("[AppearanceAnalysis] ===== ANALYSIS END =====");
  }

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
  const DEV = typeof __DEV__ !== "undefined" && __DEV__;

  if (DEV) {
    console.log("[AppearanceAnalysis] ===== ENHANCE START =====");
    console.log("[AppearanceAnalysis] Original prompt length:", originalPrompt.length);
    console.log("[AppearanceAnalysis] Photo URIs:", photoUris.length);
    console.log("[AppearanceAnalysis] Is couple mode:", isCoupleMode);
    console.log("[AppearanceAnalysis] Original preview:", originalPrompt.substring(0, 200) + "...");
  }

  // Always apply basic couple refinement first
  let finalPrompt = refinePromptForCouple(originalPrompt, isCoupleMode);

  if (DEV) {
    console.log("[AppearanceAnalysis] After refinePromptForCouple length:", finalPrompt.length);
    console.log("[AppearanceAnalysis] After refine preview:", finalPrompt.substring(0, 250) + "...");
  }

  if (photoUris.length === 0) {
    if (DEV) {
      console.log("[AppearanceAnalysis] No photos - returning refined prompt");
      console.log("[AppearanceAnalysis] ===== ENHANCE END =====");
    }
    return finalPrompt;
  }

  const appearanceContext = await getAppearanceContext(photoUris, isCoupleMode);

  if (appearanceContext) {
    finalPrompt = `${appearanceContext}\n\n${finalPrompt}`;
    if (DEV) {
      console.log("[AppearanceAnalysis] ✅ Appearance context prepended");
      console.log("[AppearanceAnalysis] Context length:", appearanceContext.length);
    }
  } else {
    if (DEV) {
      console.log("[AppearanceAnalysis] ℹ️ No appearance context (vision disabled)");
    }
  }

  if (DEV) {
    console.log("[AppearanceAnalysis] Final prompt length:", finalPrompt.length);
    console.log("[AppearanceAnalysis] Final preview:", finalPrompt.substring(0, 300) + "...");
    console.log("[AppearanceAnalysis] ===== ENHANCE END =====");
  }

  return finalPrompt;
}
