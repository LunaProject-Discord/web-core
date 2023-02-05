'use client';

import { KeyboardArrowDownOutlined, KeyboardArrowUpOutlined } from '@mui/icons-material';
import { InputAdornment, inputBaseClasses, OutlinedInput, styled, Theme } from '@mui/material';
import { SxProps } from '@mui/system';
import React from 'react';
import { ButtonBase } from '../ButtonBase';

export const SpinButton = styled(ButtonBase)({
    height: 20,
    borderRadius: 0
});

export interface NumberFieldProps {
    value: number;
    setValue: (value: number) => void;
    step?: number;
    min?: number;
    max?: number;
    disabled?: boolean;
    placeholder?: string;
    sx?: SxProps<Theme>;
}

export const NumberField = ({ value, setValue, step, min, max, disabled, placeholder, sx }: NumberFieldProps) => {
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
                step: amount,
                min,
                max
            }}
            disabled={disabled}
            placeholder={placeholder}
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
                                setValue(value + amount);
                        }}
                        disabled={disabled || value === max}
                        tabIndex={-1}
                        sx={{ borderTopRightRadius: (theme) => theme.shape.borderRadius }}
                    >
                        <KeyboardArrowUpOutlined />
                    </SpinButton>
                    <SpinButton
                        onClick={() => {
                            if (!min || (value - amount) >= min)
                                setValue(value - amount);
                        }}
                        disabled={disabled || value === min}
                        tabIndex={-1}
                        sx={{ borderBottomRightRadius: (theme) => theme.shape.borderRadius }}
                    >
                        <KeyboardArrowDownOutlined />
                    </SpinButton>
                </InputAdornment>
            }
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
