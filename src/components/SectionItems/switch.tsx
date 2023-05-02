'use client';

import { Checkbox, Switch, switchClasses } from '@mui/material';
import React from 'react';
import { ButtonItemRoot, ItemFormContainer, ItemIcon, ItemProps, ItemRowContainer, ItemTextBlock } from './index';

export interface SwitchItemProps extends ItemProps {
    checked: boolean;
    setChecked: (checked: boolean) => void;
    defaultChecked?: boolean;
}

export const SwitchItem = (
    {
        icon,
        iconSx,
        primary,
        secondary,
        primaryTypographyProps,
        secondaryTypographyProps,
        checked,
        setChecked,
        defaultChecked,
        disabled,
        sx
    }: SwitchItemProps
) => (
    <ButtonItemRoot onClick={() => setChecked(!checked)} disabled={disabled} sx={sx}>
        <ItemRowContainer>
            <ItemIcon icon={icon} iconSx={iconSx} />
            <ItemTextBlock
                primary={primary}
                secondary={secondary}
                primaryTypographyProps={primaryTypographyProps}
                secondaryTypographyProps={secondaryTypographyProps}
                disabled={disabled}
            />
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
        iconSx,
        primary,
        secondary,
        primaryTypographyProps,
        secondaryTypographyProps,
        checked,
        setChecked,
        defaultChecked,
        disabled,
        sx
    }: SwitchItemProps
) => (
    <ButtonItemRoot onClick={() => setChecked(!checked)} disabled={disabled} sx={sx}>
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
            <ItemIcon icon={icon} iconSx={iconSx} />
            <ItemTextBlock
                primary={primary}
                secondary={secondary}
                primaryTypographyProps={primaryTypographyProps}
                secondaryTypographyProps={secondaryTypographyProps}
                disabled={disabled}
            />
        </ItemRowContainer>
    </ButtonItemRoot>
);
