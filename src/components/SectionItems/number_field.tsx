'use client';

import React from 'react';
import { NumberField } from '../NumberField';
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

export interface NumberFieldItemProps extends ItemTextBlockProps, ItemIconProps, ItemDisabledProps, ItemVariableProps<number> {
    step?: number;
    min?: number;
    max?: number;
}

export const NumberFieldItem = ({
                                    icon,
                                    primary,
                                    secondary,
                                    value,
                                    setValue,
                                    step,
                                    min,
                                    max,
                                    disabled
                                }: NumberFieldItemProps) => (
    <ItemRoot>
        <ItemRowContainer size={secondary ? 'medium' : 'small'}>
            <ItemIcon icon={icon} />
            <ItemTextBlock primary={primary} secondary={secondary} disabled={disabled} />
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
