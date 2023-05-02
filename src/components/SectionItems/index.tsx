'use client';

import { Box, BoxProps, styled } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { ItemIconProps, ItemRootProps, ItemTextBlockProps } from './components';

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

export type ItemProps = ItemRootProps & ItemIconProps & ItemTextBlockProps & ItemDisabledProps;

export interface ItemDisabledProps {
    disabled?: boolean;
}

export interface ItemVariableProps<T> {
    value: T;
    setValue: (value: T) => void;
}

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
        padding: 0
    }
}));

export * from './components';
export * from './action';
export * from './link';
export * from './number_field';
export * from './radio';
export * from './select';
export * from './switch';
export * from './text_field';
