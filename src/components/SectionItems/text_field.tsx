'use client';

import { OutlinedInput } from '@mui/material';
import React from 'react';
import {
    ItemFormContainer,
    ItemIcon,
    ItemProps,
    ItemRoot,
    ItemRowContainer,
    ItemTextBlock,
    ItemVariableProps
} from './index';

export interface TextFieldProps extends ItemProps, ItemVariableProps<string> {
    minLength?: number;
    maxLength?: number;
}

export const TextFieldItem = (
    {
        icon,
        iconSx,
        primary,
        secondary,
        primaryTypographyProps,
        secondaryTypographyProps,
        value,
        setValue,
        minLength,
        maxLength,
        disabled,
        sx
    }: TextFieldProps
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
            <OutlinedInput
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type="text"
                inputProps={{
                    minLength,
                    maxLength
                }}
                disabled={disabled}
                size="small"
                margin="none"
                sx={{ width: { xs: '100%', md: 300 } }}
            />
        </ItemFormContainer>
    </ItemRoot>
);
