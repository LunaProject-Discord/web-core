'use client';

import { ButtonBase as MuiButtonBase, buttonBaseClasses, CSSObject, styled, Theme } from '@mui/material';

export const buttonActionStyled = (theme: Theme): CSSObject => ({
    [`&:disabled, &.${buttonBaseClasses.disabled}`]: {
        color: theme.palette.action.disabled
    },
    '&:hover': {
        backgroundColor: theme.palette.action.hover
    },
    [`&:active, &.${buttonBaseClasses.focusVisible}`]: {
        backgroundColor: theme.palette.action.focus
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
