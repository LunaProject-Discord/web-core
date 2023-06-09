import { ArrowRightOutlined } from '@mui/icons-material';
import {
    alpha,
    ButtonBase,
    buttonBaseClasses,
    Collapse,
    CSSObject,
    styled,
    svgIconClasses,
    Theme
} from '@mui/material';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import React, { AnchorHTMLAttributes, Dispatch, MouseEventHandler, ReactNode, SetStateAction, useState } from 'react';

export const DrawerItemRoot = styled('div')(({ theme }) => ({
    ...theme.typography.body2,
    width: '100%',
    padding: theme.spacing(1, 0),
    display: 'flex',
    justifyContent: 'flex-start',
    fontWeight: theme.typography.fontWeightMedium,
    transition: theme.transitions.create(['color', 'background-color'], {
        duration: theme.transitions.duration.shortest
    }),
    borderRadius: theme.shape.borderRadius,
    outline: 'none',
    '&:hover': {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.action.hover,
        [`& ${DrawerButtonItemIcon}`]: {
            color: theme.palette.text.primary
        }
    },
    [`&:active, &:focus-visible, &.${buttonBaseClasses.focusVisible}`]: {
        backgroundColor: theme.palette.action.focus
    },
    [theme.breakpoints.up('md')]: {
        paddingTop: theme.spacing(.75),
        paddingBottom: theme.spacing(.75)
    }
}));

export const drawerLinkBaseItemStyles = (theme: Theme, active: boolean, depth: number): CSSObject => ({
    paddingLeft: `${8 * (4 + 1.5 * depth)}px`,
    textDecoration: 'none',
    color: theme.palette.text.secondary,
    userSelect: 'none',
    ...(active && {
        color: theme.palette.primary.main,
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
        '&:hover': {
            color: theme.palette.primary.main,
            backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
            '@media (hover: none)': {
                backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
            }
        },
        [`&:active, &:focus-visible, &.${buttonBaseClasses.focusVisible}`]: {
            backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
        },
        [`& .${svgIconClasses.root}`]: {
            color: theme.palette.primary.main
        }
    })
});

export interface DrawerLinkBaseItemProps {
    active?: boolean;
    depth: number;
}

export const DrawerLinkBaseItem = styled(
    DrawerItemRoot.withComponent('a'),
    { shouldForwardProp: (prop) => prop !== 'sx' && prop !== 'active' && prop !== 'depth' }
)<DrawerLinkBaseItemProps>(({ theme, active = false, depth }) => drawerLinkBaseItemStyles(theme, active, depth));

export const DrawerRouteLinkBaseItem = DrawerLinkBaseItem.withComponent(NextLink);

export interface DrawerButtonItemProps {
    depth: number;
}

export const DrawerButtonItem = styled(
    DrawerItemRoot.withComponent(ButtonBase),
    { shouldForwardProp: (prop) => prop !== 'sx' && prop !== 'depth' }
)<DrawerButtonItemProps>(({ depth, theme }) => ({
    paddingLeft: `${8 * (3 + 1.5 * depth)}px`,
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.text.primary,
    [`&:hover ${DrawerButtonItemIcon}`]: {
        color: theme.palette.text.primary
    }
}));

export const DrawerButtonItemIconContainer = styled('span')(({ theme }) => ({
    marginLeft: -20,
    marginRight: 3,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    color: theme.palette.text.secondary,
    [`& .${svgIconClasses.root}`]: {
        fontSize: 18
    }
}));

export interface DrawerButtonItemIconProps {
    open: boolean;
}

export const DrawerButtonItemIcon = styled(
    ArrowRightOutlined,
    { shouldForwardProp: (prop) => prop !== 'sx' && prop !== 'open' }
)<DrawerButtonItemIconProps>(({ open, theme }) => ({
    marginLeft: -19,
    fontSize: 18,
    color: theme.palette.text.secondary,
    transform: open ? 'rotate(90deg)' : ''
}));

