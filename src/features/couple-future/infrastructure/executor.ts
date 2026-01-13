/**
 * Couple Future Executor
 * Multi-reference image generation using Nano Banana
 */

import { providerRegistry } from "../../../infrastructure/services/provider-registry.service";
import type { CoupleFutureInput, CoupleFutureConfig, CoupleFutureResult } from "../domain/types";
import { COUPLE_FUTURE_DEFAULTS } from "../domain/types";

declare const __DEV__: boolean;

const formatBase64 = (base64: string): string => {
  if (!base64) return "";
  return base64.startsWith("data:") ? base64 : `data:image/jpeg;base64,${base64}`;
};

export async function executeCoupleFuture(
  input: CoupleFutureInput,
  config?: CoupleFutureConfig,
): Promise<CoupleFutureResult> {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[Executor] ========== COUPLE FUTURE START ==========");
    console.log("[Executor] Input received:", {
      hasPartnerA: !!input.partnerABase64,
      partnerALength: input.partnerABase64?.length || 0,
      hasPartnerB: !!input.partnerBBase64,
      partnerBLength: input.partnerBBase64?.length || 0,
      promptLength: input.prompt?.length || 0,
      prompt: input.prompt?.slice(0, 300),
    });
    console.log("[Executor] Config:", {
      hasOnProgress: !!config?.onProgress,
      timeoutMs: config?.timeoutMs,
      aspectRatio: config?.aspectRatio,
      outputFormat: config?.outputFormat,
    });
  }

  const provider = providerRegistry.getActiveProvider();

  if (!provider) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[Executor] ❌ No AI provider configured");
    }
    return { success: false, error: "No AI provider configured" };
  }

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[Executor] ✅ Provider found:", provider.constructor.name);
  }

  if (!provider.isInitialized()) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[Executor] ❌ AI provider not initialized");
    }
    return { success: false, error: "AI provider not initialized" };
  }

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[Executor] ✅ Provider initialized");
  }

  const { onProgress, timeoutMs, aspectRatio, outputFormat } = config ?? {};
  let lastStatus = "";

  try {
    onProgress?.(5);

    const imageUrls = [input.partnerABase64, input.partnerBBase64]
      .filter(Boolean)
      .map(formatBase64);

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[Executor] 🖼️ Image URLs prepared:", {
        count: imageUrls.length,
        url1Length: imageUrls[0]?.length || 0,
        url2Length: imageUrls[1]?.length || 0,
      });
    }

    if (imageUrls.length < 2) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[Executor] ❌ Two reference images required, got:", imageUrls.length);
      }
      return { success: false, error: "Two reference images required" };
    }

    onProgress?.(10);

    const enhancedPrompt = `A photorealistic image of a couple. The first person @image1 and the second person @image2. ${input.prompt}. High quality, detailed, professional photography.`;

    const modelInput = {
      image_urls: imageUrls,
      prompt: enhancedPrompt,
      aspect_ratio: aspectRatio ?? COUPLE_FUTURE_DEFAULTS.aspectRatio,
      output_format: outputFormat ?? COUPLE_FUTURE_DEFAULTS.outputFormat,
      num_images: 1,
    };

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[Executor] 📤 FAL AI Request:");
      console.log("[Executor] Model:", COUPLE_FUTURE_DEFAULTS.model);
      console.log("[Executor] Prompt:", enhancedPrompt.slice(0, 400));
      console.log("[Executor] Aspect ratio:", modelInput.aspect_ratio);
      console.log("[Executor] Output format:", modelInput.output_format);
      console.log("[Executor] Timeout:", timeoutMs ?? COUPLE_FUTURE_DEFAULTS.timeoutMs);
    }

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[Executor] 📡 Calling provider.subscribe()...");
    }

    const result = await provider.subscribe(COUPLE_FUTURE_DEFAULTS.model, modelInput, {
      timeoutMs: timeoutMs ?? COUPLE_FUTURE_DEFAULTS.timeoutMs,
      onQueueUpdate: (status) => {
        if (status.status === lastStatus) return;
        lastStatus = status.status;

        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[Executor] 📊 Queue status update:", {
            status: status.status,
            logs: status.logs?.slice(-3),
          });
        }

        if (status.status === "IN_QUEUE") onProgress?.(20);
        else if (status.status === "IN_PROGRESS") onProgress?.(50);
      },
    });

    onProgress?.(90);

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[Executor] 📥 FAL AI Response received");
      console.log("[Executor] Raw result type:", typeof result);
      console.log("[Executor] Raw result keys:", result ? Object.keys(result as object) : "null");
      console.log("[Executor] Raw result:", JSON.stringify(result, null, 2).slice(0, 1000));
    }

    const rawResult = result as Record<string, unknown>;
    const data = (rawResult?.data ?? rawResult) as { images?: Array<{ url: string }> };
    const imageUrl = data?.images?.[0]?.url;

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[Executor] 🔍 Parsed response:");
      console.log("[Executor] Has data:", !!data);
      console.log("[Executor] Images array length:", data?.images?.length || 0);
      console.log("[Executor] First image URL:", imageUrl?.slice(0, 100));
    }

    onProgress?.(100);

    if (!imageUrl) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[Executor] ❌ No image URL in response");
        console.log("[Executor] ========== COUPLE FUTURE END (FAILED) ==========");
      }
      return { success: false, error: "No image generated" };
    }

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[Executor] ✅ Generation successful!");
      console.log("[Executor] Image URL:", imageUrl.slice(0, 100));
      console.log("[Executor] ========== COUPLE FUTURE END (SUCCESS) ==========");
    }

    return { success: true, imageUrl };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Generation failed";
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.error("[Executor] ❌ Exception caught:", {
        message,
        name: error instanceof Error ? error.name : "Unknown",
        stack: error instanceof Error ? error.stack?.slice(0, 500) : undefined,
      });
      console.log("[Executor] ========== COUPLE FUTURE END (ERROR) ==========");
    }
    return { success: false, error: message };
  }
}
