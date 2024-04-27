'use client';

import { SlotComponentProps } from '@mui/base';
import { Box, BoxProps, styled } from '@mui/material';
import clsx from 'clsx';
import React, { ElementType, ReactNode } from 'react';

export const sectionCardClasses = {
    root: 'SectionCard-root',
    icon: 'SectionCard-icon',
    primary: 'SectionCard-primary',
    secondary: 'SectionCard-secondary'
};

export const SectionCardRoot = styled(
    ({ className, ...props }: BoxProps) => (<Box className={clsx(sectionCardClasses.root, className)} {...props} />)
)<BoxProps>(({ theme }) => ({
    minHeight: theme.spacing(8),
    padding: theme.spacing(1, 1.5),
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadius
})) as typeof Box;

export const SectionCardIcon = styled(
    ({ className, ...props }: BoxProps) => (<Box className={clsx(sectionCardClasses.icon, className)} {...props} />)
)<BoxProps>(({ theme }) => ({
    display: 'flex',
    placeItems: 'center',
    placeContent: 'center',
    flexShrink: 0
})) as typeof Box;

export const SectionCardPrimary = styled(
    ({ className, ...props }: BoxProps) => (<Box className={clsx(sectionCardClasses.primary, className)} {...props} />)
)<BoxProps>(({ theme }) => ({
    ...theme.typography.body1
})) as typeof Box;

export const SectionCardSecondary = styled(
    ({ className, ...props }: BoxProps) => (
        <Box
            className={clsx(sectionCardClasses.secondary, className)}
            {...props}
        />
    )
)<BoxProps>(({ theme }) => ({
    ...theme.typography.body2
})) as typeof Box;

export interface SectionCardProps {
    icon?: ReactNode;
    primary?: ReactNode;
    secondary?: ReactNode;
    slots?: {
        icon?: ElementType;
        primary?: ElementType;
        secondary?: ElementType;
    };
    slotProps?: {
        icon?: SlotComponentProps<typeof Box, {}, {}>;
        primary?: SlotComponentProps<typeof Box, {}, {}>;
        secondary?: SlotComponentProps<typeof Box, {}, {}>;
    };
}

export const SectionCard = <C extends ElementType, >(
    {
        icon,
        primary,
        secondary,
        slots,
        slotProps,
        ...props
    }: SectionCardProps & BoxProps<C, { component: C }>
) => (
    <SectionCardRoot {...props}>
        {icon && <SectionCardIcon component={slots?.icon} {...slotProps?.icon}>{icon}</SectionCardIcon>}
        {(primary || secondary) && <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {primary && <SectionCardPrimary component={slots?.primary} {...slotProps?.primary}>
                {primary}
            </SectionCardPrimary>}
            {secondary && <SectionCardSecondary component={slots?.secondary} {...slotProps?.secondary}>
                {secondary}
            </SectionCardSecondary>}
        </Box>}
    </SectionCardRoot>
);
