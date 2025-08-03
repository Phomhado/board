import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';

// Extend RenderOptions to include our custom wrapper
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  wrapper?: React.ComponentType<{ children: React.ReactNode }>;
}

// Custom render function that includes ThemeProvider
const customRender = (
  ui: React.ReactElement,
  options?: CustomRenderOptions
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );

  return render(ui, { wrapper: Wrapper, ...options });
};

// Re-export everything from testing library
export * from '@testing-library/react';

// Override render method
export { customRender as render };

// Export theme for tests that need it
export { theme };