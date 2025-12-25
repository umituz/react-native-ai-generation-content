/**
 * Progress Manager
 * Handles progress tracking and updates during generation
 */

import type { GenerationProgress, PollingConfig } from "../../domain/entities";
import type { JobStatus } from "../../domain/interfaces";
import { createProgressTracker } from "../utils/progress-calculator.util";

export class ProgressManager {
    private progressTracker = createProgressTracker();

    updateProgress(
        stage: GenerationProgress["stage"],
        subProgress: number,
        onProgress?: (progress: GenerationProgress) => void,
    ): void {
        const progress = this.progressTracker.setStatus(stage);
        onProgress?.({
            stage,
            progress: progress + subProgress,
        });
    }

    updateProgressFromStatus(
        status: JobStatus,
        attempt: number,
        config: PollingConfig,
        onProgress?: (progress: GenerationProgress) => void,
    ): void {
        const baseProgress = 25;
        const maxProgress = 85;
        const range = maxProgress - baseProgress;

        let progress: number;

        if (status.status === "IN_QUEUE") {
            progress = baseProgress + range * 0.2;
        } else if (status.status === "IN_PROGRESS") {
            const ratio = Math.min(attempt / (config.maxAttempts * 0.7), 1);
            progress = baseProgress + range * (0.2 + 0.6 * ratio);
        } else {
            progress = baseProgress;
        }

        onProgress?.({
            stage: "generating",
            progress: Math.round(progress),
            eta: status.eta,
        });
    }

    reset(): void {
        this.progressTracker = createProgressTracker();
    }
}

export const progressManager = new ProgressManager();
