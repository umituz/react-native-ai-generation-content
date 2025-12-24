/**
 * useToggleFavorite Hook
 * Handles favoriting/unfavoriting of user creations with optimistic update
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ICreationsRepository } from "../../domain/repositories/ICreationsRepository";
import type { Creation } from "../../domain/entities/Creation";

interface UseToggleFavoriteProps {
    readonly userId: string | null;
    readonly repository: ICreationsRepository;
}

export function useToggleFavorite({
    userId,
    repository,
}: UseToggleFavoriteProps) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (creationId: string) => {
            if (!userId) return false;
            return repository.toggleFavorite(userId, creationId);
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
                (old) =>
                    old?.map((c) =>
                        c.id === creationId ? { ...c, isFavorite: !c.isFavorite } : c,
                    ) ?? [],
            );

            return { previous };
        },
        onError: (_err, _id, rollback) => {
            if (userId && rollback?.previous) {
                queryClient.setQueryData(["creations", userId], rollback.previous);
            }
        },
        onSettled: () => {
            if (userId) {
                queryClient.invalidateQueries({ queryKey: ["creations", userId] });
            }
        },
    });
}
