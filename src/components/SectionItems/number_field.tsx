'use client';

import clsx from 'clsx';
import React from 'react';
import { NumberField } from '../NumberField';
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

export const numberFieldItemClasses = {
    root: 'NumberFieldItem-root',
    control: 'NumberFieldItem-control'
};

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
        className,
        sx
    }: NumberFieldItemProps
) => (
    <ItemRoot className={clsx(numberFieldItemClasses.root, disabled && sectionItemClasses.disabled, className)} sx={sx}>
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
            <NumberField
                value={value}
                setValue={setValue}
                step={step}
                min={min}
                max={max}
                disabled={disabled}
                className={numberFieldItemClasses.control}
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
