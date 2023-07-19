'use client';

import { Checkbox, Switch, switchClasses } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { ButtonItemRoot, ItemFormContainer, ItemIcon, ItemProps, ItemRowContainer, ItemTextBlock } from './index';

export const switchItemClasses = {
    root: 'SwitchItem-root',
    control: 'SwitchItem-control'
};

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
        className,
        sx
    }: SwitchItemProps
) => (
    <ButtonItemRoot
        onClick={() => setChecked(!checked)}
        disabled={disabled}
        className={clsx(switchItemClasses.root, className)}
        sx={sx}
    >
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
                    className={switchItemClasses.control}
                    sx={{ [`& .${switchClasses.switchBase}`]: { backgroundColor: 'transparent !important' } }}
                />
            </ItemFormContainer>
        </ItemRowContainer>
    </ButtonItemRoot>
);

export const checkItemClasses = {
    root: 'CheckItem-root',
    control: 'CheckItem-control'
};

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
        className,
        sx
    }: SwitchItemProps
) => (
    <ButtonItemRoot
        onClick={() => setChecked(!checked)}
        disabled={disabled}
        className={clsx(checkItemClasses.root, className)}
        sx={sx}
    >
        <ItemRowContainer>
            <Checkbox
                checked={checked}
                onChange={() => setChecked(!checked)}
                defaultChecked={defaultChecked}
                disabled={disabled}
                disableRipple
                tabIndex={-1}
                className={checkItemClasses.control}
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
