/**
 * Maps a 0-100 intensity slider value to AI model strength parameter.
 * Range: 0→0.30, 50→0.61, 100→0.92
 * Input is clamped to [0, 100].
 */
export const intensityToStrength = (intensity: number): number => {
  const clamped = Math.max(0, Math.min(100, intensity));
  return 0.3 + (clamped / 100) * 0.62;
};
