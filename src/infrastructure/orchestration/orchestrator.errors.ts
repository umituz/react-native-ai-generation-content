/**
 * Orchestrator Errors
 * Custom error classes for AI generation orchestration
 */

export class NetworkUnavailableError extends Error {
  constructor() {
    super("No internet connection. Please check your network and try again.");
    this.name = "NetworkUnavailableError";
  }
}

export class InsufficientCreditsError extends Error {
  constructor(
    public required: number,
    public current: number,
    public capability: string,
  ) {
    super(`Insufficient credits. Required: ${required}, Current: ${current}`);
    this.name = "InsufficientCreditsError";
  }
}

export class AuthenticationRequiredError extends Error {
  constructor() {
    super("User not authenticated. This operation requires authentication.");
    this.name = "AuthenticationRequiredError";
  }
}
