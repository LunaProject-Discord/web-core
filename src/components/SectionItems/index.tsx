'use client';

import {
    Box,
    BoxProps,
    ButtonBase as MuiButtonBase,
    buttonBaseClasses,
    styled,
    Theme,
    Typography
} from '@mui/material';
import clsx from 'clsx';
import React, { ReactNode } from 'react';

export const itemRootStyled = (theme: Theme) => ({
    padding: theme.spacing(0, 1.5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'stretch',
    gap: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color', 'color'], {
        duration: theme.transitions.duration.shortest
    }),
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'
    }
});

export const ItemRoot = styled(Box)(({ theme }) => itemRootStyled(theme));

export const ButtonItemRoot = styled(MuiButtonBase)(({ theme }) => ({
    ...itemRootStyled(theme),
    [`&.${buttonBaseClasses.disabled}`]: {
        color: theme.palette.action.disabled
    },
    [`&:hover, &.${buttonBaseClasses.focusVisible}`]: {
        backgroundColor: theme.palette.action.hover
    }
}));

interface ItemRowContainerProps {
    size?: 'small' | 'medium';
}

export const ItemRowContainer = styled(
    Box,
    { shouldForwardProp: (prop) => prop !== 'sx' && prop !== 'size' }
)<ItemRowContainerProps>(({ theme, size = 'medium' }) => ({
    width: '100%',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: theme.spacing(1.5),
    [theme.breakpoints.down('md')]: {
        height: 'auto',
        minHeight: size === 'small' ? 'auto' : 50,
        paddingTop: size === 'small' ? theme.spacing(1.5) : 0,
        [`& + div.form-container`]: {
            width: '100%'
        }
    }
}));

export interface ItemIconProps {
    icon?: ReactNode;
}

export interface ItemTextBlockProps {
    primary?: ReactNode;
    secondary?: ReactNode;
}

export interface ItemDisabledProps {
    disabled?: boolean;
}

export interface ItemVariableProps<T> {
    value: T;
    setValue: (value: T) => void;
}

export const ItemIcon = ({ icon }: ItemIconProps) => icon ? (
    <Box sx={{ minWidth: 24, display: 'flex', placeItems: 'center', placeContent: 'center', flexShrink: 0 }}>
        {icon}
    </Box>
) : null;

export const ItemTextBlock = ({ primary, secondary, disabled = false }: ItemTextBlockProps & ItemDisabledProps) => (
    <Box
        sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            overflow: 'hidden'
        }}
    >
        <Typography
            variant="body1"
            align="left"
            color={`text.${disabled ? 'disabled' : 'primary'}`}
            sx={{
                width: '100%',
                overflow: { xs: 'auto', md: 'hidden' },
                whiteSpace: { xs: 'normal', md: 'nowrap' },
                textOverflow: 'ellipsis',
                userSelect: 'none'
            }}
        >
            {primary}
        </Typography>
        {secondary && <Typography
            variant="body2"
            align="left"
            color={`text.${disabled ? 'disabled' : 'secondary'}`}
            sx={{
                width: '100%',
                overflow: { xs: 'auto', md: 'hidden' },
                whiteSpace: { xs: 'normal', md: 'nowrap' },
                textOverflow: 'ellipsis',
                userSelect: 'none'
            }}

        >
            {secondary}
        </Typography>}
    </Box>
);

export const ItemFormContainer = styled(
    ({ className, ...props }: BoxProps) => <Box {...props} className={clsx(className, 'form-container')} />
)<BoxProps>(({ theme }) => ({
    height: 50,
    display: 'flex',
    flexShrink: 0,
    placeItems: 'center',
    placeContent: 'center',
    gap: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
        // width: '100%',
        padding: 0
    }
}));

export * from './action';
export * from './link';
export * from './radio';
export * from './select';
export * from './switch';
export * from './text_field';
export * from './number_field';
