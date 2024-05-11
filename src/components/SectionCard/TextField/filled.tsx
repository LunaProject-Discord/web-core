'use client';

import { FilledInput } from '@mui/material';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { ConfigContext } from '../../../utils';
import {
    SectionCard,
    SectionCardDisplayRootProps,
    SectionCardProps,
    SectionCardRootProps,
    SectionControlCardSlotProps
} from '../index';
import { getSectionControlCardClasses } from '../utils';
import { SectionTextFieldCardRootProps } from './index';

export const sectionFilledTextFieldCardClasses = getSectionControlCardClasses('FilledTextField');

export type SectionFilledTextFieldCardSlotProps = SectionControlCardSlotProps<typeof FilledInput>;

export type SectionFilledTextFieldCardProps =
    SectionCardProps
    & SectionTextFieldCardRootProps
    & SectionFilledTextFieldCardSlotProps;

export const SectionFilledTextFieldCard = (
    {
        children,
        value,
        setValue,
        disabled: _disabled,
        variant,
        className,
        sx,
        slots,
        slotProps,
        ...props
    }: SectionFilledTextFieldCardProps
) => {
    const { components } = useContext(ConfigContext);
    const {
        disabled: configRootDisabled,
        variant: configRootVariant,
        slots: configRootSlots,
        slotProps: configRootSlotProps
    } = components?.SectionTextFieldCard ?? {};
    const {
        disabled: configDisabled,
        variant: configVariant,
        slots: configSlots,
        slotProps: configSlotProps
    } = components?.SectionFilledTextFieldCard ?? {};

    const disabled = _disabled ?? configDisabled ?? configRootDisabled;
    return (
        <SectionCard
            disabled={disabled}
            variant={variant ?? configVariant ?? configRootVariant}
            className={clsx(sectionFilledTextFieldCardClasses.root, className)}
            slots={slots ?? configSlots ?? configRootSlots}
            slotProps={slotProps ?? configSlotProps ?? configRootSlotProps}
            {...props}
        >
            {children}
            <FilledInput
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={disabled}
                size="small"
                margin="none"
                className={sectionFilledTextFieldCardClasses.control}
                sx={{ width: { xs: '100%', md: 300 } }}
                {...(slotProps?.control ?? configSlotProps?.control)}
            />
        </SectionCard>
    );
};

export type SectionFilledTextFieldCardConfigProps = Partial<Omit<SectionCardRootProps & SectionFilledTextFieldCardSlotProps, keyof SectionCardDisplayRootProps>>;
