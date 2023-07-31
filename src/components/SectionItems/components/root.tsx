import { Box, BoxProps, ButtonBase, ButtonBaseProps, CSSObject, styled, Theme } from '@mui/material';
import { SxProps } from '@mui/system';
import clsx from 'clsx';
import React from 'react';
import { buttonActionStyled } from '../../ButtonBase';
import { sectionItemClasses } from '../index';

export const itemRootStyled = (theme: Theme): CSSObject => ({
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

export interface ItemRootProps {
    className?: string;
    sx?: SxProps<Theme>;
}

export const ItemRoot = styled(
    ({ className, ...props }: BoxProps) => (
        <Box
            className={clsx(sectionItemClasses.root, className)}
            {...props}
        />
    )
)<BoxProps>(({ theme }) => itemRootStyled(theme));

export const ButtonItemRoot = styled(
    ({ disabled, className, ...props }: ButtonBaseProps) => (
        <ButtonBase
            disabled={disabled}
            className={clsx(sectionItemClasses.buttonRoot, disabled && sectionItemClasses.disabled, className)}
            {...props}
        />
    )
)<ButtonBaseProps>(({ theme }) => ({
    ...itemRootStyled(theme),
    userSelect: 'none',
    ...buttonActionStyled(theme)
}));
