import 'styled-components';

interface ThemeColors {
  background: string;
  primary: string;
  secondary: string;
  text: string;
  white: string;
  gray: string;
  lightGray: string;
  dark: string;
  danger: string;
  success: string;
  warning: string;
  igmaYellow: string;
}

interface ThemeFont {
  base: string;
  family: string;
}

interface ThemeShadows {
  base: string;
  hover: string;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ThemeColors;
    borderRadius: string;
    spacing: (factor: number) => string;
    font: ThemeFont;
    shadows: ThemeShadows;
  }
}