'use client';

import { MenuItem, MenuItemProps, MenuItemTypeMap, Select } from '@mui/material';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { ConfigContext } from '../../../utils';
import { SectionCard, SectionCardProps, SectionCardVariableProps, SectionControlCardSlotProps } from '../index';
import { getSectionControlCardClasses } from '../utils';

export const sectionSelectCardClasses = getSectionControlCardClasses('Select');

export interface SectionSelectCardRootProps<T> extends SectionCardVariableProps<{ value: T }> {
    choices: MenuItemProps<MenuItemTypeMap['defaultComponent'], { value: T }>[];
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
        disabled,
        variant,
        className,
        sx,
        slots,
        slotProps,
        ...props
    }: SectionSelectCardProps<T>
) => {
    const { components } = useContext(ConfigContext);

    return (
        <SectionCard
            disabled={disabled}
            variant={variant ?? components?.SectionSelectCard?.variant}
            className={clsx(sectionSelectCardClasses.root, className)}
            slots={slots}
            slotProps={slotProps}
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
                {...slotProps?.control}
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
