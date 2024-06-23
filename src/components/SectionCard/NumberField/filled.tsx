'use client';

import { useTheme } from '@mui/material';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { ConfigContext } from '../../../utils';
import { FilledNumberField } from '../../NumberField';
import {
    SectionCard,
    sectionCardClasses,
    SectionCardDisplayRootProps,
    SectionCardProps,
    SectionCardRootProps
} from '../index';
import { generateSectionControlCardClasses, merges, SectionControlCardSlotProps } from '../utils';
import { SectionNumberFieldCardRootProps } from './index';

export const sectionFilledNumberFieldCardClasses = generateSectionControlCardClasses('FilledTextField');

export type SectionFilledNumberFieldCardSlotProps = SectionControlCardSlotProps<typeof FilledNumberField>;

export type SectionFilledNumberFieldCardProps =
    SectionCardProps
    & SectionNumberFieldCardRootProps
    & SectionFilledNumberFieldCardSlotProps;

export const SectionFilledNumberFieldCard = (
    {
        children,
        value,
        setValue,
        disabled: _disabled,
        variant,
        className,
        sx,
        slots = {},
        slotProps: { control: controlProps = {}, ...slotProps } = {},
        ...props
    }: SectionFilledNumberFieldCardProps
) => {
    const { components } = useContext(ConfigContext);
    const {
        disabled: configRootDisabled,
        variant: configRootVariant,
        slots: configRootSlots = {},
        slotProps: configRootSlotProps = {}
    } = components?.SectionNumberFieldCard ?? {};
    const {
        disabled: configDisabled,
        variant: configVariant,
        slots: configSlots = {},
        slotProps: {
            control: configControlProps = {},
            ...configSlotProps
        } = {}
    } = components?.SectionFilledNumberFieldCard ?? {};

    const theme = useTheme();

    const disabled = _disabled ?? configDisabled ?? configRootDisabled;
    return (
        <SectionCard
            disabled={disabled}
            variant={variant ?? configVariant ?? configRootVariant}
            className={clsx(sectionFilledNumberFieldCardClasses.root, className)}
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
            slots={merges(configRootSlots, configSlots, slots)}
            slotProps={merges(configRootSlotProps, configSlotProps, slotProps)}
            {...props}
        >
            {children}
            <FilledNumberField
                value={value}
                setValue={setValue}
                disabled={disabled}
                className={sectionFilledNumberFieldCardClasses.control}
                sx={{ width: { xs: '100%', md: 300 } }}
                {...merges(configControlProps, controlProps)}
            />
        </SectionCard>
    );
};

export type SectionFilledNumberFieldCardConfigProps = Partial<Omit<SectionCardRootProps & SectionFilledNumberFieldCardSlotProps, keyof SectionCardDisplayRootProps>>;
