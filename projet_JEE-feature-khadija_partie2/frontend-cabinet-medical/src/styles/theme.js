import { createTheme } from '@mui/material/styles';

// Palette de couleurs Violette
export const theme = createTheme({
    palette: {
        primary: {
            main: '#7C4DFF',        // Violet principal
            light: '#B388FF',       // Violet clair
            dark: '#6A1B9A',        // Violet foncé
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#AB47BC',        // Violet secondaire
            light: '#CE93D8',       // Mauve clair
            dark: '#8E24AA',        // Violet foncé
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#F3E5F5',     // Fond violet très pâle
            paper: '#FFFFFF',       // Fond des cartes
        },
        success: {
            main: '#66BB6A',        // Vert
        },
        error: {
            main: '#EF5350',        // Rouge
        },
        warning: {
            main: '#FFA726',        // Orange
        },
        info: {
            main: '#7C4DFF',        // Violet info
        },
        text: {
            primary: '#263238',     // Texte principal
            secondary: '#546E7A',   // Texte secondaire
        },
    },
    typography: {
        fontFamily: '"Poppins", "Roboto", "Arial", sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 600,
            color: '#263238',
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
            color: '#263238',
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 500,
            color: '#263238',
        },
    },
    shape: {
        borderRadius: 12,
    },
    shadows: [
        'none',
        '0px 2px 4px rgba(124, 77, 255, 0.1)',
        '0px 4px 8px rgba(124, 77, 255, 0.15)',
        '0px 8px 16px rgba(124, 77, 255, 0.2)',
        '0px 12px 24px rgba(124, 77, 255, 0.25)',
        '0px 16px 32px rgba(124, 77, 255, 0.3)',
        '0px 20px 40px rgba(124, 77, 255, 0.35)',
        '0px 24px 48px rgba(124, 77, 255, 0.4)',
        ...Array(17).fill('0px 24px 48px rgba(124, 77, 255, 0.4)'),
    ],
});