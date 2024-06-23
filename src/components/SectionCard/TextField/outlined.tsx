'use client';

import { OutlinedInput, useTheme } from '@mui/material';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { ConfigContext } from '../../../utils';
import {
    SectionCard,
    sectionCardClasses,
    SectionCardDisplayRootProps,
    SectionCardProps,
    SectionCardRootProps
} from '../index';
import { generateSectionControlCardClasses, merges, SectionControlCardSlotProps } from '../utils';
import { SectionTextFieldCardRootProps } from './index';

export const sectionOutlinedTextFieldCardClasses = generateSectionControlCardClasses('OutlinedTextField');

export type SectionOutlinedTextFieldCardSlotProps = SectionControlCardSlotProps<typeof OutlinedInput>;

export type SectionOutlinedTextFieldCardProps =
    SectionCardProps
    & SectionTextFieldCardRootProps
    & SectionOutlinedTextFieldCardSlotProps;

export const SectionOutlinedTextFieldCard = (
    {
        children,
        value,
        setValue,
        disabled: _disabled,
        variant,
        className,
        sx,
        slots,
        slotProps: { control: controlProps, ...slotProps } = {},
        ...props
    }: SectionOutlinedTextFieldCardProps
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
        slotProps: {
            control: configControlProps = {},
            ...configSlotProps
        } = {}
    } = components?.SectionOutlinedTextFieldCard ?? {};

    const theme = useTheme();

    const disabled = _disabled ?? configDisabled ?? configRootDisabled;
    return (
        <SectionCard
            disabled={disabled}
            variant={variant ?? configVariant ?? configRootVariant}
            className={clsx(sectionOutlinedTextFieldCardClasses.root, className)}
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
            <OutlinedInput
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={disabled}
                size="small"
                margin="none"
                className={sectionOutlinedTextFieldCardClasses.control}
                sx={{ width: { xs: '100%', md: 300 } }}
                {...merges(configControlProps, controlProps)}
            />
        </SectionCard>
    );
};

export type SectionOutlinedTextFieldCardConfigProps = Partial<Omit<SectionCardRootProps & SectionOutlinedTextFieldCardSlotProps, keyof SectionCardDisplayRootProps>>;
