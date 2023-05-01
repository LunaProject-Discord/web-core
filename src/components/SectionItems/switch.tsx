'use client';

import { Checkbox, Switch, switchClasses } from '@mui/material';
import React from 'react';
import {
    ButtonItemRoot,
    ItemDisabledProps,
    ItemFormContainer,
    ItemIcon,
    ItemIconProps,
    ItemRowContainer,
    ItemTextBlock,
    ItemTextBlockProps
} from './index';

export interface SwitchItemProps extends ItemTextBlockProps, ItemIconProps, ItemDisabledProps {
    checked: boolean;
    setChecked: (checked: boolean) => void;
    defaultChecked?: boolean;
}

export const SwitchItem = (
    {
        icon,
        primary,
        secondary,
        checked,
        setChecked,
        defaultChecked,
        disabled
    }: SwitchItemProps
) => (
    <ButtonItemRoot onClick={() => setChecked(!checked)} disabled={disabled}>
        <ItemRowContainer>
            <ItemIcon icon={icon} />
            <ItemTextBlock primary={primary} secondary={secondary} disabled={disabled} />
            <ItemFormContainer sx={{ mr: -.75 }}>
                <Switch
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                    defaultChecked={defaultChecked}
                    disabled={disabled}
                    disableRipple
                    tabIndex={-1}
                    sx={{ [`& .${switchClasses.switchBase}`]: { backgroundColor: 'transparent !important' } }}
                />
            </ItemFormContainer>
        </ItemRowContainer>
    </ButtonItemRoot>
);

export const CheckItem = (
    {
        icon,
        primary,
        secondary,
        checked,
        setChecked,
        defaultChecked,
        disabled
    }: SwitchItemProps
) => (
    <ButtonItemRoot onClick={() => setChecked(!checked)} disabled={disabled}>
        <ItemRowContainer>
            <Checkbox
                checked={checked}
                onChange={() => setChecked(!checked)}
                defaultChecked={defaultChecked}
                disabled={disabled}
                disableRipple
                tabIndex={-1}
                sx={{
                    p: 0,
                    display: 'flex',
                    placeItems: 'center',
                    placeContent: 'center',
                    flexShrink: 0,
                    '&:hover': {
                        backgroundColor: 'transparent'
                    }
                }}
            />
            <ItemIcon icon={icon} />
            <ItemTextBlock primary={primary} secondary={secondary} disabled={disabled} />
        </ItemRowContainer>
    </ButtonItemRoot>
);
