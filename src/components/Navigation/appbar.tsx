'use client';

import {
    alpha,
    AppBar as MuiAppBar,
    AppBarProps,
    Button,
    buttonClasses,
    styled,
    Toolbar as MuiToolbar
} from '@mui/material';
import { unstable_getScrollbarSize } from '@mui/utils';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ReactNode } from 'react';
import { ROOT_SCROLLBAR_SIZE } from '../Layout';
import { NavigationItemProps } from './index';
import { defaultPredicate } from './utils';

export const NavigationAppBarId = 'navigation-appbar';

export const NavigationAppBar = styled(
    (props: AppBarProps) => (
        <MuiAppBar
            id={NavigationAppBarId}
            position="fixed"
            color="default"
            elevation={0}
            {...props}
        />
    )
)<AppBarProps>(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    color: theme.palette.mode === 'dark' ? theme.palette.grey[500] : theme.palette.grey[800],
    backgroundColor: theme.palette.background.default,
    zIndex: theme.zIndex.drawer + 1,
    '@media screen and (-webkit-min-device-pixel-ratio: 0)': {
        marginRight: unstable_getScrollbarSize(document) < 1 ? ROOT_SCROLLBAR_SIZE : 0
    }
}));

export const NavigationToolbar = styled(MuiToolbar)(({ theme }) => ({
    width: '100%',
    maxWidth: theme.breakpoints.values.xl,
    margin: '0 auto',
    padding: `${theme.spacing(0, 1)} !important`,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
        padding: `${theme.spacing(0, 2)} !important`
    }
}));

export interface NavigationToolbarItemProps extends Omit<NavigationItemProps, 'icon'> {
    children: ReactNode;
}

export const NavigationToolbarItem = (
    {
        href,
        predicate,
        children
    }: NavigationToolbarItemProps
) => {
    const pathname = usePathname();
    const loweredPathname = pathname?.toLowerCase();
    const loweredHref = href.toLowerCase();
    const isMatch = (predicate ?? defaultPredicate)(loweredPathname, loweredHref);

    const color = isMatch ? 'monotone' : 'inherit';

    return (
        <Button
            component={NextLink}
            href={href}
            color={color}
            sx={(theme) => (isMatch ? {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.action.selected,
                [`&.${buttonClasses.focusVisible}`]: {
                    backgroundColor: alpha(theme.palette.action.selected, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
                },
                '&:hover': {
                    backgroundColor: alpha(theme.palette.action.selected, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
                    '@media (hover: none)': {
                        backgroundColor: alpha(theme.palette.action.selected, theme.palette.action.selectedOpacity)
                    }
                }
            } : {
                color: theme.palette.text.secondary
            })}
        >
            {children}
        </Button>
    );
};
