'use client';

import { generateComponentClasses } from '../../utils';
import { Box, BoxProps, CSSObject, styled, Theme, Typography, TypographyProps } from '@mui/material';
import clsx from 'clsx';
import React from 'react';

export const errorClasses = generateComponentClasses(
    'Error',
    [
        'root',
        'title',
        'description'
    ]
);

export const ErrorRoot = styled(
    ({ className, ...props }: BoxProps) => (
        <Box
            className={clsx(errorClasses.root, className)}
            {...props}
        />
    )
)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    placeItems: 'center',
    placeContent: 'center',
    gap: theme.spacing(1)
}));

const typographyStyled = (theme: Theme): CSSObject => ({
    '& br': {
        '&.mobile': {
            [theme.breakpoints.up('md')]: {
                display: 'none'
            }
        },
        '&.desktop': {
            [theme.breakpoints.down('md')]: {
                display: 'none'
            }
        }
    }
});

export const ErrorTitle = styled(
    ({ className, ...props }: TypographyProps) => (
        <Typography
            variant="h2"
            align="center"
            className={clsx(errorClasses.title, className)}
            {...props}
        />
    )
)(({ theme }) => typographyStyled(theme));

export const ErrorDescription = styled(
    ({ className, ...props }: TypographyProps) => (
        <Typography
            align="center"
            className={clsx(errorClasses.description, className)}
            {...props}
        />
    )
)(({ theme }) => typographyStyled(theme));
