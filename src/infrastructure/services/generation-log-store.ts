/**
 * Generation Log Store
 * Session-scoped log buffer for generation executors.
 * Each generation gets an isolated session — concurrent generations don't corrupt each other.
 *
 * Flow:
 * 1. Executor calls startGenerationLogSession() → gets sessionId
 * 2. Executor calls addGenerationLog(sessionId, ...) → logs accumulate
 * 3. Executor calls provider.endLogSession() → gets provider logs
 * 4. Executor calls addGenerationLogs(sessionId, providerLogs) → appends
 * 5. Persistence layer calls consumeGenerationLogs(sessionId) → writes to Firestore
 */

import type { ProviderLogEntry } from "../../domain/interfaces/ai-provider.interface";

interface LogSession {
  readonly startTime: number;
  entries: ProviderLogEntry[];
}

let sessionCounter = 0;
const sessions = new Map<string, LogSession>();

/**
 * Start a new isolated log session. Returns session ID.
 * Call at the beginning of each generation.
 */
export function startGenerationLogSession(): string {
  const id = `gen_${++sessionCounter}_${Date.now()}`;
  sessions.set(id, { startTime: Date.now(), entries: [] });
  return id;
}

/**
 * Append log entries to a specific session (e.g. provider logs)
 */
export function addGenerationLogs(sessionId: string, logs: ProviderLogEntry[]): void {
  const session = sessions.get(sessionId);
  if (session) {
    session.entries.push(...logs);
  }
}

/**
 * Add a single log entry with proper elapsed calculation
 */
export function addGenerationLog(
  sessionId: string,
  tag: string,
  message: string,
  level: ProviderLogEntry['level'] = 'info',
  data?: Record<string, unknown>,
): void {
  const session = sessions.get(sessionId);
  const now = Date.now();

  const entry: ProviderLogEntry = {
    timestamp: now,
    elapsed: session ? now - session.startTime : 0,
    level,
    tag,
    message,
    ...(data && { data }),
  };

  if (session) {
    session.entries.push(entry);
  }

  if (typeof __DEV__ !== 'undefined' && __DEV__) {
    const fn = level === 'error' ? console.error : level === 'warn' ? console.warn : console.log;
    fn(`[${tag}] ${message}`, data ?? '');
  }
}

/**
 * Get and clear all stored logs for a session (consume pattern).
 * Removes the session after consuming.
 */
export function consumeGenerationLogs(sessionId: string): ProviderLogEntry[] {
  const session = sessions.get(sessionId);
  if (!session) return [];
  const logs = [...session.entries];
  sessions.delete(sessionId);
  return logs;
}

/**
 * Get logs without clearing
 */
export function getGenerationLogs(sessionId: string): ProviderLogEntry[] {
  return [...(sessions.get(sessionId)?.entries ?? [])];
}

/**
 * Clear a specific session's logs
 */
export function clearGenerationLogs(sessionId: string): void {
  sessions.delete(sessionId);
}
