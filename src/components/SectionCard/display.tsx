import { Box, BoxProps, styled, Typography, TypographyProps } from '@mui/material';
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
    gap: theme.spacing(1.5),
    [`& .${sectionCardDisplayClasses.icon}`]: {
        margin: theme.spacing(0, .5)
    },
    [`&:not(:has(${sectionCardDisplayClasses.secondary})) .${sectionCardDisplayClasses.primary}`]: {
        marginTop: theme.spacing(.25)
    }
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
    ({ className, ...props }: TypographyProps) => (
        <Typography
            component={Box}
            variant="body1"
            color="text.primary"
            className={sectionCardDisplayClasses.primary}
            {...props}
        />
    )
)<TypographyProps>({
    textAlign: 'start'
}) as typeof Typography;

export const SectionCardDisplaySecondary = styled(
    ({ className, ...props }: TypographyProps) => (
        <Typography
            variant="body2"
            color="text.secondary"
            className={sectionCardDisplayClasses.secondary}
            {...props}
        />
    )
)<TypographyProps>({
    textAlign: 'start'
}) as typeof Typography;

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
    root: SlotProps<typeof Box, {}, {}>;
    icon: SlotProps<typeof Box, {}, {}>;
    primary: SlotProps<typeof Typography, {}, {}>;
    secondary: SlotProps<typeof Typography, {}, {}>;
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
        {(primary || secondary) && <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {primary && <SectionCardDisplayPrimary component={slots?.primary ?? Box} {...slotProps?.primary}>
                {primary}
            </SectionCardDisplayPrimary>}
            {secondary && <SectionCardDisplaySecondary component={slots?.secondary ?? 'p'} {...slotProps?.secondary}>
                {secondary}
            </SectionCardDisplaySecondary>}
        </Box>}
    </SectionCardDisplayRoot>
);
