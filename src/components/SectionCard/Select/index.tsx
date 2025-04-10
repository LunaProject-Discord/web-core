'use client';

import { useTheme } from '@mui/material';
import { SlotComponentProps } from '@mui/utils';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { ConfigContext } from '../../../utils';
import { Select, SelectProps } from '../../Select';
import {
    SectionCard,
    sectionCardClasses,
    SectionCardDisplayRootProps,
    SectionCardProps,
    SectionCardRootProps,
    SlotRootProps
} from '../index';
import { generateSectionControlCardClasses, merges, SectionControlCardSlotProps } from '../utils';

export const sectionSelectCardClasses = generateSectionControlCardClasses('Select');

export type SectionSelectCardSlotProps<T> = SectionControlCardSlotProps<typeof Select<T>>;

export type SectionSelectCardProps<T> =
    SectionCardProps
    & SelectProps<T>
    & SectionSelectCardSlotProps<T>;

export const SectionSelectCard = <T, >(
    {
        children,
        value,
        setValue,
        choices,
        multiple,
        disabled: _disabled,
        variant,
        className,
        sx,
        slots = {},
        slotProps: { control: controlProps = {}, ...slotProps } = {},
        ...props
    }: SectionSelectCardProps<T>
) => {
    const { components } = useContext(ConfigContext);
    const {
        disabled: configDisabled,
        variant: configVariant,
        slots: configSlots = {},
        slotProps: {
            control: configControlProps = {},
            ...configSlotProps
        } = {}
    } = components?.SectionSelectCard ?? {};

    const theme = useTheme();

    const disabled = _disabled ?? configDisabled;
    return (
        <SectionCard
            disabled={disabled}
            variant={variant ?? configVariant}
            className={clsx(sectionSelectCardClasses.root, className)}
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
            slots={merges(configSlots, slots)}
            slotProps={merges(configSlotProps, slotProps)}
            {...props}
        >
            {children}
            {/* @ts-ignore */}
            <Select<T>
                value={value}
                setValue={setValue}
                choices={choices}
                multiple={multiple}
                disabled={disabled}
                fullWidth
                size="small"
                className={sectionSelectCardClasses.control}
                sx={{ minWidth: 300 }}
                {...merges(configControlProps as SlotComponentProps<typeof Select<T>, SlotRootProps, {}>, controlProps)}
            />
        </SectionCard>
    );
};

export type SectionSelectCardConfigProps = Partial<Omit<SectionCardRootProps & SectionSelectCardSlotProps<unknown>, keyof SectionCardDisplayRootProps>>;
