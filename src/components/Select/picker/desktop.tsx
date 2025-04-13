'use client';

import { Box, Divider, List, Popover, SlotComponentProps } from '@mui/material';
import React, { Fragment } from 'react';
import { VList } from 'virtua';
import { DesktopPickerContent, DesktopPickerRoot, PickerItem, PickerItemIcon, PickerItemText } from '../../Picker';
import { SlotRootProps } from '../../SectionCard';
import { SelectPickerChoiceGroupSubheader, SelectPickerRootProps } from './index';

export interface DesktopSelectPickerSlotProps {
    slotProps?: {
        root?: SlotComponentProps<typeof Popover, SlotRootProps, {}>;
        content?: SlotComponentProps<typeof Box, SlotRootProps, {}>;
    };
}

export type DesktopSelectPickerProps<T> = SelectPickerRootProps<T> & DesktopSelectPickerSlotProps;

export const DesktopSelectPicker = <T, >(
    {
        anchorEl,
        setAnchorEl,
        choices,
        selected,
        onClick,
        slotProps
    }: DesktopSelectPickerProps<T>
) => (
    <DesktopPickerRoot
        open={anchorEl !== undefined}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(undefined)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        {...slotProps?.root}
    >
        <DesktopPickerContent {...slotProps?.content}>
            <VList style={{ padding: '8px 0' }}>
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
            </VList>
        </DesktopPickerContent>
    </DesktopPickerRoot>
);
