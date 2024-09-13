'use client';

import { Box, BoxProps, styled, Typography, TypographyProps } from '@mui/material';
import clsx from 'clsx';
import React, { forwardRef } from 'react';
import { generateComponentClasses } from '../../utils';

export const sectionClasses = generateComponentClasses(
    'Section',
    [
        'root',
        'content',
        'title',
        'paragraph'
    ]
);

export const Section = styled(
    forwardRef<HTMLElement, BoxProps>((
        {
            className,
            ...props
        },
        ref
    ) => (
        <Box
            ref={ref}
            component="section"
            className={clsx(sectionClasses.root, className)}
            {...props}
        />
    ))
)<BoxProps>(({ theme }) => ({
    padding: theme.spacing(2, 0, 0),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(.5)
}));

export const SectionContent = styled(
    forwardRef<HTMLElement, BoxProps>((
        {
            className,
            ...props
        },
        ref
    ) => (
        <Box
            ref={ref}
            className={clsx(sectionClasses.content, className)}
            {...props}
        />
    ))
)<BoxProps>(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(.5)
}));

export const SectionTitle = styled(
    forwardRef<HTMLElement, TypographyProps>((
        {
            className,
            ...props
        },
        ref
    ) => (
        <Typography
            ref={ref}
            variant="h2"
            className={clsx(sectionClasses.title, className)}
            {...props}
        />
    ))
)<TypographyProps>();

export const SectionParagraph = styled(
    forwardRef<HTMLElement, TypographyProps>((
        {
            className,
            ...props
        },
        ref
    ) => (
        <Typography
            ref={ref}
            variant="body1"
            className={clsx(sectionClasses.paragraph, className)}
            {...props}
        />
    ))
)<TypographyProps>();
