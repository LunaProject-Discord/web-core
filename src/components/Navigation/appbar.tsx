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
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ReactNode } from 'react';
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
    color: (theme.vars || theme).palette.grey[800],
    backgroundColor: (theme.vars || theme).palette.background.default,
    zIndex: theme.zIndex.drawer + 1,
    ...theme.applyStyles('dark', {
        color: (theme.vars || theme).palette.grey[500]
    })
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
        prefetch,
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
            prefetch={prefetch}
            color={color}
            sx={(theme) => (isMatch ? {
                color: (theme.vars || theme).palette.text.primary,
                backgroundColor: (theme.vars || theme).palette.action.selected,
                [`&.${buttonClasses.focusVisible}`]: {
                    backgroundColor: theme.vars
                        ? `rgb(${theme.vars.palette.action.selectedChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.focusOpacity}))`
                        : alpha(theme.palette.action.selected, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
                },
                '&:hover': {
                    backgroundColor: theme.vars
                        ? `rgb(${theme.vars.palette.action.selectedChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.hoverOpacity}))`
                        : alpha(theme.palette.action.selected, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
                    '@media (hover: none)': {
                        backgroundColor: theme.vars
                            ? `rgb(${theme.vars.palette.action.selectedChannel} / ${theme.vars.palette.action.selectedOpacity})`
                            : alpha(theme.palette.action.selected, theme.palette.action.selectedOpacity)
                    }
                }
            } : {
                color: (theme.vars || theme).palette.text.secondary
            })}
        >
            {children}
        </Button>
    );
};
