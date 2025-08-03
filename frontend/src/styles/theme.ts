export const theme = {
  colors: {
    background: '#f4f6f8',
    primary: '#1e88e5',
    secondary: '#42a5f5',
    text: '#333',
    white: '#fff',
    gray: '#cfd8dc',
    lightGray: '#eceff1',
    dark: '#263238',
    danger: '#ef5350',
    success: '#66bb6a',
    warning: '#ffa726',
    igmaYellow: '#f2c94c',
  },
  borderRadius: '8px',
  spacing: (factor: number) => `${factor * 8}px`,
  font: {
    base: '16px',
    family: `'Inter', sans-serif`,
  },
  shadows: {
    base: '0 4px 8px rgba(0,0,0,0.05)',
    hover: '0 6px 12px rgba(0,0,0,0.08)',
  },
};
