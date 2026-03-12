/**
 * Repository Singleton
 * Prevents multiple repository instances across hooks
 */

import { createCreationsRepository } from "../../../domains/creations/infrastructure/adapters";

const REPO_COLLECTION = "creations";

let repositoryInstance: ReturnType<typeof createCreationsRepository> | null = null;

export function getCreationsRepository() {
  if (!repositoryInstance) {
    repositoryInstance = createCreationsRepository(REPO_COLLECTION);
  }
  return repositoryInstance;
}
