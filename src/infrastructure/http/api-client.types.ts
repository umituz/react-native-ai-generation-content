/**
 * API Client Types
 * Type definitions for HTTP client utilities
 */

export interface RequestOptions extends RequestInit {
  timeout?: number;
  retries?: number;
  headers?: Record<string, string>;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
  headers: Headers;
}
