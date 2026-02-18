/**
 * Script Duration Constants
 * Generic script duration values — reusable across all apps
 */

export const SCRIPT_DURATIONS = [4] as const;

export type ScriptDuration = (typeof SCRIPT_DURATIONS)[number];
