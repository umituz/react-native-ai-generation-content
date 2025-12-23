import type { Theme } from './types';
import { useTheme } from './theme';

export const createStyleSheet = <T extends Record<string, any>>(
  styles: (theme: Theme) => T
): T => {
  const theme = useTheme();
  return styles(theme);
};

export const spacing = (key: keyof Theme['spacing'], customTheme?: Theme): number => {
  const theme = customTheme || useTheme();
  return theme.spacing[key];
};

export const color = (key: keyof Theme['colors'], customTheme?: Theme): string => {
  const theme = customTheme || useTheme();
  return theme.colors[key];
};

export const typography = (key: keyof Theme['typography'], customTheme?: Theme) => {
  const theme = customTheme || useTheme();
  return theme.typography[key];
};