'use client';

import { Box, BoxProps, CSSObject, styled, Theme } from '@mui/material';
import { BoxTypeMap } from '@mui/system';
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

export const sectionCardRootStyled = (theme: Theme): CSSObject => ({
    minHeight: theme.spacing(8),
    padding: theme.spacing(.875, 1.375),
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: theme.spacing(1.5),
    border: `solid 1px ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color', 'color'], {
        duration: theme.transitions.duration.shortest
    }),
    [`
        &:disabled .${sectionCardDisplayClasses.root}, &:disabled .${sectionCardDisplayClasses.icon}, &:disabled .${sectionCardDisplayClasses.primary}, &:disabled .${sectionCardDisplayClasses.secondary},
        &.${sectionCardClasses.disabled} .${sectionCardDisplayClasses.root}, &.${sectionCardClasses.disabled} .${sectionCardDisplayClasses.icon}, &.${sectionCardClasses.disabled} .${sectionCardDisplayClasses.primary}, &.${sectionCardClasses.disabled} .${sectionCardDisplayClasses.secondary}
    `]: {
        color: theme.palette.text.disabled
    }
});

export const SectionCardRoot = styled(
    ({ disabled, className, ...props }: BoxProps & SectionCardDisabledProps) => (
        <Box
            className={clsx(sectionCardClasses.root, disabled && sectionCardClasses.disabled, className)}
            {...props}
        />
    )
)<BoxProps & SectionCardDisabledProps>(({ theme }) => sectionCardRootStyled(theme)) as typeof Box;

export type SectionCardProps<C extends ElementType = BoxTypeMap['defaultComponent']> =
    SectionCardDisplayProps
    & SectionCardDisabledProps
    & Omit<BoxProps<C, { component?: C }>, 'children'>;

export const SectionCard = <C extends ElementType = BoxTypeMap['defaultComponent'], >(
    {
        icon,
        primary,
        secondary,
        disabled,
        slots,
        slotProps,
        ...props
    }: SectionCardProps<C>
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
export * from './Checkbox';
export * from './Link';
export * from './RouteLink';
export * from './Switch';
export * from './display';
