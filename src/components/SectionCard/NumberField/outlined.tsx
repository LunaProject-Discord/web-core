'use client';

import { useTheme } from '@mui/material';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { ConfigContext } from '../../../utils';
import { OutlinedNumberField } from '../../NumberField';
import {
    SectionCard,
    sectionCardClasses,
    SectionCardDisplayRootProps,
    SectionCardProps,
    SectionCardRootProps,
    SectionControlCardSlotProps
} from '../index';
import { generateSectionControlCardClasses } from '../utils';
import { SectionNumberFieldCardRootProps } from './index';

export const sectionOutlinedNumberFieldCardClasses = generateSectionControlCardClasses('OutlinedNumberField');

export type SectionOutlinedNumberFieldCardSlotProps = SectionControlCardSlotProps<typeof OutlinedNumberField>;

export type SectionOutlinedNumberFieldCardProps =
    SectionCardProps
    & SectionNumberFieldCardRootProps
    & SectionOutlinedNumberFieldCardSlotProps;

export const SectionOutlinedNumberFieldCard = (
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
    }: SectionOutlinedNumberFieldCardProps
) => {
    const { components } = useContext(ConfigContext);
    const {
        disabled: configRootDisabled,
        variant: configRootVariant,
        slots: configRootSlots,
        slotProps: configRootSlotProps
    } = components?.SectionNumberFieldCard ?? {};
    const {
        disabled: configDisabled,
        variant: configVariant,
        slots: configSlots,
        slotProps: configSlotProps
    } = components?.SectionOutlinedNumberFieldCard ?? {};

    const theme = useTheme();

    const disabled = _disabled ?? configDisabled ?? configRootDisabled;
    return (
        <SectionCard
            disabled={disabled}
            variant={variant ?? configVariant ?? configRootVariant}
            className={clsx(sectionOutlinedNumberFieldCardClasses.root, className)}
            sx={{
                flexWrap: 'nowrap',
                [theme.breakpoints.down('md')]: {
                    flexWrap: 'wrap',
                    [`& .${sectionCardClasses.content}`]: {
                        width: '100%'
                    }
                },
                ...sx
            }}
            slots={slots ?? configSlots ?? configRootSlots}
            slotProps={slotProps ?? configSlotProps ?? configRootSlotProps}
            {...props}
        >
            {children}
            <OutlinedNumberField
                value={value}
                setValue={setValue}
                disabled={disabled}
                className={sectionOutlinedNumberFieldCardClasses.control}
                sx={{ width: { xs: '100%', md: 300 } }}
                {...(slotProps?.control ?? configSlotProps?.control)}
            />
        </SectionCard>
    );
};

export type SectionOutlinedNumberFieldCardConfigProps = Partial<Omit<SectionCardRootProps & SectionOutlinedNumberFieldCardSlotProps, keyof SectionCardDisplayRootProps>>;