export interface StyledUlProps {
    container?: boolean;
}

export const StyledUl = styled(
    'ul',
    { shouldForwardProp: (prop) => prop !== 'sx' && prop !== 'container' }
)<StyledUlProps>(({ theme, container }) => ({
    margin: 0,
    padding: 0,
    listStyle: 'none',
    '& > li:last-child': {
        paddingBottom: theme.spacing(container ? 1 : .125)
    }
}));

export interface StyledLiProps {
    depth: number;
}

export const StyledLi = styled(
    'li',
    { shouldForwardProp: (prop) => prop !== 'sx' && prop !== 'depth' }
)<StyledLiProps>(({ theme, depth }) => ({
    padding: depth === 0 ? theme.spacing(0, 1) : theme.spacing(.125, 0),
    display: 'block'
}));

export interface DrawerItemProps {
    label: ReactNode;
    depth?: number;
}

export interface DrawerGroupProps extends DrawerItemProps {
    children: ReactNode;
    open?: boolean;
    setOpen?: Dispatch<SetStateAction<boolean>>;
    defaultOpen?: boolean;
}

export const DrawerGroup = ({ label, depth = 0, setOpen, defaultOpen = true, children }: DrawerGroupProps) => {
    const [internalOpen, setInternalOpen] = useState(defaultOpen);

    // const state = open ?? internalOpen;
    const setState = setOpen ?? setInternalOpen;

    const handleClick = () => setState((prevOpen) => !prevOpen);

    return (
        <StyledLi depth={depth}>
            <DrawerButtonItem depth={depth} disableRipple onClick={handleClick}>
                <DrawerButtonItemIcon open={internalOpen} />
                {label}
            </DrawerButtonItem>
            <Collapse in={internalOpen} timeout="auto" unmountOnExit>
                <StyledUl>
                    {children}
                </StyledUl>
            </Collapse>
        </StyledLi>
    );
};

export interface DrawerLinkItemProps extends DrawerItemProps, AnchorHTMLAttributes<HTMLAnchorElement> {
    icon?: ReactNode;
    exact?: boolean;
    onClick?: MouseEventHandler;
}

export const DrawerLinkItem = ({ label, icon, depth = 0, href, exact, onClick, ...props }: DrawerLinkItemProps) => {
    const pathname = usePathname();
    const loweredPathname = pathname?.toLowerCase();
    const loweredHref = href?.toLowerCase();
    const isMatch = exact || href === '/' ? loweredPathname === loweredHref : (loweredPathname && loweredHref ? loweredPathname.startsWith(loweredHref) : false);

    return (
        <StyledLi depth={depth}>
            <DrawerLinkBaseItem
                href={href}
                depth={depth}
                active={isMatch}
                onClick={onClick}
                {...props}
            >
                {icon && <DrawerButtonItemIconContainer>{icon}</DrawerButtonItemIconContainer>}
                {label}
            </DrawerLinkBaseItem>
        </StyledLi>
    );
};

export type DrawerRouteLinkItemProps = DrawerLinkItemProps & Omit<NextLinkProps, 'as'>;

export const DrawerRouteLinkItem = (
    {
        label,
        icon,
        depth = 0,
        href,
        exact,
        onClick,
        ...props
    }: DrawerRouteLinkItemProps
) => {
    const pathname = usePathname();
    const loweredPathname = pathname?.toLowerCase();
    const loweredHref = href?.toLowerCase();
    const isMatch = exact || href === '/' ? loweredPathname === loweredHref : (loweredPathname && loweredHref ? loweredPathname.startsWith(loweredHref) : false);

    return (
        <StyledLi depth={depth}>
            <DrawerRouteLinkBaseItem
                href={href}
                depth={depth}
                active={isMatch}
                onClick={onClick}
                {...props}
            >
                {icon && <DrawerButtonItemIconContainer>{icon}</DrawerButtonItemIconContainer>}
                {label}
            </DrawerRouteLinkBaseItem>
        </StyledLi>
    );
};
