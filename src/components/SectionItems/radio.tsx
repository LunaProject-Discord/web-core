'use client';

import { Radio } from '@mui/material';
import React from 'react';
import { ButtonItemRoot, ItemIcon, ItemProps, ItemRowContainer, ItemTextBlock } from './index';

export interface RadioItemProps<T> extends ItemProps {
    name: string;
    value: T;
    selected: T;
    setSelected: (value: T) => void;
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
        sx
    }: RadioItemProps<T>
) => (
    <ButtonItemRoot onClick={() => setSelected(value)} disabled={disabled} sx={sx}>
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
