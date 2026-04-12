import { createTheme, type Theme, alpha } from '@mui/material/styles';
import type { SiteConfig } from '@/types/builder';

/**
 * Thème statique par défaut (conservé pour compatibilité)
 */
const defaultTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#f2f20d',
      contrastText: '#181811',
      transparent: alpha('#f2f20d', 0.15), // 15% opacity
    },
    background: {
      default: '#f8f8f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#181811',
      secondary: '#79747e',
    },
    divider: '#c4c7c5',
  },
  typography: {
    fontFamily: '"Inter", "sans-serif"',
    h1: {
      fontFamily: '"Playfair Display"',
    },
    h2: {
      fontFamily: '"Playfair Display"',
    },
    h3: {
      fontFamily: '"Playfair Display"',
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
  },
});

/**
 * Créer un thème MUI dynamique à partir de la configuration du site
 */
export function createThemeFromConfig(config: SiteConfig): Theme {
  const primaryColor = config.primaryColor || '#f2f20d';

  return createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: primaryColor,
        contrastText: config.textColor || '#181811',
        transparent: alpha(primaryColor, 0.15), // 15% opacity
      },
      secondary: {
        main: config.secondaryColor || '#f5f5f5',
      },
      background: {
        default: config.backgroundColor || '#f8f8f5',
        paper: '#ffffff',
      },
      text: {
        primary: config.textColor || '#181811',
        secondary: '#79747e',
      },
      divider: '#c4c7c5',
    },
    typography: {
      fontFamily: '"Inter", "sans-serif"',
      h1: {
        fontFamily: '"Playfair Display"',
      },
      h2: {
        fontFamily: '"Playfair Display"',
      },
      h3: {
        fontFamily: '"Playfair Display"',
      },
      button: {
        textTransform: 'none',
        fontWeight: 700,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '4px',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '4px',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
          },
        },
      },
    },
  });
}

export default defaultTheme;
