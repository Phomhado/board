import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/styles/theme'

const customRender = (ui: React.ReactElement, options?: any) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>, options);

export * from '@testing-library/react';
export { customRender as render };
