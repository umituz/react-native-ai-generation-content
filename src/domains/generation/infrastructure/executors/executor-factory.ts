/**
 * Executor Factory
 * Creates appropriate executor based on generation type
 */

import type { GenerationExecutor } from "../../domains/generation/domain/generation.types";
import { ImageExecutor } from "./image-executor";
import { VideoExecutor } from "./video-executor";

declare const __DEV__: boolean;

type GenerationType = "image" | "video" | "meme";

export class ExecutorFactory {
  private static executors = new Map<
    GenerationType,
    GenerationExecutor<unknown, unknown>
  >();

  static create(type: GenerationType): GenerationExecutor<unknown, unknown> {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[ExecutorFactory] Creating executor", { type });
    }

    if (!this.executors.has(type)) {
      switch (type) {
        case "image":
          this.executors.set(type, new ImageExecutor());
          break;
        case "video":
          this.executors.set(type, new VideoExecutor());
          break;
        case "meme":
          throw new Error("Meme executor not yet implemented");
        default:
          throw new Error(`Unknown executor type: ${type}`);
      }

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[ExecutorFactory] Executor created and cached", { type });
      }
    }

    return this.executors.get(type)!;
  }

  static clear(): void {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[ExecutorFactory] Clearing executor cache");
    }
    this.executors.clear();
  }
}
