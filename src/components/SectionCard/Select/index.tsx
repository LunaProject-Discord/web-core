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
    SectionControlCardSlotProps,
    SlotRootProps
} from '../index';
import { generateSectionControlCardClasses } from '../utils';

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
        slotProps,
        ...props
    }: SectionSelectCardProps<T>
) => {
    const { components } = useContext(ConfigContext);
    const {
        disabled: configDisabled,
        variant: configVariant,
        slots: configSlots,
        slotProps: configSlotProps
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
            slots={slots ?? configSlots}
            slotProps={slotProps ?? configSlotProps}
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
                {...(slotProps?.control ?? (configSlotProps?.control as SlotComponentProps<typeof Select<T>, SlotRootProps, {}>))}
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
