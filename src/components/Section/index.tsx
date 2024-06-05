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

export const StyledSection = styled(
    ({ className, ...props }: BoxProps) => (
        <Box
            component="section"
            className={clsx(sectionClasses.root, className)}
            {...props}
        />
    )
)<BoxProps>(({ theme }) => ({
    padding: theme.spacing(2, 0, 0),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(.5)
}));

export const Section = forwardRef<HTMLElement, BoxProps>((props, ref) => (
    <StyledSection ref={ref} {...props} />
));
Section.displayName = 'Section';

export const StyledSectionContent = styled(
    ({ className, ...props }: BoxProps) => (
        <Box
            className={clsx(sectionClasses.content, className)}
            {...props}
        />
    )
)<BoxProps>(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(.5)
}));

export const SectionContent = forwardRef<HTMLElement, BoxProps>((props, ref) => (
    <StyledSectionContent ref={ref} {...props} />
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
