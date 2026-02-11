import type { Creation } from "../../../../creations/domain/entities/Creation";

export const isCreation = (result: unknown): result is Creation => {
  if (!result || typeof result !== "object") return false;
  const creation = result as Partial<Creation>;
  return (
    typeof creation.id === "string" &&
    typeof creation.uri === "string" &&
    typeof creation.type === "string" &&
    creation.createdAt instanceof Date &&
    typeof creation.isShared === "boolean"
  );
};
