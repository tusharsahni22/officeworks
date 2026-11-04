import { createGlobalStyle } from 'styled-components';

export const tokens = {
  colors: {
    color6: '#F5F5F5',      // Background: Clean mineral neutral
    color1: '#000000',      // Text Primary: Pitch black
    color3: '#989898',      // Text Secondary: Muted stone grey
    color2: '#BC1B20',      // Accent: Destructive / Warning red
    color5: '#E3E3E3',      // Border: Clean hairline stroke
    color4: '#879DAF',      // Background Dark / Oceanic slate
    color7: '#FFFFFF',      // Text Light / Pure white
    surface: '#FFFFFF',
    overlay: 'rgba(0, 0, 0, 0.6)'
  },
  typography: {
    fontFamilies: {
      oracle: "'Helvetica Neue', 'Helvetica', -apple-system, BlinkMacSystemFont, sans-serif",
      serif: "'Times New Roman', Times, serif"
    },
    sizes: {
      textXs: '11px',
      textSm: '12px',
      textBase: '14px',
      textLg: '16px',
      textXl: '18px',
      text2xl: '22px',
      text3xl: '26px',
      text4xl: '32px',
      textHero: '48px'
    },
    weights: {
      regular: 400
    },
    lineHeights: {
      tight: '1.15',
      normal: '1.45',
      relaxed: '1.6'
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
    radiusSm: '2px',
    radiusMd: '7.5px',
    radiusLg: '8px',
    radiusXl: '12px',
    radius16: '16px',
    radius6: '24px',
    radius7: '28px',
    radiusFull: '9999px'
  },
  motion: {
    durationFast: '0.15s ease-out',
    durationBase: 'color 0.2s linear, opacity 0.2s linear, transform 0.2s linear',
    durationSlow: '0.5s ease-in-out both'
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
  }

  body {
    background-color: ${tokens.colors.color6};
    color: ${tokens.colors.color1};
    font-family: ${tokens.typography.fontFamilies.oracle};
    font-weight: ${tokens.typography.weights.regular};
    font-size: ${tokens.typography.sizes.textBase};
    line-height: ${tokens.typography.lineHeights.normal};
    -webkit-font-smoothing: antialiased;
    letter-spacing: -0.01em;
  }

  #root {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  h1, h2, h3, h4, h5 {
    font-family: ${tokens.typography.fontFamilies.oracle};
    font-weight: ${tokens.typography.weights.regular};
    letter-spacing: -0.03em;
    color: ${tokens.colors.color1};
    text-transform: uppercase;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button, input, textarea {
    font-family: inherit;
  }

  img {
    display: block;
    max-width: 100%;
  }

  :focus-visible {
    outline: 1px solid ${tokens.colors.color1};
    outline-offset: 2px;
  }
`;
