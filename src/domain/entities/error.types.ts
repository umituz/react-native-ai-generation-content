/**
 * AI Generation Error Types
 * Provider-agnostic error classification
 */

export enum AIErrorType {
  NETWORK = "NETWORK",
  RATE_LIMIT = "RATE_LIMIT",
  AUTHENTICATION = "AUTHENTICATION",
  VALIDATION = "VALIDATION",
  CONTENT_POLICY = "CONTENT_POLICY",
  SERVER = "SERVER",
  TIMEOUT = "TIMEOUT",
  UNKNOWN = "UNKNOWN",
}

export interface AIErrorInfo {
  type: AIErrorType;
  messageKey: string;
  originalError?: unknown;
  statusCode?: number;
}

export interface AIErrorMessages {
  [AIErrorType.NETWORK]: string;
  [AIErrorType.RATE_LIMIT]: string;
  [AIErrorType.AUTHENTICATION]: string;
  [AIErrorType.VALIDATION]: string;
  [AIErrorType.CONTENT_POLICY]: string;
  [AIErrorType.SERVER]: string;
  [AIErrorType.TIMEOUT]: string;
  [AIErrorType.UNKNOWN]: string;
}
