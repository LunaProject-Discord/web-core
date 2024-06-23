'use client';

import { SlotComponentProps } from '@mui/base';
import { MenuItem, MenuItemProps, MenuItemTypeMap, Select, useTheme } from '@mui/material';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { ConfigContext } from '../../../utils';
import {
    SectionCard,
    sectionCardClasses,
    SectionCardDisplayRootProps,
    SectionCardProps,
    SectionCardRootProps,
    SectionCardVariableProps,
    SlotRootProps
} from '../index';
import { generateSectionControlCardClasses, merges, SectionControlCardSlotProps } from '../utils';

export const sectionSelectCardClasses = generateSectionControlCardClasses('Select');

export interface SectionSelectCardRootProps<T> extends SectionCardVariableProps<{ value: T; }> {
    choices: MenuItemProps<MenuItemTypeMap['defaultComponent'], { value: T; }>[];
}

export type SectionSelectCardSlotProps<T> = SectionControlCardSlotProps<typeof Select<T>>;

export type SectionSelectCardProps<T> =
    SectionCardProps
    & SectionSelectCardRootProps<T>
    & SectionSelectCardSlotProps<T>;

export const SectionSelectCard = <T, >(
    {
        children,
        value,
        setValue,
        choices,
        disabled: _disabled,
        variant,
        className,
        sx,
        slots,
        slotProps: { control: controlProps, ...slotProps } = {},
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
            <Select<T>
                value={value}
                onChange={(e) => setValue(e.target.value as T)}
                disabled={disabled}
                fullWidth
                size="small"
                className={sectionSelectCardClasses.control}
                sx={{ minWidth: 300 }}
                {...merges(configControlProps as SlotComponentProps<typeof Select<T>, SlotRootProps, {}>, controlProps)}
            >
                {choices.map(({ value: choiceValue, ...choiceProps }) => (
                    <MenuItem
                        key={choiceValue as string}
                        value={choiceValue as string}
                        {...choiceProps}
                    />
                ))}
            </Select>
        </SectionCard>
    );
};

export type SectionSelectCardConfigProps = Partial<Omit<SectionCardRootProps & SectionSelectCardSlotProps<unknown>, keyof SectionCardDisplayRootProps>>;
