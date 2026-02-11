/**
 * usePendingJobs Hook
 * Generic pending job management with TanStack Query
 */

import { useQuery, useMutation, useQueryClient } from "@umituz/react-native-design-system";
import type {
  BackgroundJob,
  AddJobInput,
  UpdateJobInput,
} from "../../domain/entities/job.types";
import { DEFAULT_QUEUE_CONFIG } from "../../domain/entities/job.types";

export interface UsePendingJobsOptions {
  readonly queryKey?: readonly string[];
  readonly enabled?: boolean;
}

export interface UsePendingJobsReturn<TInput = unknown, TResult = unknown> {
  readonly jobs: BackgroundJob<TInput, TResult>[];
  readonly hasJobs: boolean;
  readonly addJob: (input: AddJobInput<TInput>) => void;
  readonly addJobAsync: (input: AddJobInput<TInput>) => Promise<BackgroundJob<TInput, TResult>>;
  readonly updateJob: (input: UpdateJobInput) => void;
  readonly removeJob: (id: string) => void;
  readonly clearCompleted: () => void;
  readonly clearFailed: () => void;
  readonly getJob: (id: string) => BackgroundJob<TInput, TResult> | undefined;
}

export function usePendingJobs<TInput = unknown, TResult = unknown>(
  options: UsePendingJobsOptions = {},
): UsePendingJobsReturn<TInput, TResult> {
  const queryClient = useQueryClient();
  const queryKey = options.queryKey ?? DEFAULT_QUEUE_CONFIG.queryKey;

  const { data: jobs = [] } = useQuery<BackgroundJob<TInput, TResult>[]>({
    queryKey,
    queryFn: () => [],
    staleTime: Infinity,
    gcTime: 30 * 60 * 1000,
    enabled: options.enabled !== false,
  });

  const addJobMutation = useMutation({
    mutationFn: (input: AddJobInput<TInput>) => {
      const newJob: BackgroundJob<TInput, TResult> = {
        id: input.id,
        input: input.input,
        type: input.type,
        status: input.status ?? "queued",
        progress: input.progress ?? 0,
        createdAt: new Date(),
      };
      return Promise.resolve(newJob);
    },
    onSuccess: (newJob: BackgroundJob<TInput, TResult>) => {
      queryClient.setQueryData<BackgroundJob<TInput, TResult>[]>(
        queryKey,
        (old: BackgroundJob<TInput, TResult>[] | undefined) => [newJob, ...(old ?? [])],
      );
    },
  });

  const updateJobMutation = useMutation({
    mutationFn: ({ id, updates }: UpdateJobInput) =>
      Promise.resolve({ id, updates: updates as Partial<BackgroundJob<TInput, TResult>> }),
    onSuccess: ({ id, updates }: { id: string; updates: Partial<BackgroundJob<TInput, TResult>> }) => {
      queryClient.setQueryData<BackgroundJob<TInput, TResult>[]>(
        queryKey,
        (old: BackgroundJob<TInput, TResult>[] | undefined) => {
          if (!old) return [];
          return old.map((job: BackgroundJob<TInput, TResult>) =>
            job.id === id ? ({ ...job, ...updates } as BackgroundJob<TInput, TResult>) : job,
          );
        },
      );
    },
  });

  const removeJobMutation = useMutation({
    mutationFn: (id: string) => Promise.resolve(id),
    onSuccess: (id: string) => {
      queryClient.setQueryData<BackgroundJob<TInput, TResult>[]>(
        queryKey,
        (old: BackgroundJob<TInput, TResult>[] | undefined) => old?.filter((job: BackgroundJob<TInput, TResult>) => job.id !== id) ?? [],
      );
    },
  });

  const clearCompletedMutation = useMutation({
    mutationFn: () => Promise.resolve(null),
    onSuccess: () => {
      queryClient.setQueryData<BackgroundJob<TInput, TResult>[]>(
        queryKey,
        (old: BackgroundJob<TInput, TResult>[] | undefined) => old?.filter((job: BackgroundJob<TInput, TResult>) => job.status !== "completed") ?? [],
      );
    },
  });

  const clearFailedMutation = useMutation({
    mutationFn: () => Promise.resolve(null),
    onSuccess: () => {
      queryClient.setQueryData<BackgroundJob<TInput, TResult>[]>(
        queryKey,
        (old: BackgroundJob<TInput, TResult>[] | undefined) => old?.filter((job: BackgroundJob<TInput, TResult>) => job.status !== "failed") ?? [],
      );
    },
  });

  const getJob = (id: string) => jobs.find((job: BackgroundJob<TInput, TResult>) => job.id === id);

  return {
    jobs,
    hasJobs: jobs.length > 0,
    addJob: addJobMutation.mutate,
    addJobAsync: addJobMutation.mutateAsync,
    updateJob: updateJobMutation.mutate,
    removeJob: removeJobMutation.mutate,
    clearCompleted: clearCompletedMutation.mutate,
    clearFailed: clearFailedMutation.mutate,
    getJob,
  };
}
