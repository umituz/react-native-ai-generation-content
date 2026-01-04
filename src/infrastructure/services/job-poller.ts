/**
 * Job Poller
 * Handles polling logic for job status
 */

import type { IAIProvider, JobStatus } from "../../domain/interfaces";
import { DEFAULT_POLLING_CONFIG, type PollingConfig } from "../../domain/entities";
import { isTransientError } from "../utils/error-classifier.util";
import { createPollingDelay } from "../utils/polling-interval.util";

declare const __DEV__: boolean;

export interface PollerConfig {
    polling?: Partial<PollingConfig>;
    onStatusUpdate?: (requestId: string, status: string) => Promise<void>;
}

export class JobPoller {
    private config: PollerConfig = {};

    configure(config: PollerConfig): void {
        this.config = { ...this.config, ...config };
    }

    async pollForResult<T>(
        provider: IAIProvider,
        model: string,
        requestId: string,
        onStatusUpdate?: (status: JobStatus, attempt: number, config: PollingConfig) => void,
    ): Promise<T> {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
            // eslint-disable-next-line no-console
            console.log("[JobPoller] pollForResult() started", {
                provider: provider.providerId,
                model,
                requestId,
            });
        }

        const config = {
            ...DEFAULT_POLLING_CONFIG,
            ...this.config.polling,
        };

        let consecutiveErrors = 0;

        for (let attempt = 0; attempt < config.maxAttempts; attempt++) {
            await createPollingDelay(attempt, config);

            if (typeof __DEV__ !== "undefined" && __DEV__ && attempt % 5 === 0) {
                // eslint-disable-next-line no-console
                console.log("[JobPoller] pollForResult() attempt", {
                    attempt,
                    maxAttempts: config.maxAttempts,
                });
            }

            try {
                const status = await provider.getJobStatus(model, requestId);

                consecutiveErrors = 0;

                onStatusUpdate?.(status, attempt, config);

                if (status.status === "COMPLETED") {
                    if (typeof __DEV__ !== "undefined" && __DEV__) {
                        // eslint-disable-next-line no-console
                        console.log("[JobPoller] pollForResult() job COMPLETED", {
                            requestId,
                            attempt,
                        });
                    }
                    return provider.getJobResult<T>(model, requestId);
                }

                if (status.status === "FAILED") {
                    throw new Error("Job failed on provider");
                }

                await this.config.onStatusUpdate?.(requestId, status.status);
            } catch (error) {
                if (isTransientError(error)) {
                    consecutiveErrors++;

                    if (consecutiveErrors >= config.maxConsecutiveErrors) {
                        throw error;
                    }

                    continue;
                }

                throw error;
            }
        }

        throw new Error(
            `Polling timeout after ${config.maxAttempts} attempts`,
        );
    }
}

export const jobPoller = new JobPoller();
