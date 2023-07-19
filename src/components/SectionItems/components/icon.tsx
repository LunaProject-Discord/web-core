import { Box, BoxProps, styled, Theme } from '@mui/material';
import { SxProps } from '@mui/system';
import clsx from 'clsx';
import React, { ReactNode } from 'react';

export const sectionItemIconClasses = {
    root: 'SectionItemIcon-root'
};

export const ItemIconRoot = styled(
    ({ className, ...props }: BoxProps) => (
        <Box
            className={clsx(sectionItemIconClasses.root, className)}
            {...props}
        />
    )
)<BoxProps>(({ theme }) => ({
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
