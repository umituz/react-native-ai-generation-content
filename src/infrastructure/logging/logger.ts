/**
 * Production-Ready Logging Utility
 * Provides structured logging with levels and context
 */

declare const __DEV__: boolean;

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4,
}

export interface LogContext {
  readonly [key: string]: unknown;
}

export interface LogEntry {
  readonly level: LogLevel;
  readonly timestamp: number;
  readonly message: string;
  readonly context?: LogContext;
  readonly error?: Error;
}

class Logger {
  private minLevel: LogLevel;
  private logs: LogEntry[] = [];
  private maxLogs = 1000;

  constructor() {
    // In production, only log WARN and ERROR
    this.minLevel =
      typeof __DEV__ !== "undefined" && __DEV__ ? LogLevel.DEBUG : LogLevel.WARN;
  }

  setMinLevel(level: LogLevel): void {
    this.minLevel = level;
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.minLevel;
  }

  private addLog(entry: LogEntry): void {
    this.logs.push(entry);
    // Keep only last maxLogs entries
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }
  }

  debug(message: string, context?: LogContext): void {
    if (!this.shouldLog(LogLevel.DEBUG)) return;

    const entry: LogEntry = {
      level: LogLevel.DEBUG,
      timestamp: Date.now(),
      message,
      context,
    };

    this.addLog(entry);

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log(`[DEBUG] ${message}`, context || "");
    }
  }

  info(message: string, context?: LogContext): void {
    if (!this.shouldLog(LogLevel.INFO)) return;

    const entry: LogEntry = {
      level: LogLevel.INFO,
      timestamp: Date.now(),
      message,
      context,
    };

    this.addLog(entry);

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.info(`[INFO] ${message}`, context || "");
    }
  }

  warn(message: string, context?: LogContext): void {
    if (!this.shouldLog(LogLevel.WARN)) return;

    const entry: LogEntry = {
      level: LogLevel.WARN,
      timestamp: Date.now(),
      message,
      context,
    };

    this.addLog(entry);
    console.warn(`[WARN] ${message}`, context || "");
  }

  error(message: string, error?: Error | unknown, context?: LogContext): void {
    if (!this.shouldLog(LogLevel.ERROR)) return;

    const errorObj =
      error instanceof Error ? error : error ? new Error(String(error)) : undefined;

    const entry: LogEntry = {
      level: LogLevel.ERROR,
      timestamp: Date.now(),
      message,
      context,
      error: errorObj,
    };

    this.addLog(entry);
    console.error(`[ERROR] ${message}`, errorObj || "", context || "");
  }

  getLogs(level?: LogLevel): readonly LogEntry[] {
    if (level !== undefined) {
      return this.logs.filter((log) => log.level >= level);
    }
    return this.logs;
  }

  clearLogs(): void {
    this.logs = [];
  }

  // Convenience methods for specific domains
  processing(message: string, context?: LogContext): void {
    this.debug(`[Processing] ${message}`, context);
  }

  generation(message: string, context?: LogContext): void {
    this.debug(`[Generation] ${message}`, context);
  }

  polling(message: string, context?: LogContext): void {
    this.debug(`[Polling] ${message}`, context);
  }

  moderation(message: string, context?: LogContext): void {
    this.info(`[Moderation] ${message}`, context);
  }

  network(message: string, context?: LogContext): void {
    this.info(`[Network] ${message}`, context);
  }

  storage(message: string, context?: LogContext): void {
    this.debug(`[Storage] ${message}`, context);
  }

  validation(message: string, context?: LogContext): void {
    this.warn(`[Validation] ${message}`, context);
  }
}

// Singleton instance
export const logger = new Logger();

// Development helper
export function setDevelopmentMode(): void {
  logger.setMinLevel(LogLevel.DEBUG);
}

// Production helper
export function setProductionMode(): void {
  logger.setMinLevel(LogLevel.WARN);
}

