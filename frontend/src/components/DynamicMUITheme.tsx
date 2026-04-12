import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import type { SiteConfig } from '@/types/builder';

interface DynamicMUIThemeProps {
    config: SiteConfig;
    children: React.ReactNode;
}

export function DynamicMUITheme({ config, children }: DynamicMUIThemeProps) {
    const theme = createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: config.primaryColor,
                contrastText: config.textColor,
            },
            secondary: {
                main: config.secondaryColor,
            },
            warning: {
                main: config.accentColor, // For highlights/badges
            },
            background: {
                default: config.backgroundColor,
                paper: '#ffffff',
            },
            text: {
                primary: config.textColor,
                secondary: '#79747e',
            },
            divider: '#c4c7c5',
        },
        typography: {
            fontFamily: '"Inter", "sans-serif"',
            h1: {
                fontFamily: '"Playfair Display", "serif"',
            },
            h2: {
                fontFamily: '"Playfair Display", "serif"',
            },
            h3: {
                fontFamily: '"Playfair Display", "serif"',
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

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}
