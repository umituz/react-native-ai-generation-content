export const SCRIPT_DURATIONS = [4] as const;

export type ScriptDuration = (typeof SCRIPT_DURATIONS)[number];
