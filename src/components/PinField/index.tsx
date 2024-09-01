'use client';

import { Box, styled } from '@mui/material';
import clsx from 'clsx';
import React, { ClipboardEvent, InputHTMLAttributes, KeyboardEvent, useState } from 'react';
import { generateComponentClasses } from '../../utils';
import { ItemDisabledProps, ItemVariableProps } from '../SectionItems';

export const pinFieldClasses = generateComponentClasses(
    'PinField',
    [
        'root',
        'input',

        'disabled'
    ]
);

const IGNORED_META_KEYS = ['Control', 'Alt', 'Meta', 'Tab', 'CapsLock', 'Shift', 'Enter'];

export const PinFieldInput = styled(
    ({ disabled, className, ...props }: InputHTMLAttributes<HTMLInputElement>) => (
        <Box
            component="input"
            disabled={disabled}
            className={
                clsx(
                    pinFieldClasses.input,
                    disabled && pinFieldClasses.disabled,
                    className
                )
            }
            {...props}
        />
    )
)<InputHTMLAttributes<HTMLInputElement>>(({ theme }) => ({
    minWidth: 0,
    padding: theme.spacing(1),
    flexGrow: 0,
    fontFamily: 'Renner, sans-serif',
    fontSize: theme.typography.h5.fontSize,
    textAlign: 'center',
    color: (theme.vars || theme).palette.text.primary,
    backgroundColor: (theme.vars || theme).palette.background.default,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.23)',
    borderRadius: theme.shape.borderRadius,
    outline: 'none',
    ...theme.applyStyles('dark', {
        borderColor: 'rgba(255, 255, 255, 0.23)',
    }),
    '&:hover': {
        borderColor: (theme.vars || theme).palette.text.primary
    },
    '&:focus': {
        padding: theme.spacing(.875),
        borderWidth: 2,
        borderColor: (theme.vars || theme).palette.primary.main
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
        <Box
            className={clsx(pinFieldClasses.root, disabled && pinFieldClasses.disabled)}
            sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: 1 }}
        >
            {[...Array(length)].map((_, i) => (
                <PinFieldInput
                    key={i}
                    value={values[i]}
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
