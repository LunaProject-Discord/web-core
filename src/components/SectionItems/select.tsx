'use client';

import { MenuItem } from '@mui/material';
import React, { ReactNode } from 'react';
import { Select } from '../Select';
import {
    ItemDisabledProps,
    ItemFormContainer,
    ItemIcon,
    ItemIconProps,
    ItemRoot,
    ItemRowContainer,
    ItemTextBlock,
    ItemTextBlockProps,
    ItemVariableProps
} from './index';

export interface SelectItemProps<T> extends ItemTextBlockProps, ItemIconProps, ItemDisabledProps, ItemVariableProps<T> {
    choices: ({ value: T; children?: ReactNode; })[];
}

export const SelectItem = <T, >(
    {
        icon,
        primary,
        secondary,
        value,
        setValue,
        choices,
        disabled
    }: SelectItemProps<T>
) => (
    <ItemRoot>
        <ItemRowContainer size={secondary ? 'medium' : 'small'}>
            <ItemIcon icon={icon} />
            <ItemTextBlock primary={primary} secondary={secondary} disabled={disabled} />
        </ItemRowContainer>
        <ItemFormContainer>
            <Select<T>
                value={value}
                onChange={(e) => setValue(e.target.value as T)}
                disabled={disabled}
                fullWidth
                size="small"
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
