import { styled, Theme } from '@mui/material';
import { SxProps } from '@mui/system';
import React, { ReactNode } from 'react';

export const ItemIconRoot = styled('div')(({ theme }) => ({
    minWidth: theme.spacing(3),
    display: 'flex',
    placeItems: 'center',
    placeContent: 'center',
    flexShrink: 0
}));

export interface ItemIconProps {
    icon?: ReactNode;
    iconSx?: SxProps<Theme>;
}

export const ItemIcon = ({ icon, iconSx }: ItemIconProps) => icon ? (
    <ItemIconRoot sx={iconSx}>
        {icon}
    </ItemIconRoot>
) : null;
