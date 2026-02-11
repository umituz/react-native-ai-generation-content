export interface ExtractedImageResult {
  imageUrl?: string;
  imageUrls?: string[];
}

function extractImagesFromObject(obj: Record<string, unknown>): string[] | null {
  if (Array.isArray(obj.images)) {
    const urls = obj.images
      .map((img) => {
        if (typeof img === "string") return img;
        if (img && typeof img === "object" && "url" in img) {
          return (img as { url: string }).url;
        }
        return null;
      })
      .filter((url): url is string => url !== null);

    if (urls.length > 0) return urls;
  }
  return null;
}

export function defaultExtractImageResult(result: unknown): ExtractedImageResult | undefined {
  if (typeof result !== "object" || result === null) {
    return undefined;
  }

  const r = result as Record<string, unknown>;

  if (r.data && typeof r.data === "object") {
    const dataObj = r.data as Record<string, unknown>;
    const urls = extractImagesFromObject(dataObj);
    if (urls) {
      return { imageUrl: urls[0], imageUrls: urls };
    }
  }

  const directUrls = extractImagesFromObject(r);
  if (directUrls) {
    return { imageUrl: directUrls[0], imageUrls: directUrls };
  }

  if (typeof r.imageUrl === "string") {
    return { imageUrl: r.imageUrl, imageUrls: [r.imageUrl] };
  }

  if (typeof r.imageBase64 === "string") {
    const mimeType = typeof r.mimeType === "string" ? r.mimeType : "image/png";
    const dataUrl = `data:${mimeType};base64,${r.imageBase64}`;
    return { imageUrl: dataUrl, imageUrls: [dataUrl] };
  }

  if (typeof r.image === "string") {
    return { imageUrl: r.image, imageUrls: [r.image] };
  }

  return undefined;
}
