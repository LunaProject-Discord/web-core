'use client';

import {
    alertClasses,
    AlertProps,
    buttonClasses,
    ChipProps,
    createTheme,
    darken,
    Interpolation,
    lighten,
    linearProgressClasses,
    menuClasses,
    menuItemClasses,
    PaletteOptions,
    tabClasses,
    Theme
} from '@mui/material';
import { blue, green, indigo, orange, pink, red } from '@mui/material/colors';
import { Components } from '@mui/material/styles/components';
import { dark, light } from '@mui/material/styles/createPalette';
import { TypographyOptions } from '@mui/material/styles/createTypography';
import { rgba } from 'polished';

const chipStyled = (color: ChipProps['color']): Interpolation<{ theme: Omit<Theme, 'components'> }> => ({ theme }) => {
    const getColor = theme.palette.mode === 'light' ? darken : lighten;
    const getBackgroundColor = theme.palette.mode === 'light' ? lighten : darken;

    if (!color || color === 'default')
        return {};

    return {
        color: getColor(theme.palette[color].light, .9),
        backgroundColor: getBackgroundColor(theme.palette[color].light, .6)
    };
};

export const MuiComponents: Components<Omit<Theme, 'components'>> = {
    MuiAlert: {
        styleOverrides: {
            standard: ({ theme, ownerState }) => {
                const getColor = theme.palette.mode === 'light' ? lighten : darken;
                const getBackgroundColor = theme.palette.mode === 'light' ? darken : lighten;
                const color: AlertProps['color'] = ownerState.color || ownerState.severity || 'success';

                return {
                    [`& .${alertClasses.message} .${buttonClasses.root}.${buttonClasses.contained}.${buttonClasses.colorInherit}`]: {
                        color: getColor(theme.palette[color].light, .9),
                        backgroundColor: getBackgroundColor(theme.palette[color].light, .6)
                    }
                };
            }
        }
    },
    MuiButton: {
        defaultProps: {
            color: 'monotone'
        },
        styleOverrides: {
            root: {
                textTransform: 'none',
                variants: [
                    {
                        props: {
                            variant: 'contained',
                            color: 'monotone'
                        },
                        style: ({ theme }) => ({
                            [`&:disabled, &.${buttonClasses.disabled}`]: {
                                color: rgba(0, 0, 0, .26),
                                backgroundColor: rgba(0, 0, 0, .12),
                                ...theme.applyStyles('dark', {
                                    color: rgba(255, 255, 255, .3),
                                    backgroundColor: rgba(255, 255, 255, .12),
                                })
                            },
                            '&:hover': {
                                backgroundColor: rgba(0, 0, 0, .7),
                                ...theme.applyStyles('dark', {
                                    backgroundColor: rgba(255, 255, 255, .85)
                                })
                            },
                            [`&:active, &.${buttonClasses.focusVisible}`]: {
                                backgroundColor: rgba(0, 0, 0, .65),
                                ...theme.applyStyles('dark', {
                                    backgroundColor: rgba(255, 255, 255, .8)
                                })
                            }
                        })
                    },
                    {
                        props: {
                            variant: 'outlined',
                            color: 'monotone'
                        },
                        style: ({ theme }) => ({
                            borderColor: theme.palette.divider,
                            '&:hover': {
                                backgroundColor: theme.palette.divider,
                                borderColor: 'transparent'
                            }
                        })
                    }
                ]
            }
        }
    },
    MuiChip: {
        styleOverrides: {
            root: {
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
                        style: chipStyled('info')
                    },
                    {
                        props: {
                            variant: 'rounded',
                            color: 'error'
                        },
                        style: chipStyled('error')
                    },
                    {
                        props: {
                            variant: 'rounded',
                            color: 'warning'
                        },
                        style: chipStyled('warning')
                    },
                    {
                        props: {
                            variant: 'rounded',
                            color: 'success'
                        },
                        style: chipStyled('success')
                    }
                ]
            }
        }
    },
    MuiCircularProgress: {
        defaultProps: {
            color: 'monotone'
        }
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
    MuiLinearProgress: {
        defaultProps: {
            color: 'monotone'
        },
        styleOverrides: {
            root: ({ theme }) => ({
                [`&, & .${linearProgressClasses.bar}`]: {
                    borderRadius: theme.shape.borderRadius
                }
            })
        }
    },
    MuiSelect: {
        defaultProps: {
            MenuProps: {
                slotProps: {
                    paper: {
                        // TODO SlotCommonProps の問題が解決され次第、型指定を削除
                        sx: (theme: Theme) => ({
                            ...borderAndBoxShadow(theme),
                            [`& .${menuClasses.list}`]: {
                                p: 1
                            },
                            [`& .${menuItemClasses.root}`]: {
                                px: 1.5,
                                borderRadius: 1,
                                [theme.breakpoints.up('sm')]: {
                                    px: 1
                                }
                            }
                        })
                    }
                }
            }
        }
    },
    MuiTablePagination: {
        defaultProps: {
            slotProps: {
                select: {
                    MenuProps: {
                        slotProps: {
                            paper: {
                                // TODO SlotCommonProps の問題が解決され次第、型指定を削除
                                sx: (theme: Theme) => borderAndBoxShadow(theme)
                            }
                        }
                    }
                }
            }
        },
        styleOverrides: {
            root: {
                flexShrink: 0,
                userSelect: 'none',
                border: 'none'
            },
            toolbar: {
                padding: '0 !important'
            },
            selectLabel: {
                lineHeight: 0
            }
        }
    },
    MuiTab: {
        defaultProps: {
            disableRipple: true
        },
        styleOverrides: {
            root: ({ theme }) => ({
                minWidth: theme.spacing(6),
                padding: 0,
                ...theme.typography.body1,
                fontWeight: 500,
                textTransform: 'none',
                [`&.${tabClasses.selected}`]: {
                    color: theme.palette.text.primary
                }
            })
        }
    },
    MuiTabs: {
        styleOverrides: {
            root: ({ theme }) => ({
                borderBottom: `solid 1px ${theme.palette.divider}`
            }),
            flexContainer: ({ theme }) => ({
                gap: theme.spacing(2)
            }),
            indicator: ({ theme }) => ({
                backgroundColor: theme.palette.text.primary,
                borderRadius: theme.shape.borderRadius
            })
        }
    },
    MuiTooltip: {
        defaultProps: {
            disableInteractive: true,
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
    cssVariables: true,
    components: MuiComponents,
    palette: {
        ...MuiPalette,
        monotone: {
            light: light.text.primary,
            main: light.text.primary,
            dark: dark.text.primary,
            contrastText: dark.text.primary
        },
        mode: 'light'
    },
    typography: MuiTypography
});

export const MuiDarkTheme = createTheme({
    cssVariables: true,
    components: MuiComponents,
    palette: {
        ...MuiPalette,
        primary: {
            light: indigo.A200,
            main: indigo.A400,
            dark: indigo.A700
        },
        monotone: {
            light: light.text.primary,
            main: dark.text.primary,
            dark: dark.text.primary,
            contrastText: light.text.primary
        },
        mode: 'dark'
    },
    typography: MuiTypography
});

export const borderAndBoxShadow = (theme: Theme) => ({
    border: `solid 1px ${theme.palette.divider}`,
    boxShadow: `0 ${theme.spacing(.5)} ${theme.spacing(1)} rgba(0, 0, 0, .15)`
});

export const generateComponentClasses = <T extends string>(name: string, slots: T[]): Record<T, string> => {
    const classes: Record<string, string> = {};
    for (const slot of slots)
        classes[slot] = `LP${name}-${slot}`;
    return classes;
};
