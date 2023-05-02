'use client';

import { MenuItem } from '@mui/material';
import React, { ReactNode } from 'react';
import { Select } from '../Select';
import {
    ItemFormContainer,
    ItemIcon,
    ItemProps,
    ItemRoot,
    ItemRowContainer,
    ItemTextBlock,
    ItemVariableProps
} from './index';

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
        sx
    }: SelectItemProps<T>
) => (
    <ItemRoot sx={sx}>
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
