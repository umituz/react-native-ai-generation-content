/**
 * Generation Services Provider
 * Provides app-specific auth/credit/callback services to generation hooks.
 * Apps wire their own implementations once in the provider tree.
 */

import React, {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";

export interface GenerationServicesValue {
  /** Current authenticated user ID (undefined = not authenticated) */
  readonly userId: string | undefined;
  /** Deduct credits. Returns true if successful, false if insufficient. */
  readonly deductCredits: (cost: number) => Promise<boolean>;
  /** Refund credits on generation failure. */
  readonly refundCredits: (cost: number) => Promise<void>;
  /** Optional callback after successful generation (e.g. rating prompt) */
  readonly onGenerationSuccess?: () => void;
}

export interface GenerationServicesProviderProps
  extends GenerationServicesValue {
  readonly children: ReactNode;
}

const GenerationServicesContext =
  createContext<GenerationServicesValue | null>(null);

export const GenerationServicesProvider: React.FC<
  GenerationServicesProviderProps
> = ({ userId, deductCredits, refundCredits, onGenerationSuccess, children }) => {
  const value = useMemo<GenerationServicesValue>(
    () => ({ userId, deductCredits, refundCredits, onGenerationSuccess }),
    [userId, deductCredits, refundCredits, onGenerationSuccess],
  );

  return (
    <GenerationServicesContext.Provider value={value}>
      {children}
    </GenerationServicesContext.Provider>
  );
};

/**
 * Access generation services from context.
 * Must be used within GenerationServicesProvider.
 */
export const useGenerationServices = (): GenerationServicesValue => {
  const context = useContext(GenerationServicesContext);
  if (!context) {
    throw new Error(
      "useGenerationServices must be used within GenerationServicesProvider",
    );
  }
  return context;
};
