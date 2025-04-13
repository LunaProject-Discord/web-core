'use client';

import {
    ListItemButton,
    ListItemButtonProps,
    ListItemIcon,
    ListItemIconProps,
    ListItemText,
    listItemTextClasses,
    ListItemTextProps,
    SlotComponentProps,
    styled,
    useMediaQuery
} from '@mui/material';
import clsx from 'clsx';
import deepmerge from 'lodash/merge';
import React, { Dispatch, MouseEvent, ReactElement, SetStateAction } from 'react';
import { generateComponentClasses, SomeRequired } from '../../utils';
import { SlotRootProps } from '../SectionCard';
import { DesktopPicker, DesktopPickerSlotProps } from './desktop';
import { MobilePicker, MobilePickerSlotProps } from './mobile';
import { PickerSearchBox } from './search_box';
import { getPickerChoices, usePickerSearch } from './utils';

export interface PickerBaseProps {
    anchorEl: HTMLElement | undefined;
    setAnchorEl: Dispatch<SetStateAction<HTMLElement | undefined>>;
}

export type PickerGetChoiceId<T> = (choice: T, index: number) => string;
export type PickerChoiceClickHandler<T> = (event: MouseEvent<HTMLDivElement>, choice: T, index: number) => void;
export type PickerChoiceFilter<T> = (choice: T, search: string) => boolean;

export interface PickerRootProps<T> extends PickerBaseProps {
    renderChoice: (props: PickerItemProps<T>) => ReactElement<PickerItemProps<T>>;
    getChoiceId: PickerGetChoiceId<T>;
    choices: T[];
    selected?: string[];
    onClick?: PickerChoiceClickHandler<T>;
    filter?: PickerChoiceFilter<T>;
    search?: string;
    setSearch?: Dispatch<SetStateAction<string>>;
    disableSearch?: boolean;
}

export interface PickerSlotProps {
    slotProps?: {
        desktop?: DesktopPickerSlotProps['slotProps'];
        mobile?: MobilePickerSlotProps['slotProps'];
        searchBox?: SlotComponentProps<typeof PickerSearchBox, SlotRootProps, {}>;
    };
}

export type PickerProps<T> = PickerRootProps<T> & PickerSlotProps;

export type PickerInternalProps<T> = SomeRequired<Omit<PickerRootProps<T>, 'filter'>, 'search' | 'setSearch'>;

export interface PickerItemProps<T> {
    index: number;
    choice: T;
    selected?: boolean;
    onClick?: PickerChoiceClickHandler<T>;
}

export const pickerItemClasses = generateComponentClasses(
    'PickerItem',
    [
        'root',
        'icon',
        'text'
    ]
);

export const PickerItem = styled(
    ({ className, ...props }: ListItemButtonProps) => (
        <ListItemButton
            className={clsx(pickerItemClasses.root, className)}
            {...props}
        />
    )
)(({ theme }) => ({
    minHeight: theme.spacing(6),
    padding: theme.spacing(1, 2),
    gap: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        minHeight: theme.spacing(5),
        padding: theme.spacing(.5, 1.5),
        gap: theme.spacing(1.5)
    }
}));

export const PickerItemIcon = styled(
    ({ className, ...props }: ListItemIconProps) => (
        <ListItemIcon
            className={clsx(pickerItemClasses.icon, className)}
            {...props}
        />
    )
)(({ theme }) => ({
    minWidth: theme.spacing(3),
    placeItems: 'center',
    placeContent: 'center'
}));

export const PickerItemText = styled(
    ({ className, ...props }: ListItemTextProps) => (
        <ListItemText
            className={clsx(pickerItemClasses.text, className)}
            {...props}
        />
    )
)({
    [`& .${listItemTextClasses.primary}`]: {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    }
});

export const Picker = <T, >(
    {
        choices: _choices,
        filter,
        search: _search,
        setSearch: _setSearch,
        slotProps,
        ...props
    }: PickerProps<T>
) => {
    const { debouncedSearch, search, setSearch } = usePickerSearch(_search, _setSearch);
    const choices = getPickerChoices(_choices, debouncedSearch, filter);

    const isSmall = useMediaQuery((theme) => theme.breakpoints.up('sm'));
    const pickerProps = { choices, search, setSearch, ...props };

    if (isSmall) {
        return (
            <DesktopPicker<T>
                slotProps={{
                    root: slotProps?.desktop?.root,
                    content: slotProps?.desktop?.content,
                    searchBox: deepmerge(
                        slotProps?.searchBox ?? {},
                        slotProps?.desktop?.searchBox ?? {}
                    )
                }}
                {...pickerProps}
            />
        );
    } else {
        return (
            <MobilePicker<T>
                slotProps={{
                    root: slotProps?.mobile?.root,
                    content: slotProps?.mobile?.content,
                    searchBox: deepmerge(
                        slotProps?.searchBox ?? {},
                        slotProps?.mobile?.searchBox ?? {}
                    )
                }}
                {...pickerProps}
            />
        );
    }
};

export * from './desktop';
export * from './mobile';
export * from './search_box';
export * from './utils';
