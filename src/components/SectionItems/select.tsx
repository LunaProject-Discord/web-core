'use client';

import { MenuItem } from '@mui/material';
import clsx from 'clsx';
import React, { ReactNode } from 'react';
import { Select } from '../Select';
import {
    ItemFormContainer,
    ItemIcon,
    ItemProps,
    ItemRoot,
    ItemRowContainer,
    ItemTextBlock,
    ItemVariableProps,
    sectionItemClasses
} from './index';

export const selectItemClasses = {
    root: 'SelectItem-root',
    control: 'SelectItem-control'
};

export interface SelectItemProps<T> extends ItemProps, ItemVariableProps<T> {
    choices: ({ value: T; children?: ReactNode; })[];
}

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
        <ItemRowContainer size={secondary ? 'medium' : 'small'}>
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
                    <MenuItem key={choice.value as string} value={choice.value as string}>
                        {choice.children}
                    </MenuItem>
                ))}
            </Select>
        </ItemFormContainer>
    </ItemRoot>
);
