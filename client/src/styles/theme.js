import { createGlobalStyle } from 'styled-components';

export const tokens = {
  colors: {
    bg: '#FFFFFF',
    canvasMuted: '#F8F8F8',
    surface: '#FFFFFF',
    textPrimary: '#000000',
    textSecondary: '#666666',
    border: '#EEEEEE',
    borderLight: '#F0F0F0',
    accentRed: '#BC1B20',
    heroBg: '#0b1928',
    pillBg: 'rgba(255, 255, 255, 0.9)',
    pillText: '#000000'
  },
  typography: {
    fontFamilies: {
      sans: "'Helvetica Neue', Helvetica, Arial, -apple-system, sans-serif"
    },
    sizes: {
      xs: '10px',
      sm: '12px',
      base: '13px',
      md: '15px',
      lg: '18px',
      xl: '24px',
      hero: '38px'
    }
  },
  radii: {
    pill: '9999px',
    card: '8px'
  }
};

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    width: 100%;
    min-height: 100%;
    background-color: ${tokens.colors.bg};
    color: ${tokens.colors.textPrimary};
    font-family: ${tokens.typography.fontFamilies.sans};
    -webkit-font-smoothing: antialiased;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button, input, textarea {
    font-family: inherit;
  }
`;
