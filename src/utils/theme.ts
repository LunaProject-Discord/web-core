import { createTheme, PaletteOptions, Theme } from '@mui/material';
import { blue, green, indigo, orange, pink, red } from '@mui/material/colors';
import { TypographyOptions } from '@mui/material/styles/createTypography';

export const MuiPalette: PaletteOptions = {
    primary: {
        light: indigo[300],
        main: indigo[500],
        dark: indigo[700]
    },
    secondary: {
        light: pink.A200,
        main: pink.A400,
        dark: pink.A700
    },
    error: {
        light: red[300],
        main: red[500],
        dark: red[700]
    },
    warning: {
        light: orange[300],
        main: orange[500],
        dark: orange[700]
    },
    info: {
        light: blue[300],
        main: blue[500],
        dark: blue[700]
    },
    success: {
        light: green[300],
        main: green[500],
        dark: green[700]
    }
};

export const MuiTypography: TypographyOptions = {
    fontFamily: '\'Roboto Symbol\', \'Noto Sans\', \'Noto Sans JP\', \'Yu Gothic UI\', \'Hiragino Sans\', \'Noto Color Emoji\', sans-serif'
};

export const MuiLightTheme = createTheme({
    palette: {
        ...MuiPalette,
        mode: 'light'
    },
    typography: MuiTypography
});

export const MuiDarkTheme = createTheme({
    palette: {
        ...MuiPalette,
        mode: 'dark'
    },
    typography: MuiTypography
});

export const borderAndBoxShadow = (theme: Theme) => ({
    border: `solid 1px ${theme.palette.divider}`,
    boxShadow: `0 ${theme.spacing(.5)} ${theme.spacing(1)} rgba(0, 0, 0, .15)`
});
