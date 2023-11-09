import { createTheme, menuClasses, menuItemClasses, PaletteOptions, Theme } from '@mui/material';
import { blue, green, indigo, orange, pink, red } from '@mui/material/colors';
import { Components } from '@mui/material/styles/components';
import { TypographyOptions } from '@mui/material/styles/createTypography';

export const MuiComponents: Components<Omit<Theme, 'components'>> = {
    MuiButton: {
        styleOverrides: {
            root: {
                textTransform: 'none'
            }
        }
    },
    MuiChip: {
        variants: [
            {
                props: {
                    variant: 'rounded'
                },
                style: ({ theme }) => ({
                    fontWeight: 500,
                    borderRadius: theme.shape.borderRadius
                })
            },
            {
                props: {
                    variant: 'rounded',
                    color: 'info'
                },
                style: ({ theme }) => ({
                    color: blue[theme.palette.mode === 'light' ? 900 : 100],
                    backgroundColor: blue[theme.palette.mode === 'light' ? 100 : 900]
                })
            },
            {
                props: {
                    variant: 'rounded',
                    color: 'error'
                },
                style: ({ theme }) => ({
                    color: red[theme.palette.mode === 'light' ? 900 : 100],
                    backgroundColor: red[theme.palette.mode === 'light' ? 100 : 900]
                })
            },
            {
                props: {
                    variant: 'rounded',
                    color: 'warning'
                },
                style: ({ theme }) => ({
                    color: orange[theme.palette.mode === 'light' ? 900 : 100],
                    backgroundColor: orange[theme.palette.mode === 'light' ? 100 : 900]
                })
            },
            {
                props: {
                    variant: 'rounded',
                    color: 'success'
                },
                style: ({ theme }) => ({
                    color: green[theme.palette.mode === 'light' ? 900 : 100],
                    backgroundColor: green[theme.palette.mode === 'light' ? 100 : 900]
                })
            }
        ]
    },
    MuiInputBase: {
        styleOverrides: {
            input: {
                '&:placeholder-shown': {
                    textOverflow: 'ellipsis'
                }
            }
        }
    },
    MuiSelect: {
        defaultProps: {
            MenuProps: {
                slotProps: {
                    paper: {
                        sx: (theme) => ({
                            ...borderAndBoxShadow(theme),
                            [`& .${menuClasses.list}`]: {
                                p: 1
                            },
                            [`& .${menuItemClasses.root}`]: {
                                px: 1,
                                borderRadius: 1
                            }
                        })
                    }
                }
            }
        }
    },
    MuiTooltip: {
        defaultProps: {
            placement: 'top'
        },
        styleOverrides: {
            popper: {
                userSelect: 'none'
            }
        }
    }
};

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
    components: MuiComponents,
    palette: {
        ...MuiPalette,
        mode: 'light'
    },
    typography: MuiTypography
});

export const MuiDarkTheme = createTheme({
    components: MuiComponents,
    palette: {
        ...MuiPalette,
        primary: {
            light: indigo.A200,
            main: indigo.A400,
            dark: indigo.A700
        },
        mode: 'dark'
    },
    typography: MuiTypography
});

export const borderAndBoxShadow = (theme: Theme) => ({
    border: `solid 1px ${theme.palette.divider}`,
    boxShadow: `0 ${theme.spacing(.5)} ${theme.spacing(1)} rgba(0, 0, 0, .15)`
});
