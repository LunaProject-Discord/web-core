'use client';

import { Box, styled } from '@mui/material';
import React, { ChangeEvent, ClipboardEvent, KeyboardEvent, useState } from 'react';
import { ItemDisabledProps, ItemVariableProps } from '../SectionItems';

const IGNORED_META_KEYS = ['Control', 'Alt', 'Meta', 'Tab', 'CapsLock', 'Shift', 'Enter'];

export const PinFieldInput = styled('input')(({ theme, disabled }) => ({
    minWidth: 0,
    padding: theme.spacing(1),
    flexGrow: 0,
    fontFamily: 'Renner, sans-serif',
    fontSize: theme.typography.h5.fontSize,
    textAlign: 'center',
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)',
    borderRadius: theme.shape.borderRadius,
    outline: 'none',
    '&:hover': {
        borderColor: theme.palette.text.primary
    },
    '&:focus': {
        padding: theme.spacing(7 / 8),
        borderWidth: 2,
        borderColor: theme.palette.primary.main
    }
}));

export interface PinFieldProps extends ItemDisabledProps, ItemVariableProps<string> {
    length: number;
    pattern?: RegExp;
    capitalize?: 'upper' | 'lower' | 'none';
}

export const PinField = ({ value, setValue, length, pattern, capitalize, disabled }: PinFieldProps) => {
    const [values, setValues] = useState(
        value.length === length ? value.split('') : new Array<string>(length).fill('')
    );

    const focusInput = (input: HTMLInputElement) => {
        const inputValue = input.value;
        input.focus();
        input.setSelectionRange(inputValue.length, inputValue.length);
    };

    const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>, i: number) => {
        const key = e.key;
        const { value: targetValue, parentElement } = e.currentTarget;

        const newValues = [...values];

        switch (key) {
            case 'Backspace':
                e.preventDefault();

                const newDeletedValue = targetValue.length > 0 ? targetValue.slice(0, -1) : '';
                newValues[i] = newDeletedValue;
                setValues(newValues);

                setValue(newValues.join(''));

                if (i > 0 && targetValue.length < 1)
                    focusInput(parentElement?.children[i - 1] as HTMLInputElement);

                return;
            case 'ArrowLeft':
                e.preventDefault();

                if (i === 0) return;

                focusInput(parentElement?.children[i - 1] as HTMLInputElement);
                return;
            case 'ArrowRight':
                e.preventDefault();

                if (i === length - 1) return;

                focusInput(parentElement?.children[i + 1] as HTMLInputElement);
                return;
            case 'ArrowUp':
            case 'ArrowDown':
                e.preventDefault();
                return;
            default:
                if (e.ctrlKey || e.altKey || e.metaKey || IGNORED_META_KEYS.includes(key) || key.length > 1) return;

                e.preventDefault();

                if (pattern && !pattern.test(key) || newValues[i].length > 0) return;

                newValues[i] = capitalize === 'upper' ? key.toUpperCase() : (capitalize === 'lower' ? key.toLowerCase() : key);
                setValues(newValues);

                setValue(newValues.join(''));

                if (key.length < 1 || i === length - 1) return;
                focusInput(parentElement?.children[i + 1] as HTMLInputElement);
                return;
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    };

    const handleInputPaste = (e: ClipboardEvent<HTMLInputElement>) => {
        const parentElement = e.currentTarget.parentElement;

        e.preventDefault();

        const pastedValue = e.clipboardData.getData('text/plain');
        if (pastedValue.length !== length || values.some((char) => char.length > 0)
            || pattern && !pattern.test(pastedValue)) return;

        const newValues = [...values];
        for (let i = 0; i < length; i++) {
            const char = pastedValue[i];

            newValues[i] = capitalize === 'upper' ? char.toUpperCase() : (capitalize === 'lower' ? char.toLowerCase() : char);
            setValues(newValues);

            setValue(newValues.join(''));

            if (i === length - 1) return;
            focusInput(parentElement?.children[i + 1] as HTMLInputElement);
        }
    };

    return (
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: 1 }}>
            {[...Array(length)].map((_, i) => (
                <PinFieldInput
                    key={i}
                    value={values[i]}
                    onChange={(e) => handleInputChange(e)}
                    onKeyDown={(e) => handleInputKeyDown(e, i)}
                    onPaste={(e) => handleInputPaste(e)}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]"
                    minLength={1}
                    maxLength={1}
                    disabled={disabled}
                />
            ))}
        </Box>
    );
};
