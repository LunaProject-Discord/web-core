'use client';

import { Box, BoxProps, Divider, List, SlotComponentProps } from '@mui/material';
import React, { Fragment } from 'react';
import { SnapPointProps } from 'react-spring-bottom-sheet/dist/types';
import { Virtualizer } from 'virtua';
import { BottomSheet } from '../../BottomSheet';
import {
    MobilePickerContent,
    MobilePickerRoot,
    PickerItem,
    PickerItemIcon,
    PickerItemText,
    useMobilePickerRef
} from '../../Picker';
import { SlotRootProps } from '../../SectionCard';
import { SelectPickerChoiceGroupSubheader, SelectPickerRootProps } from './index';

export interface MobileSelectPickerSlotProps {
    slotProps?: {
        root?: SlotComponentProps<typeof BottomSheet, SlotRootProps, {}>;
        content?: SlotComponentProps<typeof Box, BoxProps, {}>;
    };
}

export type MobileSelectPickerProps<T> = SelectPickerRootProps<T> & MobileSelectPickerSlotProps;

export const MobileSelectPicker = <T, >(
    {
        anchorEl,
        setAnchorEl,
        choices,
        selected,
        onClick,
        slotProps
    }: MobileSelectPickerProps<T>
) => {
    const { sheetScrollRef, setSheetContentRef } = useMobilePickerRef();

    return (
        <MobilePickerRoot
            open={anchorEl !== undefined}
            onDismiss={() => setAnchorEl(undefined)}
            expandOnContentDrag
            defaultSnap={({ minHeight, maxHeight }: SnapPointProps) => Math.min(maxHeight - 8 * 9, minHeight)}
            snapPoints={({ minHeight, maxHeight }: SnapPointProps) => Math.min(maxHeight - 8 * 9, minHeight)}
            initialFocusRef={false}
            {...slotProps?.root}
        >
            <MobilePickerContent ref={setSheetContentRef} {...slotProps?.content}>
                <Virtualizer scrollRef={sheetScrollRef} overscan={2}>
                    {choices.map((choice, i) => {
                        switch (choice.type) {
                            case 'divider':
                                return (<Divider key={i} sx={{ my: 1 }} />);

                            case 'group':
                                return (
                                    <List key={i}>
                                        <SelectPickerChoiceGroupSubheader>{choice.label}</SelectPickerChoiceGroupSubheader>
                                        {choice.items.map((item, v) => {
                                            if (item.type === 'divider')
                                                return (<Divider key={v} sx={{ my: 1 }} />);

                                            return (
                                                <PickerItem
                                                    key={item.value as string}
                                                    onClick={onClick(item)}
                                                    selected={selected.includes(item.value)}
                                                    disabled={item.disabled}
                                                >
                                                    {'children' in item ? item.children : <Fragment>
                                                        {item.icon && <PickerItemIcon>{item.icon}</PickerItemIcon>}
                                                        {(item.primary || item.secondary) && <PickerItemText
                                                            primary={item.primary}
                                                            secondary={item.secondary}
                                                        />}
                                                    </Fragment>}
                                                </PickerItem>
                                            );
                                        })}
                                    </List>
                                );

                            default:
                                return (
                                    <PickerItem
                                        key={choice.value as string}
                                        onClick={onClick(choice)}
                                        selected={selected.includes(choice.value)}
                                        disabled={choice.disabled}
                                    >
                                        {'children' in choice ? choice.children : <Fragment>
                                            {choice.icon && <PickerItemIcon>{choice.icon}</PickerItemIcon>}
                                            {(choice.primary || choice.secondary) && <PickerItemText
                                                primary={choice.primary}
                                                secondary={choice.secondary}
                                            />}
                                        </Fragment>}
                                    </PickerItem>
                                );
                        }
                    })}
                </Virtualizer>
            </MobilePickerContent>
        </MobilePickerRoot>
    );
};
