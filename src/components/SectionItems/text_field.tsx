'use client';

import { OutlinedInput } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
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

export const textFieldItemClasses = {
    root: 'TextFieldItem-root',
    control: 'TextFieldItem-control'
};

export interface TextFieldProps extends ItemProps, ItemVariableProps<string> {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    placeholder?: string;
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
        pattern,
        minLength,
        maxLength,
        placeholder,
        disabled,
        className,
        sx
    }: TextFieldProps
) => (
    <ItemRoot className={clsx(textFieldItemClasses.root, disabled && sectionItemClasses.disabled, className)} sx={sx}>
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
            <OutlinedInput
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type="text"
                inputProps={{
                    pattern,
                    minLength,
                    maxLength
                }}
                placeholder={placeholder}
                disabled={disabled}
                size="small"
                margin="none"
                className={textFieldItemClasses.control}
                sx={{ width: { xs: '100%', md: 300 } }}
            />
        </ItemFormContainer>
    </ItemRoot>
);
