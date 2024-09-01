'use client';

import { SlotComponentProps } from '@mui/base';
import { avatarClasses, Box, BoxProps, styled } from '@mui/material';
import { CreateSlotsAndSlotProps } from '@mui/material/utils/types';
import clsx from 'clsx';
import React, { ElementType, ReactNode } from 'react';
import { generateComponentClasses } from '../../utils';
import { SlotRootProps } from './utils';

export const sectionCardDisplayClasses = generateComponentClasses(
    'SectionCardDisplay',
    [
        'root',
        'icon',
        'primary',
        'secondary'
    ]
);

export const SectionCardDisplayRoot = styled(
    ({ className, ...props }: BoxProps) => (
        <Box
            className={clsx(sectionCardDisplayClasses.root, className)}
            {...props}
        />
    )
)<BoxProps>(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    [`& .${sectionCardDisplayClasses.icon} :not(.${avatarClasses.root})`]: {
        margin: theme.spacing(0, .5)
    },
    [`&:not(:has(.${sectionCardDisplayClasses.secondary})) .${sectionCardDisplayClasses.primary}`]: {
        marginTop: theme.spacing(.25)
    }
}));

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
});

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
    color: (theme.vars || theme).palette.text.primary
}));

export const SectionCardDisplaySecondary = styled(
    ({ component, className, ...props }: BoxProps) => (
        <Box
            component={component ?? 'p'}
            className={clsx(sectionCardDisplayClasses.secondary, className)}
            {...props}
        />
    )
)<BoxProps>(({ theme }) => ({
    ...theme.typography.body2,
    margin: 0,
    textAlign: 'start',
    color: (theme.vars || theme).palette.text.secondary
}));

export interface SectionCardDisplayRootProps {
    icon?: ReactNode;
    primary?: ReactNode;
    secondary?: ReactNode;
}

export type SectionCardDisplaySlotsAndSlotProps = CreateSlotsAndSlotProps<{
    root?: ElementType;
    icon?: ElementType;
    primary?: ElementType;
    secondary?: ElementType;
}, {
    root: SlotComponentProps<typeof Box, SlotRootProps, {}>;
    icon: SlotComponentProps<typeof Box, SlotRootProps, {}>;
    primary: SlotComponentProps<typeof Box, SlotRootProps, {}>;
    secondary: SlotComponentProps<typeof Box, SlotRootProps, {}>;
}>;

export type SectionCardDisplayProps = SectionCardDisplayRootProps & SectionCardDisplaySlotsAndSlotProps;

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
        {(primary || secondary) && <Box sx={{ display: 'flex', flexDirection: 'column', gap: .25 }}>
            {primary && <SectionCardDisplayPrimary component={slots?.primary} {...slotProps?.primary}>
                {primary}
            </SectionCardDisplayPrimary>}
            {secondary && <SectionCardDisplaySecondary component={slots?.secondary} {...slotProps?.secondary}>
                {secondary}
            </SectionCardDisplaySecondary>}
        </Box>}
    </SectionCardDisplayRoot>
);
