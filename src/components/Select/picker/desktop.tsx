'use client';

import { Divider, List, Menu, MenuItem, SlotComponentProps } from '@mui/material';
import React, { Fragment } from 'react';
import { PickerItemIcon, PickerItemText } from '../../Picker';
import { SlotRootProps } from '../../SectionCard';
import { SelectPickerChoiceGroupSubheader, SelectPickerRootProps } from './index';

export interface DesktopSelectPickerSlotProps {
    slotProps?: {
        root?: SlotComponentProps<typeof Menu, SlotRootProps, {}>;
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
) => {
    console.log('DesktopSelectPicker#slotProps', slotProps);

    return (
        <Menu
            open={anchorEl !== undefined}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(undefined)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            {...slotProps?.root}
        >
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
                                        <MenuItem
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
                                        </MenuItem>
                                    );
                                })}
                            </List>
                        );

                    default:
                        return (
                            <MenuItem
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
                            </MenuItem>
                        );
                }
            })}
        </Menu>
    );
};
