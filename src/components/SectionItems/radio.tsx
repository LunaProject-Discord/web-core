'use client';

import { Radio } from '@mui/material';
import clsx from 'clsx';
import React, { Dispatch, SetStateAction } from 'react';
import { ButtonItemRoot, ItemIcon, ItemProps, ItemRowContainer, ItemTextBlock } from './index';

export const radioItemClasses = {
    root: 'RadioItem-root',
    control: 'RadioItem-control'
};

export interface RadioItemProps<T> extends ItemProps {
    name: string;
    value: T;
    selected: T;
    setSelected: Dispatch<SetStateAction<T>>;
}

export const RadioItem = <T, >(
    {
        icon,
        iconSx,
        primary,
        secondary,
        primaryTypographyProps,
        secondaryTypographyProps,
        name,
        value,
        selected,
        setSelected,
        disabled,
        className,
        sx
    }: RadioItemProps<T>
) => (
    <ButtonItemRoot
        onClick={() => setSelected(value)}
        disabled={disabled}
        className={clsx(radioItemClasses.root, className)}
        sx={sx}
    >
        <ItemRowContainer>
            <Radio
                name={name}
                value={value}
                checked={value === selected}
                onChange={() => setSelected(value)}
                disabled={disabled}
                disableRipple
                tabIndex={-1}
                className={radioItemClasses.control}
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
