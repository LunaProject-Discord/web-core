import { Box, BoxProps, styled } from '@mui/material';
import { CreateSlotsAndSlotProps, SlotProps } from '@mui/material/utils/types';
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

export type SectionCardDisplaySlotsAndSlotProps = CreateSlotsAndSlotProps<{
    root?: ElementType;
    icon?: ElementType;
    primary?: ElementType;
    secondary?: ElementType;
}, {
    root: SlotProps<typeof Box, {}, {}>;
    icon: SlotProps<typeof Box, {}, {}>;
    primary: SlotProps<typeof Box, {}, {}>;
    secondary: SlotProps<typeof Box, {}, {}>;
}>;

export type SectionCardDisplayProps = SectionCardDisplaySlotsAndSlotProps & {
    icon?: ReactNode;
    primary?: ReactNode;
    secondary?: ReactNode;
};

export const SectionCardDisplay = (
    {
        icon,
        primary,
        secondary,
        slots,
        slotProps
    }: SectionCardDisplayProps
) => (
    <SectionCardDisplayRoot component={slots?.root} {...slotProps?.root}>
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
