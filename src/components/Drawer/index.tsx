'use client';

import { ArrowRightOutlined } from '@mui/icons-material';
import {
    alpha,
    Box,
    ButtonBase,
    Collapse,
    Drawer as MuiDrawer,
    Link,
    ListItemButton as MuiListItemButton,
    ListItemButtonProps,
    ListItemIcon as MuiListItemIcon,
    ListItemText,
    styled,
    Theme as MuiTheme,
    Toolbar
} from '@mui/material';
import { Theme as SystemTheme } from '@mui/system';
import clsx from 'clsx';
import { default as NextLink } from 'next/link';
import { usePathname } from 'next/navigation';
import React, { MouseEventHandler, ReactNode, useState } from 'react';
import { ComposedRouteLink, LinkProps, RouteLinkProps, Url } from '../';

export const DRAWER_WIDTH = 280;

export const DrawerContainer = styled('nav')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        width: DRAWER_WIDTH,
        flexShrink: 0
    }
}));

const Drawer = styled(MuiDrawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
        width: DRAWER_WIDTH,
        left: 'auto',
        boxSizing: 'border-box',
        ...(theme.palette.mode === 'dark' && {
            backgroundImage: 'none'
        })
    }
}));

export const PermanentDrawer = styled(Drawer)(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.up('md')]: {
        display: 'block'
    }
}));

export const TemporaryDrawer = styled(Drawer)(({ theme }) => ({
    display: 'block',
    [theme.breakpoints.up('md')]: {
        display: 'none'
    },
    '&.MuiDrawer-modal': {
        zIndex: theme.zIndex.drawer + 1
    }
}));

export const DrawerToolbar = styled(Toolbar)(({ theme }) => ({
    borderBottom: `solid 1px ${theme.palette.divider}`,
    background: theme.palette.background.default,
    color: theme.palette.mode === 'dark' ? theme.palette.grey[500] : theme.palette.grey[800]
}));

export const DrawerContent = styled(Box)({
    overflow: 'auto',
    overflowX: 'hidden',
    overscrollBehavior: 'contain'
});

const ListItemButton = styled(
    ({ component: Component = 'div', ...props }: any) => <MuiListItemButton {...props} />
)<ListItemButtonProps>(({ theme }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[500] : theme.palette.grey[800]
}));

const ListItemIcon = styled(MuiListItemIcon)(({ theme }) => ({
    minWidth: 44,
    marginLeft: 4,
    color: theme.palette.mode === 'dark' ? theme.palette.grey[500] : theme.palette.grey[800]
}));

interface ListLinkProps {
    icon?: ReactNode;
    primary?: ReactNode;
    secondary?: ReactNode;
}

export const DrawerListLinkButton = ({ href, icon, primary, secondary }: ListLinkProps & { href: string; }) => {
    const pathname = usePathname();

    return (
        <ListItemButton component={Link} href={href} selected={pathname === href}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={primary} secondary={secondary} />
        </ListItemButton>
    );
};

export const DrawerListRouteLinkButton = ({ href, icon, primary, secondary }: ListLinkProps & { href: Url; }) => {
    const pathname = usePathname();

    return (
        <ListItemButton
            component={ComposedRouteLink}
            href={href}
            selected={pathname === (typeof href === 'string' ? href : href.pathname)}
        >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={primary} secondary={secondary} />
        </ListItemButton>
    );
};


const Item = styled(
    ({ component: Component = 'div', ...props }: any) => <Component {...props} />,
    { shouldForwardProp: () => true }
)(({ theme }) => ({
    ...theme.typography.body2,
    width: '100%',
    paddingTop: 8,
    paddingBottom: 8,
    display: 'flex',
    justifyContent: 'flex-start',
    fontWeight: theme.typography.fontWeightMedium,
    outline: 0,
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create(['color', 'background-color'], {
        duration: theme.transitions.duration.shortest
    }),
    '&.Mui-focusVisible': {
        backgroundColor: theme.palette.action.focus
    },
    '&:hover': {
        color: theme.palette.text.primary,
        backgroundColor: alpha(theme.palette.text.primary, theme.palette.action.hoverOpacity)
    },
    [theme.breakpoints.up('md')]: {
        paddingTop: 6,
        paddingBottom: 6
    }
}));

