'use client';

import {
    ListItemButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Select as MuiSelect,
    SelectProps as MuiSelectProps,
    useMediaQuery
} from '@mui/material';
import xor from 'lodash/xor';
import React, { Fragment, MouseEvent, ReactNode, useCallback, useState } from 'react';
import { Virtualizer } from 'virtua';
import {
    getMobilePickerDefaultSnap,
    getMobilePickerSnapPoints,
    MobilePickerContent,
    MobilePickerRoot,
    PickerItemIcon,
    PickerItemText,
    useMobilePickerRef
} from '../Picker';
import { SectionCardDisabledProps, SectionCardDisplayRootProps, SectionCardVariableProps } from '../SectionCard';

export interface SelectItemRoot<T> extends SectionCardDisabledProps {
    value: T;
}

export type SelectItem<T> = SelectItemRoot<T> & ({ children: ReactNode } | SectionCardDisplayRootProps);

export interface SelectRootProps<T> extends Pick<MuiSelectProps, 'multiple' | 'disabled' | 'variant' | 'size' | 'fullWidth' | 'className' | 'sx'> {
    choices: SelectItem<T>[];
}

export interface SingleSelectProps<T> extends SelectRootProps<T>, SectionCardVariableProps<{ value: T; }> {
    multiple?: false;
}

export interface MultipleSelectProps<T> extends SelectRootProps<T>, SectionCardVariableProps<{ value: T[]; }> {
    multiple: true;
}

export type SelectProps<T> =
    SelectRootProps<T>
    & (SingleSelectProps<T> | MultipleSelectProps<T>);

export const Select = <T, >(
    {
        value,
        setValue,
        choices,
        multiple,
        ...props
    }: SelectProps<T>
) => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const { sheetScrollRef, setSheetContentRef } = useMobilePickerRef();

    const [open, setOpen] = useState(false);

    const handleSelectOpen = useCallback(() => setOpen(true), []);

    const handleSelectClose = useCallback(() => setOpen(false), []);

    const handleChoiceClick = useCallback((choice: SelectItem<T>, index: number) => (e: MouseEvent<HTMLElement>) => {
        if (multiple) {
            setValue((prevValue) => xor(prevValue, [choice.value]));
        } else {
            setValue(choice.value);
        }

        if (!e.shiftKey)
            setOpen(false);
    }, [setValue, multiple]);

    return (
        <Fragment>
            <MuiSelect
                value={value}
                multiple={multiple}
                onOpen={handleSelectOpen}
                onClose={handleSelectClose}
                {...props}
            >
                {choices.map((choice, index) => (
                    <MenuItem
                        key={index}
                        onClick={handleChoiceClick(choice, index)}
                        selected={value === choice.value}
                        disabled={choice.disabled}
                    >
                        {'children' in choice ? choice.children : <Fragment>
                            {choice.icon && <ListItemIcon>{choice.icon}</ListItemIcon>}
                            {(choice.primary || choice.secondary) && <ListItemText
                                primary={choice.primary}
                                secondary={choice.secondary}
                            />}
                        </Fragment>}
                    </MenuItem>
                ))}
            </MuiSelect>

            <MobilePickerRoot
                open={isSmall && open}
                onDismiss={() => setOpen(false)}
                expandOnContentDrag
                defaultSnap={getMobilePickerDefaultSnap}
                snapPoints={getMobilePickerSnapPoints}
                initialFocusRef={false}
            >
                <MobilePickerContent ref={setSheetContentRef}>
                    <Virtualizer scrollRef={sheetScrollRef} overscan={2}>
                        {choices.map((choice, index) => (
                            <ListItemButton
                                onClick={handleChoiceClick(choice, index)}
                                selected={value === choice.value}
                                disabled={choice.disabled}
                            >
                                {'children' in choice ? choice.children : <Fragment>
                                    {choice.icon && <PickerItemIcon>{choice.icon}</PickerItemIcon>}
                                    {(choice.primary || choice.secondary) && <PickerItemText
                                        primary={choice.primary}
                                        secondary={choice.secondary}
                                    />}
                                </Fragment>}
                            </ListItemButton>
                        ))}
                    </Virtualizer>
                </MobilePickerContent>
            </MobilePickerRoot>
        </Fragment>
    );
};
