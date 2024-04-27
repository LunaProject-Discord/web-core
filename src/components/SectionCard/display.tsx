import { SlotComponentProps } from '@mui/base';
import { Box, BoxProps, styled } from '@mui/material';
import clsx from 'clsx';
import React, { ElementType, ReactNode } from 'react';

export const sectionCardDisplayClasses = {
    root: 'SectionCardDisplay-root',
    icon: 'SectionCardDisplay-icon',
    primary: 'SectionCardDisplay-primary',
    secondary: 'SectionCardDisplay-secondary'
};

export const SectionCardDisplayRoot = styled(
    ({ className, ...props }: BoxProps) => (
        <Box
            className={clsx(sectionCardDisplayClasses.root, className)}
            {...props}
        />
    )
)<BoxProps>(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: theme.spacing(1.5)
})) as typeof Box;

export const SectionCardDisplayIcon = styled(
    ({ className, ...props }: BoxProps) => (
        <Box
            className={clsx(sectionCardDisplayClasses.icon, className)}
            {...props}
        />
    )
)<BoxProps>({
    display: 'flex',
    placeItems: 'center',
    placeContent: 'center',
    flexShrink: 0
}) as typeof Box;

export const SectionCardDisplayPrimary = styled(
    ({ className, ...props }: BoxProps) => (
        <Box
            className={clsx(sectionCardDisplayClasses.primary, className)}
            {...props}
        />
    )
)<BoxProps>(({ theme }) => ({
    ...theme.typography.body1,
    textAlign: 'start',
    color: theme.palette.text.primary
})) as typeof Box;

export const SectionCardDisplaySecondary = styled(
    ({ className, ...props }: BoxProps) => (
        <Box
            className={clsx(sectionCardDisplayClasses.secondary, className)}
            {...props}
        />
    )
)<BoxProps>(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'start',
    color: theme.palette.text.secondary
})) as typeof Box;

export interface SectionCardDisplaySlots {
    icon?: ElementType;
    primary?: ElementType;
    secondary?: ElementType;
}

export interface SectionCardDisplaySlotProps {
    icon?: SlotComponentProps<typeof Box, {}, {}>;
    primary?: SlotComponentProps<typeof Box, {}, {}>;
    secondary?: SlotComponentProps<typeof Box, {}, {}>;
}

export interface SectionCardDisplayProps {
    icon?: ReactNode;
    primary?: ReactNode;
    secondary?: ReactNode;
    slots?: SectionCardDisplaySlots;
    slotProps?: SectionCardDisplaySlotProps;
}

export const SectionCardDisplay = <C extends ElementType, >(
    {
        icon,
        primary,
        secondary,
        slots,
        slotProps,
        ...props
    }: SectionCardDisplayProps & BoxProps<C, { component?: C }>
) => (
    <SectionCardDisplayRoot {...props}>
        {icon && <SectionCardDisplayIcon component={slots?.icon} {...slotProps?.icon}>{icon}</SectionCardDisplayIcon>}
        {(primary || secondary) && <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {primary && <SectionCardDisplayPrimary component={slots?.primary} {...slotProps?.primary}>
                {primary}
            </SectionCardDisplayPrimary>}
            {secondary && <SectionCardDisplaySecondary component={slots?.secondary} {...slotProps?.secondary}>
                {secondary}
            </SectionCardDisplaySecondary>}
        </Box>}
    </SectionCardDisplayRoot>
);
