'use client';

import { MenuItem, Select } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import {
    ItemFormContainer,
    ItemIcon,
    ItemProps,
    ItemRoot,
    ItemRowContainer,
    ItemTextBlock,
    ItemVariableChoicesProps,
    sectionItemClasses
} from './index';

export const selectItemClasses = {
    root: 'SelectItem-root',
    control: 'SelectItem-control'
};

export type SelectItemProps<T> = ItemProps & ItemVariableChoicesProps<T>;

export const SelectItem = <T, >(
    {
        icon,
        iconSx,
        primary,
        secondary,
        primaryTypographyProps,
        secondaryTypographyProps,
        value,
        setValue,
        choices,
        disabled,
        className,
        sx
    }: SelectItemProps<T>
) => (
    <ItemRoot className={clsx(selectItemClasses.root, disabled && sectionItemClasses.disabled, className)} sx={sx}>
        <ItemRowContainer dense={!secondary}>
            <ItemIcon icon={icon} iconSx={iconSx} />
            <ItemTextBlock
                primary={primary}
                secondary={secondary}
                primaryTypographyProps={primaryTypographyProps}
                secondaryTypographyProps={secondaryTypographyProps}
                disabled={disabled}
            />
        </ItemRowContainer>
        <ItemFormContainer>
            <Select<T>
                value={value}
                onChange={(e) => setValue(e.target.value as T)}
                disabled={disabled}
                fullWidth
                size="small"
                className={selectItemClasses.control}
                sx={{ minWidth: 300 }}
            >
                {choices.map((choice) => (
                    <MenuItem
                        key={choice.value as string}
                        value={choice.value as string}
                        disabled={choice.disabled}
                        sx={choice.sx}
                    >
                        {choice.children}
                    </MenuItem>
                ))}
            </Select>
        </ItemFormContainer>
    </ItemRoot>
);
