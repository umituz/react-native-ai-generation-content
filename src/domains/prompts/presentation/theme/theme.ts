import type { Theme } from './types';
import { defaultTheme } from './types';

let currentTheme = defaultTheme;

export const useTheme = (): Theme => currentTheme;

export const setTheme = (theme: Partial<Theme>): void => {
  currentTheme = { ...currentTheme, ...theme };
};

export const getTheme = (): Theme => currentTheme;

export const resetTheme = (): void => {
  currentTheme = defaultTheme;
};