const ItemButtonIconBase = styled('span')(({ theme }) => ({
    marginLeft: -20,
    marginRight: 3,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    color: theme.palette.text.secondary,

    '& .MuiSvgIcon-root': {
        fontSize: 18
    }
}));

interface ItemLinkProps {
    depth: number;
    theme: MuiTheme & SystemTheme;
}

const ItemLink = styled(
    Item.withComponent(Link),
    { shouldForwardProp: (prop) => prop !== 'depth' }
)(({ depth, theme }: ItemLinkProps) => ({
    color: theme.palette.text.secondary,
    userSelect: 'none',
    '&.app-drawer-active': {
        color: theme.palette.primary.main,
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
        '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
            '@media (hover: none)': {
                backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
            }
        },
        '&.Mui-focusVisible': {
            backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
        },
        '& .MuiSvgIcon-root': {
            color: theme.palette.primary.main
        }
    },
    paddingLeft: `${8 * (4 + 1.5 * depth)}px`
}));

interface ItemButtonProps {
    depth: number;
}

const ItemButton = styled(
    Item,
    { shouldForwardProp: (prop) => prop !== 'depth' }
)<ItemButtonProps>(({ depth, theme }) => ({
    paddingLeft: `${8 * (3 + 1.5 * depth)}px`,
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightMedium,
    [`&:hover ${ItemButtonIcon}`]: {
        color: theme.palette.text.primary
    }
}));

interface ItemButtonIconProps {
    open: boolean;
}

const ItemButtonIcon = styled(
    ArrowRightOutlined,
    { shouldForwardProp: (prop) => prop !== 'open' }
)<ItemButtonIconProps>(({ open, theme }) => ({
    marginLeft: -19,
    color: theme.palette.text.secondary,
    fontSize: 18,
    transform: open ? 'rotate(90deg)' : ''
}));

interface UlProps {
    container?: boolean;
}

export const StyledUl = styled(
    'ul',
    { shouldForwardProp: (prop) => prop !== 'container' }
)(({ container }: UlProps) => ({
    margin: 0,
    padding: 0,
    listStyle: 'none',
    '& > li:last-child': {
        paddingBottom: container ? 8 : 1
    }
}));

interface LiProps {
    depth: number;
}

const StyledLi = styled(
    'li',
    { shouldForwardProp: (prop) => prop !== 'depth' }
)(({ depth }: LiProps) => ({
    padding: depth === 0 ? '0 8px' : '1px 0',
    display: 'block'
}));

interface Props {
    id?: string;
    label: ReactNode;
    icon?: ReactNode;
    href?: RouteLinkProps['href'];
    linkProps?: LinkProps;
    nextLinkProps?: RouteLinkProps;

    depth?: number;
    topLevel?: boolean;
    onClick?: MouseEventHandler;

    openImmediately?: boolean;
    setOpenState?: (open: boolean) => void;

    children?: ReactNode;
}

export const DrawerItem = (
    {
        id = '',
        label,
        icon,
        href,
        linkProps,
        nextLinkProps,

        depth = 0,
        topLevel = false,
        onClick,

        openImmediately = false,
        setOpenState = () => {
            return;
        },

        children,
        ...other
    }: Props
) => {
    const [open, setOpen] = useState(openImmediately);
    const handleClick = () => {
        const newOpen = !open;
        setOpen(newOpen);
        setOpenState(newOpen);
    };

    if (href) {
        const pathname = usePathname();
        const className = clsx((pathname === (typeof href === 'string' ? href : href.pathname)) && 'app-drawer-active');

        return (
            <StyledLi {...other} depth={depth}>
                <ItemLink
                    component={NextLink}
                    href={href}
                    passHref={true}
                    {...nextLinkProps}
                    className={className}
                    underline="none"
                    onClick={onClick}
                    depth={depth}
                    {...linkProps}
                >
                    {icon && <ItemButtonIconBase style={{ fontSize: '18px !important' }}>
                        {icon}
                    </ItemButtonIconBase>}
                    {label}
                </ItemLink>
            </StyledLi>
        );
    } else {
        return (
            <StyledLi {...other} depth={depth}>
                <ItemButton component={ButtonBase} depth={depth} disableRipple onClick={handleClick}>
                    <ItemButtonIcon open={open} />
                    {label}
                </ItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <StyledUl>
                        {children}
                    </StyledUl>
                </Collapse>
            </StyledLi>
        );
    }
};
