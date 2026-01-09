/**
 * useCreationRating Hook
 * Handles rating of creations with optimistic update
 */

import { useMutation, useQueryClient } from "@umituz/react-native-design-system";
import type { ICreationsRepository } from "../../domain/repositories/ICreationsRepository";
import type { Creation } from "../../domain/entities/Creation";

interface UseCreationRatingProps {
  readonly userId: string | null;
  readonly repository: ICreationsRepository;
}

interface RatingVariables {
  readonly id: string;
  readonly rating: number;
}

export function useCreationRating({
  userId,
  repository,
}: UseCreationRatingProps) {
  const queryClient = useQueryClient();
  const queryKey = ["creations", userId ?? ""];

  return useMutation({
    mutationFn: async ({ id, rating }: RatingVariables) => {
      if (!userId) return false;
      return repository.rate(userId, id, rating);
    },
    onMutate: async ({ id, rating }: RatingVariables) => {
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData<Creation[]>(queryKey);

      if (previousData) {
        queryClient.setQueryData<Creation[]>(queryKey, (old) =>
          old?.map((c) =>
            c.id === id ? { ...c, rating, ratedAt: new Date() } : c
          ) ?? []
        );
      }

      return { previousData };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey });
    },
  });
}
