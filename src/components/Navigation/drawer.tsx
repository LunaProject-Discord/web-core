'use client';

import {
    alpha,
    Drawer,
    drawerClasses,
    List,
    ListItemButton,
    listItemButtonClasses,
    ListItemIcon,
    ListItemText,
    listItemTextClasses,
    ListProps,
    ListSubheader,
    styled,
    svgIconClasses,
    Theme
} from '@mui/material';
import { SystemStyleObject } from '@mui/system/styleFunctionSx/styleFunctionSx';
import NextLink from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { Dispatch, MouseEvent, ReactNode, SetStateAction, useContext } from 'react';
import { ConfigContext } from '../../utils';
import { NavigationItemProps } from './index';
import { defaultPredicate } from './utils';

export const NAVIGATION_DRAWER_WIDTH = 280;

export const NavigationRoot = styled('nav')(({ theme }) => ({
    width: NAVIGATION_DRAWER_WIDTH,
    height: 'fit-content',
    position: 'sticky',
    // ヘッダーの高さ + ページレイアウトのパディング上
    top: `calc(${theme.spacing(7)} + ${theme.spacing(2)})`,
    display: 'none',
    flexShrink: 0,
    [theme.breakpoints.up('sm')]: {
        // ヘッダーの高さ + ページレイアウトのパディング上
        top: `calc(${theme.spacing(8)} + ${theme.spacing(2)})`
    },
    [theme.breakpoints.up('md')]: {
        display: 'block'
    }
}));

export interface NavigationDrawerProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export const NavigationDrawer = styled(Drawer)(({ theme }) => ({
    [`&.${drawerClasses.modal}`]: {
        zIndex: theme.zIndex.drawer + 1
    },
    [`& .${drawerClasses.paper}`]: {
        width: NAVIGATION_DRAWER_WIDTH,
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(1),
        overflow: 'auto',
        overflowX: 'hidden',
        overscrollBehavior: 'contain',
        border: 'none',
        backgroundImage: 'none',
        [theme.breakpoints.up('md')]: {
            // 表示範囲の高さ - (ヘッダーの高さ + (ページレイアウトのパディング上 + ページレイアウトのパディング下))
            maxHeight: `calc(100dvh - calc(${theme.spacing(8)} + calc(${theme.spacing(2)} + ${theme.spacing(2)})))`,
            position: 'static'
        }
    }
}));

export const NavigationDrawerContent = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    overflow: 'auto',
    overflowX: 'hidden',
    overscrollBehavior: 'contain'
}));

export const NavigationDrawerGroupRoot = styled(List)(({ theme }) => ({
    padding: theme.spacing(0, 1),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(.5),
    '&:last-child': {
        paddingBottom: theme.spacing(1)
    },
    [theme.breakpoints.up('md')]: {
        padding: 0
    }
}));

export const NavigationDrawerGroupLabel = styled(ListSubheader)(({ theme }) => ({
    padding: 0,
    lineHeight: 'unset',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    color: theme.palette.text.primary
}));

export interface NavigationDrawerGroupProps extends Omit<ListProps, 'subheader'> {
    label?: ReactNode;
    children: ReactNode;
}

export const NavigationDrawerGroup = ({ label, children, ...props }: NavigationDrawerGroupProps) => (
    <NavigationDrawerGroupRoot
        subheader={label ? (<NavigationDrawerGroupLabel>{label}</NavigationDrawerGroupLabel>) : undefined}
        {...props}
    >
        {children}
    </NavigationDrawerGroupRoot>
);

export const navigationDrawerItemRootStyled = (theme: Theme): SystemStyleObject<Theme> => ({
    minHeight: theme.spacing(5),
    px: 1.5,
    py: .5,
    gap: 1,
    color: theme.palette.text.secondary,
    borderRadius: 1,
    [`&.${listItemButtonClasses.selected}`]: {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.action.selected,
        [`&.${listItemButtonClasses.focusVisible}`]: {
            backgroundColor: alpha(theme.palette.action.selected, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
        }
    },
    [`&.${listItemButtonClasses.selected}:hover`]: {
        backgroundColor: alpha(theme.palette.action.selected, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
        '@media (hover: none)': {
            backgroundColor: alpha(theme.palette.action.selected, theme.palette.action.selectedOpacity)
        }
    }
});

export const NavigationDrawerItemIcon = styled(ListItemIcon)(({ theme }) => ({
    minWidth: 20,
    color: 'inherit',
    [`& .${svgIconClasses.root}`]: {
        fontSize: theme.typography.h6.fontSize
    }
}));

export const NavigationDrawerItemText = styled(ListItemText)(({ theme }) => ({
    color: 'inherit',
    [`& .${listItemTextClasses.primary}`]: {
        fontSize: theme.typography.body2.fontSize,
        fontWeight: theme.typography.fontWeightMedium
    }
}));

export interface NavigationDrawerItemProps extends NavigationDrawerProps, NavigationItemProps {
    primary?: ReactNode;
    secondary?: ReactNode;
}

export const NavigationDrawerItem = (
    {
        href,
        predicate,
        icon,
        primary,
        secondary,
        setOpen
    }: NavigationDrawerItemProps
) => {
    const router = useRouter();

    const pathname = usePathname();
    const loweredPathname = pathname?.toLowerCase();
    const loweredHref = href.toLowerCase();
    const isMatch = (predicate ?? defaultPredicate)(loweredPathname, loweredHref);

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        router.push(href);
        setOpen(false);
    };

    return (
        <ListItemButton
            component={NextLink}
            href={href}
            selected={isMatch}
            onClick={handleClick}
            sx={(theme) => navigationDrawerItemRootStyled(theme)}
        >
            <NavigationDrawerItemIcon>{icon}</NavigationDrawerItemIcon>
            <NavigationDrawerItemText primary={primary} secondary={secondary} />
        </ListItemButton>
    );
};

export interface NavigationDrawerItemWithEnabledStatusProps extends NavigationDrawerItemProps {
    enabled: boolean;
}

export const NavigationDrawerItemWithEnabledStatus = (
    {
        href,
        predicate,
        icon,
        primary,
        secondary,
        enabled,
        setOpen
    }: NavigationDrawerItemWithEnabledStatusProps
) => {
    const router = useRouter();

    const pathname = usePathname();
    const loweredPathname = pathname?.toLowerCase();
    const loweredHref = href.toLowerCase();
    const isMatch = (predicate ?? defaultPredicate)(loweredPathname, loweredHref);

    const { icons: { ToggleOff, ToggleOn } } = useContext(ConfigContext);

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        router.push(href);
        setOpen(false);
    };

    return (
        <ListItemButton
            component={NextLink}
            href={href}
            selected={isMatch}
            onClick={handleClick}
            sx={(theme) => navigationDrawerItemRootStyled(theme)}
        >
            <NavigationDrawerItemIcon>{icon}</NavigationDrawerItemIcon>
            <NavigationDrawerItemText primary={primary} secondary={secondary} />
            {enabled ? <ToggleOn color="inherit" /> : <ToggleOff color="disabled" />}
        </ListItemButton>
    );
};
