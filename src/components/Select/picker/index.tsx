'use client';

import { alpha, getOverlayAlpha, ListSubheader, styled, useMediaQuery } from '@mui/material';
import React, { MouseEvent } from 'react';
import { PickerBaseProps } from '../../Picker';
import { SelectChoiceButton, SelectProps } from '../index';
import { DesktopSelectPicker, DesktopSelectPickerSlotProps } from './desktop';
import { MobileSelectPicker, MobileSelectPickerSlotProps } from './mobile';

export const SelectPickerChoiceGroupSubheader = styled(ListSubheader)(({ theme }) => ({
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

export type SelectPickerRootProps<T> = Pick<SelectProps<T>, 'choices'> & PickerBaseProps & {
    selected: T[];
    onClick: (choice: SelectChoiceButton<T>) => (event: MouseEvent<HTMLElement>) => void;
};

export interface SelectPickerSlotProps {
    slotProps?: {
        desktop?: DesktopSelectPickerSlotProps['slotProps'];
        mobile?: MobileSelectPickerSlotProps['slotProps'];
    };
}

export type SelectPickerProps<T> = SelectPickerRootProps<T> & SelectPickerSlotProps;

export const SelectPicker = <T, >({ slotProps, ...props }: SelectPickerProps<T>) => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.up('sm'));
    if (isSmall) {
        return (
            <DesktopSelectPicker<T>
                slotProps={slotProps?.desktop}
                {...props}
            />
        );
    } else {
        return (
            <MobileSelectPicker<T>
                slotProps={slotProps?.mobile}
                {...props}
            />
        );
    }
};

export * from './desktop';
export * from './mobile';
