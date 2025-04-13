'use client';

import { Box, Typography } from '@mui/material';
import deepmerge from 'lodash/merge';
import xor from 'lodash/xor';
import React, { Fragment, MouseEvent, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { SectionCardDisabledProps, SectionCardDisplayRootProps, SectionCardVariableProps } from '../SectionCard';
import { SelectOutlinedInput, SelectOutlinedInputProps } from './input';
import { SelectPicker, SelectPickerSlotProps } from './picker';

export interface SelectChoiceButtonRoot<T> extends SectionCardDisabledProps {
    type?: 'button';
    value: T;
}

export type SelectChoiceButton<T> = SelectChoiceButtonRoot<T> & ({ children: ReactNode } | SectionCardDisplayRootProps);

export interface SelectChoiceGroup<T> {
    type: 'group';
    label: ReactNode;
    items: (SelectChoiceButton<T> | SelectChoiceButtonDivider)[];
}

export interface SelectChoiceButtonDivider {
    type: 'divider';
}

export type SelectChoiceItem<T> = SelectChoiceButton<T> | SelectChoiceGroup<T> | SelectChoiceButtonDivider;

export interface SelectRootProps<T> extends SectionCardDisabledProps {
    choices: SelectChoiceItem<T>[];
    multiple?: boolean;
}

export interface SingleSelectProps<T> extends SelectRootProps<T>, SectionCardVariableProps<{ value: T; }> {
    multiple?: false;
}

export interface MultipleSelectProps<T> extends SelectRootProps<T>, SectionCardVariableProps<{ value: T[]; }> {
    multiple: true;
}

export interface SelectSlotProps {
    slotProps?: {
        input?: SelectOutlinedInputProps['slotProps'];
        picker?: SelectPickerSlotProps['slotProps'];
    };
}

export type SelectProps<T> = (SingleSelectProps<T> | MultipleSelectProps<T>) & SelectSlotProps;

export const Select = <T, >(
    {
        value,
        setValue,
        choices,
        multiple,
        disabled,
        slotProps
    }: SelectProps<T>
) => {
    const inputRef = useRef<HTMLDivElement | null>(null);
    const desktopPickerRef = useRef<HTMLDivElement | null>(null);

    const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>(undefined);
    const [inputWidth, setInputWidth] = useState<number>(0);
    const [desktopPickerWidth, setDesktopPickerWidth] = useState<number>(0);

    const renderValue = useCallback(() => {
        const render = (choice: SelectChoiceButton<T>) => {
            if ('children' in choice)
                return choice.children;

            return (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {choice.icon}
                    {choice.primary}
                </Box>
            );
        };

        if (Array.isArray(value)) {
            return (
                <Typography>
                    {choices
                        .filter((choice): choice is SelectChoiceButton<T> => !choice.type || choice.type === 'button')
                        .filter((choice) => value.includes(choice.value))
                        .map(render)
                        .join(', ')}
                </Typography>
            );
        }

        const choice = choices
            .filter((choice): choice is SelectChoiceButton<T> => !choice.type || choice.type === 'button')
            .find((choice) => value === choice.value);
        if (!choice)
            return undefined;

        return render(choice);
    }, [choices, value]);

    const handleChoiceClick = useCallback((choice: SelectChoiceButton<T>) => (e: MouseEvent<HTMLElement>) => {
        if (multiple) {
            setValue((prevValue) => xor(prevValue, [choice.value]));
        } else {
            setValue(choice.value);
        }

        if (!e.shiftKey)
            setAnchorEl(undefined);
    }, [setValue, multiple]);

    useEffect(() => {
        const inputElement = inputRef.current;
        if (!inputElement)
            return;

        setInputWidth(inputElement.offsetWidth);
    }, [inputRef, value]);

    useEffect(() => {
        const desktopPickerElement = desktopPickerRef.current;
        if (!desktopPickerElement)
            return;

        setDesktopPickerWidth(desktopPickerElement.offsetWidth);
    }, [desktopPickerRef, choices]);

    return (
        <Fragment>
            <SelectOutlinedInput
                ref={inputRef}
                open={Boolean(anchorEl)}
                onClick={(e) => setAnchorEl(e.currentTarget)}
                disabled={disabled}
                slotProps={slotProps?.input}
            >
                {renderValue()}
            </SelectOutlinedInput>

            <SelectPicker<T>
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                choices={choices}
                selected={multiple ? value : [value]}
                onClick={handleChoiceClick}
                slotProps={{
                    desktop: {
                        root: deepmerge(
                            {
                                ref: desktopPickerRef,
                                sx: {
                                    minWidth: inputWidth > desktopPickerWidth ? inputWidth : undefined
                                }
                            },
                            slotProps?.picker?.desktop?.root
                        )
                    },
                    mobile: slotProps?.picker?.mobile
                }}
            />
        </Fragment>
    );
};

export * from './input';
export * from './picker';
