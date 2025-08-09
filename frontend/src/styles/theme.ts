export const theme = {
  colors: {
    background: '#F9FAFB',  
    surface: '#FFFFFF', 
    primary: '#4F46E5', 
    primaryHover: '#4338CA',
    secondary: '#14B8A6', 
    text: '#1F2937', 
    textLight: '#6B7280', 
    border: '#E5E7EB', 
    danger: '#EF4444', 
    success: '#22C55E', 
    warning: '#F59E0B', 
  },
  font: {
    family: `'Inter', sans-serif`,
    size: {
      small: '0.875rem',
      medium: '1rem', 
      large: '1.25rem',
      xlarge: '1.5rem',
    },
    weight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
  spacing: (factor: number) => `${factor * 0.25}rem`,
  radius: {
    small: '6px',
    medium: '10px',
    large: '16px',
    round: '50%',
  },
  shadow: {
    small: '0 1px 3px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 6px rgba(0, 0, 0, 0.1)',
    large: '0 10px 15px rgba(0, 0, 0, 0.15)',
  },
};

export type ThemeType = typeof theme;
