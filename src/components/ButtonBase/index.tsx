'use client';

import { ButtonBase as MuiButtonBase, buttonBaseClasses, CSSObject, styled, Theme } from '@mui/material';

export const buttonActionStyled = (theme: Theme): CSSObject => ({
    [`&:disabled, &.${buttonBaseClasses.disabled}`]: {
        color: theme.palette.action.disabled
    },
    '&:hover': {
        backgroundColor: theme.palette.action.hover
    },
    [`&.${buttonBaseClasses.focusVisible}`]: {
        backgroundColor: theme.palette.action.focus
    },
    '&:active': {
        backgroundColor: theme.palette.action.active
    }
});

export const ButtonBase = styled(MuiButtonBase)(({ theme }) => ({
    display: 'flex',
    placeItems: 'center',
    placeContent: 'center',
    transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color', 'color'], {
        duration: theme.transitions.duration.shortest
    }),
    borderRadius: theme.shape.borderRadius,
    ...buttonActionStyled(theme)
}));
