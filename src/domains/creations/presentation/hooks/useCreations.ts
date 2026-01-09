/**
 * useCreations Hook
 * Fetches user's creations from repository
 */

import { useQuery } from "@umituz/react-native-design-system";
import type { ICreationsRepository } from "../../domain/repositories/ICreationsRepository";
import type { Creation } from "../../domain/entities/Creation";

const CACHE_CONFIG = {
  staleTime: 5 * 60 * 1000, // 5 minutes - use cache invalidation on mutations
  gcTime: 30 * 60 * 1000,
};

interface UseCreationsProps {
  readonly userId: string | null;
  readonly repository: ICreationsRepository;
  readonly enabled?: boolean;
}

export function useCreations({
  userId,
  repository,
  enabled = true,
}: UseCreationsProps) {
  return useQuery<Creation[]>({
    queryKey: ["creations", userId ?? ""],
    queryFn: async () => {
      if (!userId) {
        return [];
      }
      return repository.getAll(userId);
    },
    enabled: !!userId && enabled,
    staleTime: CACHE_CONFIG.staleTime,
    gcTime: CACHE_CONFIG.gcTime,
  });
}
