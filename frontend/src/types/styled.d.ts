import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
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
    };
    borderRadius: string;
    spacing: (factor: number) => string;
    font: {
      base: string;
      family: string;
    };
    shadows: {
      base: string;
      hover: string;
    };
  }
}
