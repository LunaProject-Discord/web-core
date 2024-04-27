'use client';

import { Box, Switch, switchClasses } from '@mui/material';
import { CreateSlotsAndSlotProps, SlotProps } from '@mui/material/utils/types';
import clsx from 'clsx';
import React, { Dispatch, ElementType, SetStateAction } from 'react';
import { SectionButtonCardProps, SectionButtonCardRoot } from '../Button';
import { SectionCardDisplay } from '../display';

export const sectionSwitchCardClasses = {
    root: 'SectionSwitchCard-root',
    control: 'SectionSwitchCard-control'
};

export type SectionSwitchCardSlotsAndSlotProps = CreateSlotsAndSlotProps<{
    control?: ElementType;
}, {
    control: SlotProps<typeof Switch, {}, {}>;
}>;

export type SectionSwitchCardProps = SectionButtonCardProps & SectionSwitchCardSlotsAndSlotProps & {
    checked: boolean;
    setChecked: Dispatch<SetStateAction<boolean>>;
    defaultChecked?: boolean;
};

export const SectionSwitchCard = (
    {
        icon,
        primary,
        secondary,
        checked,
        setChecked,
        defaultChecked,
        disabled,
        className,
        sx,
        slots,
        slotProps,
        ...props
    }: SectionSwitchCardProps
) => (
    <SectionButtonCardRoot
        onClick={() => setChecked(!checked)}
        disabled={disabled}
        className={clsx(sectionSwitchCardClasses.root, className)}
        sx={{ flexWrap: 'nowrap', ...sx }}
        {...props}
    >
        <SectionCardDisplay
            icon={icon}
            primary={primary}
            secondary={secondary}
            slots={slots}
            slotProps={slotProps}
        />
        <Box sx={{ ml: 'auto' }}>
            <Switch
                component={slots?.control}
                checked={checked}
                onChange={() => setChecked(!checked)}
                defaultChecked={defaultChecked}
                disabled={disabled}
                disableRipple
                tabIndex={-1}
                className={sectionSwitchCardClasses.control}
                sx={{ [`& .${switchClasses.switchBase}`]: { backgroundColor: 'transparent !important' } }}
                {...slotProps?.control}
            />
        </Box>
    </SectionButtonCardRoot>
);
