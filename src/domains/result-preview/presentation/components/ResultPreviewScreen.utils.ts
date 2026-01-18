import type { RecentCreation, ResultPreviewTranslations } from "../types/result-preview.types";

export function formatMediaUrl(
  videoUrl: string | undefined,
  imageUrl: string | undefined,
  isVideo: boolean
): string | null {
  const url = videoUrl ?? imageUrl;
  if (!url) return null;

  if (!isVideo && !url.startsWith("http") && !url.startsWith("data:image")) {
    return `data:image/jpeg;base64,${url}`;
  }
  return url;
}

export function shouldShowRecentCreations(
  recentCreations: readonly RecentCreation[] | undefined,
  translations: ResultPreviewTranslations
): boolean {
  return Boolean(
    recentCreations &&
    recentCreations.length > 0 &&
    translations.recentCreations &&
    translations.viewAll
  );
}
