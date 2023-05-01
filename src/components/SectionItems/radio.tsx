'use client';

import { Radio } from '@mui/material';
import React from 'react';
import {
    ButtonItemRoot,
    ItemDisabledProps,
    ItemIcon,
    ItemIconProps,
    ItemRowContainer,
    ItemTextBlock,
    ItemTextBlockProps
} from './index';

export interface RadioItemProps<T> extends ItemTextBlockProps, ItemIconProps, ItemDisabledProps {
    name: string;
    value: T;
    selected: T;
    setSelected: (value: T) => void;
}

export const RadioItem = <T, >(
    {
        icon,
        primary,
        secondary,
        name,
        value,
        selected,
        setSelected,
        disabled
    }: RadioItemProps<T>
) => (
    <ButtonItemRoot onClick={() => setSelected(value)} disabled={disabled}>
        <ItemRowContainer>
            <Radio
                name={name}
                value={value}
                checked={value === selected}
                onChange={() => setSelected(value)}
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
