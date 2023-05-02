'use client';

import { Box, styled, Typography, TypographyProps } from '@mui/material';
import React from 'react';

export const Section = styled('section')(({ theme }) => ({
    padding: theme.spacing(3, 0, 0),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(.5)
}));

export const SectionContent = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(.5)
}));

export const SectionTitle = styled(
    (props: TypographyProps) => <Typography variant="h5" {...props} />
)<TypographyProps>();

export const SectionParagraph = styled(
    (props: TypographyProps) => <Typography variant="body1" {...props} />
)<TypographyProps>();
