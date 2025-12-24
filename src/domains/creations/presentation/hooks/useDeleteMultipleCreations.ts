/**
 * useDeleteMultipleCreations Hook
 * Handles batch deletion of user creations with optimistic update
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ICreationsRepository } from "../../domain/repositories/ICreationsRepository";
import type { Creation } from "../../domain/entities/Creation";

interface UseDeleteMultipleCreationsProps {
    readonly userId: string | null;
    readonly repository: ICreationsRepository;
}

export function useDeleteMultipleCreations({
    userId,
    repository,
}: UseDeleteMultipleCreationsProps) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (creationIds: string[]) => {
            if (!userId) return false;
            return repository.deleteMultiple(userId, creationIds);
        },
        onMutate: async (creationIds) => {
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
                    old?.filter((c) => !creationIds.includes(c.id)) ?? [],
            );

            return { previous };
        },
        onError: (_err, _ids, rollback) => {
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
