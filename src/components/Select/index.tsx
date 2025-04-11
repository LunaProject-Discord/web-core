'use client';

import {
    alpha,
    Box,
    BoxProps,
    Divider,
    getOverlayAlpha,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    MenuItem,
    Select as MuiSelect,
    SelectProps as MuiSelectProps,
    styled,
    useMediaQuery
} from '@mui/material';
import xor from 'lodash/xor';
import React, { Fragment, MouseEvent, ReactNode, useCallback, useState } from 'react';
import { SnapPointProps } from 'react-spring-bottom-sheet/dist/types';
import { Virtualizer } from 'virtua';
import { MobilePickerContent, MobilePickerRoot, PickerItemIcon, PickerItemText, useMobilePickerRef } from '../Picker';
import { SectionCardDisabledProps, SectionCardDisplayRootProps, SectionCardVariableProps } from '../SectionCard';

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

export interface SelectRootProps<T> extends Pick<MuiSelectProps, 'multiple' | 'disabled' | 'variant' | 'size' | 'fullWidth' | 'className' | 'sx'> {
    choices: SelectChoiceItem<T>[];
}

export interface SingleSelectProps<T> extends SelectRootProps<T>, SectionCardVariableProps<{ value: T; }> {
    multiple?: false;
}

export interface MultipleSelectProps<T> extends SelectRootProps<T>, SectionCardVariableProps<{ value: T[]; }> {
    multiple: true;
}

export type SelectProps<T> = SingleSelectProps<T> | MultipleSelectProps<T>;

export interface SelectInputRootProps {
    open: boolean;
    disabled: boolean;
}

export type SelectInputProps = BoxProps & Partial<SelectInputRootProps>;

export interface SelectChoiceButtonProps<T> {
    choice: SelectChoiceButton<T>;
    selected?: boolean;
    onClick: (e: MouseEvent<HTMLElement>) => void;
}

export const DesktopSelectChoiceButton = <T, >(
    {
        choice,
        selected,
        onClick: handleClick
    }: SelectChoiceButtonProps<T>
) => (
    <MenuItem
        key={choice.value as string}
        value={choice.value as string}
        onClick={handleClick}
        selected={selected}
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
);

export const MobileSelectChoiceButton = <T, >(
    {
        choice,
        selected,
        onClick: handleClick
    }: SelectChoiceButtonProps<T>
) => (
    <ListItemButton
        key={choice.value as string}
        onClick={handleClick}
        selected={selected}
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
);

export const SelectChoiceGroupSubheader = styled(ListSubheader)(({ theme }) => ({
    padding: theme.spacing(1, 1, .5),
    lineHeight: 'unset',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    backgroundImage: 'none',
    ...theme.applyStyles('dark', {
        backgroundImage: theme.vars ? theme.vars.overlays[8] : `linear-gradient(${alpha('#fff', getOverlayAlpha(8))}, ${alpha('#fff', getOverlayAlpha(8))})`
    }),
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1, 1.5, .5)
    }
}));

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

    const renderValue = useCallback((selected: T | T[]) => {
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

        if (Array.isArray(selected))
            return choices
                .filter((choice): choice is SelectChoiceButton<T> => !choice.type || choice.type === 'button')
                .filter((choice): choice is SelectChoiceButton<T> => selected.includes(choice.value))
                .map(render)
                .join(', ');

        const choice = choices
            .filter((choice): choice is SelectChoiceButton<T> => !choice.type || choice.type === 'button')
            .find((choice) => choice.value === selected);
        if (!choice)
            return undefined;

        return render(choice);
    }, [choices]);

    const handleSelectOpen = useCallback(() => setOpen(true), []);

    const handleSelectClose = useCallback(() => setOpen(false), []);

    const handleChoiceClick = useCallback((choice: SelectChoiceButton<T>, index: number) => (e: MouseEvent<HTMLElement>) => {
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
                renderValue={renderValue}
                open={open}
                onOpen={handleSelectOpen}
                onClose={handleSelectClose}
                MenuProps={{
                    open: !isSmall && open
                }}
                {...props}
            >
                {choices.map((choice, index) => {
                    switch (choice.type) {
                        case 'divider':
                            return (<Divider />);

                        case 'group':
                            return (
                                <Fragment>
                                    <SelectChoiceGroupSubheader>{choice.label}</SelectChoiceGroupSubheader>
                                    {choice.items.map((item) => {
                                        if (item.type === 'divider')
                                            return (<Divider />);

                                        return (
                                            <DesktopSelectChoiceButton
                                                key={item.value as string}
                                                choice={item}
                                                selected={multiple ? value.includes(item.value) : value === item.value}
                                                onClick={handleChoiceClick(item, index)}
                                            />
                                        );
                                    })}
                                </Fragment>
                            );

                        default:
                            return (
                                <DesktopSelectChoiceButton
                                    key={choice.value as string}
                                    choice={choice}
                                    selected={multiple ? value.includes(choice.value) : value === choice.value}
                                    onClick={handleChoiceClick(choice, index)}
                                />
                            );
                    }
                })}
            </MuiSelect>

            <MobilePickerRoot
                open={isSmall && open}
                onDismiss={() => setOpen(false)}
                expandOnContentDrag
                defaultSnap={({ minHeight, maxHeight }: SnapPointProps) => Math.min(maxHeight - 8 * 9, minHeight)}
                snapPoints={({ minHeight, maxHeight }: SnapPointProps) => Math.min(maxHeight - 8 * 9, minHeight)}
                initialFocusRef={false}
            >
                <MobilePickerContent ref={setSheetContentRef}>
                    <Virtualizer scrollRef={sheetScrollRef} overscan={2}>
                        {choices.map((choice, index) => {
                            switch (choice.type) {
                                case 'divider':
                                    return (<Divider sx={{ my: 1 }} />);

                                case 'group':
                                    return (
                                        <List>
                                            <SelectChoiceGroupSubheader>{choice.label}</SelectChoiceGroupSubheader>
                                            {choice.items.map((item) => {
                                                if (item.type === 'divider')
                                                    return (<Divider sx={{ my: 1 }} />);

                                                return (
                                                    <MobileSelectChoiceButton
                                                        key={item.value as string}
                                                        choice={item}
                                                        selected={multiple ? value.includes(item.value) : value === item.value}
                                                        onClick={handleChoiceClick(item, index)}
                                                    />
                                                );
                                            })}
                                        </List>
                                    );

                                default:
                                    return (
                                        <MobileSelectChoiceButton
                                            key={choice.value as string}
                                            choice={choice}
                                            selected={multiple ? value.includes(choice.value) : value === choice.value}
                                            onClick={handleChoiceClick(choice, index)}
                                        />
                                    );
                            }
                        })}
                    </Virtualizer>
                </MobilePickerContent>
            </MobilePickerRoot>
        </Fragment>
    );
};

export * from './outlined';
