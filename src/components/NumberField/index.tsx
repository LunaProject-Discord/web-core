'use client';

import { InputAdornment, inputBaseClasses, OutlinedInput, styled, Theme } from '@mui/material';
import { SxProps } from '@mui/system';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { ConfigContext, generateComponentClasses } from '../../utils';
import { ButtonBase } from '../ButtonBase';
import { SectionCardDisabledProps, SectionCardVariableProps } from '../SectionCard';
import { ItemDisabledProps, ItemVariableProps } from '../SectionItems';

export const numberFieldClasses = generateComponentClasses(
    'NumberField',
    [
        'root',
        'field',
        'spinButton',
        'spinButtonIncrement',
        'spinButtonDecrement',

        'disabled',
        'variantStandard',
        'variantOutlined',
        'variantFilled'
    ]
);

export const SpinButton = styled(ButtonBase)({
    height: 20,
    borderRadius: 0
});

export interface NumberFieldProps extends ItemDisabledProps, ItemVariableProps<number> {
    pattern?: string;
    step?: number;
    min?: number;
    max?: number;
    placeholder?: string;
    className?: string;
    sx?: SxProps<Theme>;
}

export interface NumberFieldRootProps extends SectionCardDisabledProps, SectionCardVariableProps<{ value: number; }> {
    disabledArrowKeys?: boolean;
    min?: number;
    max?: number;
    step?: number;
    shiftMultiplier?: number;
}

export const NumberField = (
    {
        value,
        setValue,
        pattern,
        step,
        min,
        max,
        placeholder,
        disabled,
        className,
        sx
    }: NumberFieldProps
) => {
    const { icons: { Decrement, Increment } } = useContext(ConfigContext);

    const amount = step ?? 1;
    return (
        <OutlinedInput
            value={value}
            onChange={(e) => {
                const i = Number(e.target.value);
                if (min && i < min) {
                    setValue(min);
                    return;
                }

                if (max && i > max) {
                    setValue(max);
                    return;
                }

                setValue(i);
            }}
            type="number"
            inputProps={{
                pattern,
                step: amount,
                min,
                max,
                className: clsx(numberFieldClasses.field, disabled && numberFieldClasses.disabled)
            }}
            placeholder={placeholder}
            disabled={disabled}
            size="small"
            margin="none"
            endAdornment={
                <InputAdornment
                    position="end"
                    sx={{
                        height: '100%',
                        maxHeight: 'unset',
                        m: 0,
                        flexDirection: 'column',
                        placeItems: 'center',
                        placeContent: 'center',
                        cursor: 'default'
                    }}
                >
                    <SpinButton
                        onClick={() => {
                            if (!max || (value + amount) <= max)
                                setValue((prevValue) => prevValue + amount);
                        }}
                        disabled={disabled || value === max}
                        tabIndex={-1}
                        className={clsx(numberFieldClasses.spinButton, numberFieldClasses.spinButtonIncrement, (disabled || value === max) && numberFieldClasses.disabled)}
                        sx={{ borderTopRightRadius: (theme) => theme.shape.borderRadius }}
                    >
                        <Increment />
                    </SpinButton>
                    <SpinButton
                        onClick={() => {
                            if (!min || (value - amount) >= min)
                                setValue((prevValue) => prevValue - amount);
                        }}
                        disabled={disabled || value === min}
                        tabIndex={-1}
                        className={clsx(numberFieldClasses.spinButton, numberFieldClasses.spinButtonDecrement, (disabled || value === min) && numberFieldClasses.disabled)}
                        sx={{ borderBottomRightRadius: (theme) => theme.shape.borderRadius }}
                    >
                        <Decrement />
                    </SpinButton>
                </InputAdornment>
            }
            className={clsx(numberFieldClasses.root, disabled && numberFieldClasses.disabled, className)}
            sx={{
                p: 0,
                [`& .${inputBaseClasses.input}`]: {
                    px: 1.75,
                    py: '8.5px'
                },
                [`& .${inputBaseClasses.input}::-webkit-outer-spin-button, .${inputBaseClasses.input}::-webkit-inner-spin-button`]: {
                    m: 0,
                    WebkitAppearance: 'none'
                },
                [`& .${inputBaseClasses.input}[type=number]`]: {
                    MozAppearance: 'textfield'
                },
                ...sx
            }}
        />
    );
};

export * from './filled';
export * from './outlined';
