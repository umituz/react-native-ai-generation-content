/**
 * Debug logging utility with __DEV__ guard
 * Centralized debug logging for development
 */

type LogLevel = "log" | "warn" | "error" | "info";

export interface DebugOptions {
  readonly tag?: string;
}

declare const __DEV__: boolean;

const isDev = typeof __DEV__ !== "undefined" && __DEV__;

function formatMessage(tag: string | undefined, message: string): string {
  return tag ? `[${tag}] ${message}` : message;
}

function log(level: LogLevel, tag: string | undefined, message: string, ...args: readonly unknown[]): void {
  if (!isDev) return;

  const formattedMessage = formatMessage(tag, message);

  switch (level) {
    case "error":
      console.error(formattedMessage, ...args);
      break;
    case "warn":
      console.warn(formattedMessage, ...args);
      break;
    case "info":
      console.info(formattedMessage, ...args);
      break;
    default:
      console.log(formattedMessage, ...args);
  }
}

export const debug = {
  log: (message: string, options?: DebugOptions, ...args: readonly unknown[]): void =>
    log("log", options?.tag, message, ...args),

  warn: (message: string, options?: DebugOptions, ...args: readonly unknown[]): void =>
    log("warn", options?.tag, message, ...args),

  error: (message: string, options?: DebugOptions, ...args: readonly unknown[]): void =>
    log("error", options?.tag, message, ...args),

  info: (message: string, options?: DebugOptions, ...args: readonly unknown[]): void =>
    log("info", options?.tag, message, ...args),
};
