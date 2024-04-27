'use client';

import { Box, BoxProps, styled } from '@mui/material';
import clsx from 'clsx';
import React, { ElementType } from 'react';
import { SectionCardDisplay, sectionCardDisplayClasses, SectionCardDisplayProps } from './display';

export interface SectionCardDisabledProps {
    disabled?: boolean;
}

export const sectionCardClasses = {
    root: 'SectionCard-root',
    disabled: 'SectionCard-disabled'
};

export const SectionCardRoot = styled(
    ({ className, disabled, ...props }: BoxProps & SectionCardDisabledProps) => (
        <Box
            className={clsx(sectionCardClasses.root, disabled && sectionCardClasses.disabled, className)}
            {...props}
        />
    )
)<BoxProps & SectionCardDisabledProps>(({ theme }) => ({
    minHeight: theme.spacing(8),
    padding: theme.spacing(1, 1.5),
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadius,
    [`&:disabled .${sectionCardDisplayClasses.root}, &:disabled .${sectionCardDisplayClasses.icon}, &:disabled .${sectionCardDisplayClasses.primary}, &:disabled .${sectionCardDisplayClasses.secondary}`]: {
        color: theme.palette.text.disabled
    }
}));

export interface SectionCardProps extends SectionCardDisplayProps, SectionCardDisabledProps {
}

export const SectionCard = <C extends ElementType, >(
    {
        icon,
        primary,
        secondary,
        disabled,
        slots,
        slotProps,
        ...props
    }: SectionCardProps & BoxProps<C, { component?: C }>
) => (
    <SectionCardRoot disabled={disabled} {...props}>
        <SectionCardDisplay
            icon={icon}
            primary={primary}
            secondary={secondary}
            slots={slots}
            slotProps={slotProps}
        />
    </SectionCardRoot>
);

export * from './Button';
export * from './Link';
export * from './display';
