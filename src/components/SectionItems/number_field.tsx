'use client';

import React from 'react';
import { NumberField } from '../NumberField';
import {
    ItemFormContainer,
    ItemIcon,
    ItemProps,
    ItemRoot,
    ItemRowContainer,
    ItemTextBlock,
    ItemVariableProps
} from './index';

export interface NumberFieldItemProps extends ItemProps, ItemVariableProps<number> {
    step?: number;
    min?: number;
    max?: number;
}

export const NumberFieldItem = (
    {
        icon,
        iconSx,
        primary,
        secondary,
        primaryTypographyProps,
        secondaryTypographyProps,
        value,
        setValue,
        step,
        min,
        max,
        disabled,
        sx
    }: NumberFieldItemProps
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
            <NumberField
                value={value}
                setValue={setValue}
                step={step}
                min={min}
                max={max}
                disabled={disabled}
                sx={{
                    width: {
                        xs: '100%',
                        md: 300
                    }
                }}
            />
        </ItemFormContainer>
    </ItemRoot>
);
