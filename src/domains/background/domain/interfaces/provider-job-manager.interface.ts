/**
 * Provider Job Manager Interface
 * Single Responsibility: Async job submission, status checking, and result retrieval
 */

import type { JobSubmission, JobStatus } from "../../../../domain/interfaces/ai-provider.interface";

export interface IAIProviderJobManager {
  /**
   * Submit a job and get submission details
   */
  submitJob(
    model: string,
    input: Record<string, unknown>,
  ): Promise<JobSubmission>;

  /**
   * Get current status of a submitted job
   */
  getJobStatus(model: string, requestId: string): Promise<JobStatus>;

  /**
   * Get final result of a completed job
   */
  getJobResult<T = unknown>(model: string, requestId: string): Promise<T>;
}
