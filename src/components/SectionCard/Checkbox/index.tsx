'use client';

import { Checkbox } from '@mui/material';
import { CreateSlotsAndSlotProps, SlotProps } from '@mui/material/utils/types';
import clsx from 'clsx';
import React, { ElementType } from 'react';
import { SectionButtonCardProps, SectionButtonCardRoot } from '../Button';
import { SectionCardDisplay } from '../display';
import { SectionCardContent } from '../index';
import { SectionSwitchCardRootProps } from '../Switch';

export const sectionCheckboxCardClasses = {
    root: 'SectionCheckboxCard-root',
    control: 'SectionCheckboxCard-control'
};

export type SectionCheckboxCardSlotsAndSlotProps = CreateSlotsAndSlotProps<{
    control?: ElementType;
}, {
    control: SlotProps<typeof Checkbox, {}, {}>;
}>;

export type SectionCheckboxCardProps =
    SectionButtonCardProps
    & SectionSwitchCardRootProps
    & SectionCheckboxCardSlotsAndSlotProps;

export const SectionCheckboxCard = (
    {
        icon,
        primary,
        secondary,
        children,
        checked,
        setChecked,
        defaultChecked,
        disabled,
        variant,
        className,
        sx,
        slots,
        slotProps,
        ...props
    }: SectionCheckboxCardProps
) => (
    <SectionButtonCardRoot
        onClick={() => setChecked(!checked)}
        disabled={disabled}
        variant={variant}
        className={clsx(sectionCheckboxCardClasses.root, className)}
        sx={{ flexWrap: 'nowrap', ...sx }}
        {...props}
    >
        <Checkbox
            component={slots?.control}
            checked={checked}
            onChange={() => setChecked(!checked)}
            defaultChecked={defaultChecked}
            disabled={disabled}
            disableRipple
            tabIndex={-1}
            className={sectionCheckboxCardClasses.control}
            sx={{
                mx: .5,
                p: 0,
                display: 'flex',
                placeItems: 'center',
                placeContent: 'center',
                flexShrink: 0,
                '&:hover': {
                    backgroundColor: 'transparent'
                }
            }}
            {...slotProps?.control}
        />
        <SectionCardDisplay
            icon={icon}
            primary={primary}
            secondary={secondary}
            slots={slots?.display}
            slotProps={slotProps?.display}
        />
        {children && <SectionCardContent component={slots?.content} {...slotProps?.content}>
            {children}
        </SectionCardContent>}
    </SectionButtonCardRoot>
);
