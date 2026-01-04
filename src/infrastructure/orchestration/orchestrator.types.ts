/**
 * Orchestrator Types
 * Type definitions for AI generation orchestration
 */

export interface CreditService {
  getBalance(userId: string): Promise<number>;
  deduct(userId: string, amount: number): Promise<boolean>;
  add(userId: string, amount: number): Promise<void>;
}

export interface PaywallService {
  show(requiredCredits: number): void;
}

export interface NetworkService {
  isOnline(): boolean;
}

export interface AuthService {
  getUserId(): string | null;
  isAuthenticated(): boolean;
}

export interface GenerationMetadata {
  creditCost?: number;
  numImages?: number;
  duration?: number;
  isPremium?: boolean;
  [key: string]: unknown;
}

export type GenerationCapability =
  | "text-to-image"
  | "text-to-video"
  | "image-to-video"
  | "text-to-voice";

export interface OrchestratorConfig {
  creditService: CreditService;
  paywallService: PaywallService;
  networkService: NetworkService;
  authService: AuthService;
  calculateCreditCost: (
    capability: GenerationCapability,
    metadata?: GenerationMetadata,
  ) => number;
}
