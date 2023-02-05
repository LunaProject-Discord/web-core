'use client';

import { ButtonBase as MuiButtonBase, buttonBaseClasses, styled } from '@mui/material';

export const ButtonBase = styled(MuiButtonBase)(({ theme }) => ({
    display: 'flex',
    placeItems: 'center',
    placeContent: 'center',
    transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color', 'color'], {
        duration: theme.transitions.duration.shortest
    }),
    borderRadius: theme.shape.borderRadius,
    [`&:disabled, &.${buttonBaseClasses.disabled}`]: {
        color: theme.palette.action.disabled
    },
    [`&:hover, &.${buttonBaseClasses.focusVisible}`]: {
        backgroundColor: theme.palette.action.hover
    },
    '&:active': {
        backgroundColor: theme.palette.action.focus
    }
}));
