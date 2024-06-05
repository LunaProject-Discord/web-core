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

const StyledSection = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2, 0, 0),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(.5)
}));

export const Section = forwardRef<HTMLElement, Omit<BoxProps, 'component'>>((
    {
        className,
        ...props
    },
    ref
) => (
    <StyledSection
        ref={ref}
        component="section"
        className={clsx(sectionClasses.root, className)}
        {...props}
    />
));
Section.displayName = 'Section';

const StyledSectionContent = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(.5)
}));

export const SectionContent = forwardRef<HTMLDivElement, BoxProps>((
    {
        className,
        ...props
    },
    ref
) => (
    <StyledSectionContent
        ref={ref}
        className={clsx(sectionClasses.content, className)}
        {...props}
    />
));
SectionContent.displayName = 'SectionContent';

export const SectionTitle = styled(
    ({ className, ...props }: TypographyProps) => (
        <Typography
            variant="h5"
            className={clsx(sectionClasses.title, className)}
            {...props}
        />
    )
)<TypographyProps>();

export const SectionParagraph = styled(
    ({ className, ...props }: TypographyProps) => (
        <Typography
            variant="body1"
            className={clsx(sectionClasses.paragraph, className)}
            {...props}
        />
    )
)<TypographyProps>();
