/**
 * Job Poller Factory
 * Creates pre-configured job poller instances
 */

import type { PollingConfig } from "../../domain/entities";
import type { PollJobOptions } from "./job-poller.types";
import { pollJob } from "./job-poller.service";

export function createJobPoller(defaultConfig?: Partial<PollingConfig>) {
  return {
    poll<T = unknown>(options: Omit<PollJobOptions, "config">) {
      return pollJob<T>({ ...options, config: defaultConfig });
    },
  };
}
