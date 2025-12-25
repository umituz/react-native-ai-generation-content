/**
 * useDeleteCreation Hook
 * Handles deletion of user creations with optimistic update
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ICreationsRepository } from "../../domain/repositories/ICreationsRepository";
import type { Creation } from "../../domain/entities/Creation";

interface UseDeleteCreationProps {
  readonly userId: string | null;
  readonly repository: ICreationsRepository;
}

export function useDeleteCreation({
  userId,
  repository,
}: UseDeleteCreationProps) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (creationId: string) => {
      if (!userId) return false;
      return repository.delete(userId, creationId);
    },
    onMutate: async (creationId) => {
      if (!userId) return;

      await queryClient.cancelQueries({
        queryKey: ["creations", userId],
      });

      const previous = queryClient.getQueryData<Creation[]>([
        "creations",
        userId,
      ]);

      queryClient.setQueryData<Creation[]>(
        ["creations", userId],
        (old) => old?.filter((c) => c.id !== creationId) ?? [],
      );

      return { previous };
    },
    onError: (_err, _id, rollback) => {
      if (userId && rollback?.previous) {
        queryClient.setQueryData(["creations", userId], rollback.previous);
      }
    },
  });
}
