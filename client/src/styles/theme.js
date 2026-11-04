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
    pillText: '#000000',
    overlay: 'rgba(0, 0, 0, 0.6)',
    color1: '#000000',
    color2: '#BC1B20',
    color3: '#777777',
    color4: '#879DAF',
    color5: '#EEEEEE',
    color6: '#F8F8F8',
    color7: '#FFFFFF'
  },
  typography: {
    fontFamilies: {
      sans: "'Helvetica Neue', Helvetica, Arial, -apple-system, sans-serif",
      oracle: "'Helvetica Neue', Helvetica, Arial, -apple-system, sans-serif"
    },
    sizes: {
      xs: '10px',
      sm: '12px',
      base: '13px',
      md: '15px',
      lg: '18px',
      xl: '24px',
      hero: '38px',
      textXs: '11px',
      textSm: '12px',
      textBase: '13px',
      textLg: '16px',
      textXl: '18px',
      text2xl: '22px',
      text3xl: '26px',
      text4xl: '32px'
    },
    lineHeights: {
      tight: 1.15,
      normal: 1.45,
      relaxed: 1.6
    }
  },
  spacing: {
    space1: '2px',
    space2: '3px',
    space3: '4px',
    space4: '5px',
    space5: '6px',
    space6: '7px',
    space7: '8px',
    space8: '9px',
    space9: '10px',
    space10: '11px',
    space11: '12px',
    space12: '13px',
    space13: '14px',
    space14: '16px',
    space15: '20px',
    space16: '22px',
    space17: '24px',
    space18: '26px',
    space19: '27px',
    space20: '32px',
    space21: '40px',
    space22: '50px',
    space23: '55px',
    space24: '80px',
    space25: '154px',
    space26: '295px'
  },
  radii: {
    pill: '9999px',
    card: '8px',
    radiusSm: '2px',
    radiusMd: '8px',
    radiusLg: '12px'
  },
  motion: {
    durationBase: '0.2s ease',
    durationFast: '0.15s ease'
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
