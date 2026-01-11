/**
 * useDeleteCreation Hook
 * Handles deletion of user creations with optimistic update
 */

import { useMutation, useQueryClient } from "@umituz/react-native-design-system";
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
  const queryKey = ["creations", userId ?? ""];

  return useMutation({
    mutationFn: async (creationId: string) => {
      if (!userId) return false;
      return repository.delete(userId, creationId);
    },
    onMutate: async (creationId: string) => {
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData<Creation[]>(queryKey);

      if (previousData) {
        queryClient.setQueryData<Creation[]>(queryKey, (old: Creation[] | undefined) =>
          old?.filter((c: Creation) => c.id !== creationId) ?? []
        );
      }

      return { previousData };
    },
    onError: (_error: Error, _variables: string, context: { previousData?: Creation[] } | undefined) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey });
    },
  });
}
