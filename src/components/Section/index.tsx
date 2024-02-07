'use client';

import { Box, BoxProps, styled, Typography, TypographyProps } from '@mui/material';
import clsx from 'clsx';
import React from 'react';

export const sectionClasses = {
    root: 'Section-root',
    content: 'Section-content',
    title: 'Section-title',
    paragraph: 'Section-paragraph'
};

export const Section = styled('section')(({ theme }) => ({
    padding: theme.spacing(2, 0, 0),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(.5)
}));
Section.defaultProps = {
    className: sectionClasses.root
};

export const SectionContent = styled(
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
