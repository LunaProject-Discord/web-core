'use client';

import { Link as MuiLink, LinkBaseProps } from '@mui/material';
import { default as NextLink } from 'next/link';
import React, { forwardRef, HTMLAttributeAnchorTarget, HTMLAttributeReferrerPolicy } from 'react';
import { UrlObject } from 'url';
import { BaseProps } from '../';

export interface LinkProps extends BaseProps {
    download?: any;
    href?: string | undefined;
    hrefLang?: string | undefined;
    media?: string | undefined;
    ping?: string | undefined;
    rel?: string | undefined;
    target?: HTMLAttributeAnchorTarget | undefined;
    type?: string | undefined;
    referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
}

export const Link = ({ children, ...props }: LinkBaseProps) => (
    <MuiLink component={ComposedLink} underline="hover" {...props}>{children}</MuiLink>
);


export type Url = string | UrlObject;

export interface RouteLinkProps extends BaseProps {
    href: Url;
    as?: Url;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
    passHref?: boolean;
    prefetch?: boolean;
    locale?: string | false;
}

export const RouteLink = ({ children, ...props }: LinkBaseProps) => (
    <MuiLink component={ComposedRouteLink} underline="hover" {...props}>{children}</MuiLink>
);

interface ComposedLinkProps extends LinkProps {
    [x: string]: any;
}

export const ComposedLink = forwardRef(({ ...other }: ComposedLinkProps, ref: any) => (
    <a ref={ref} {...other} />
));

interface ComposedRouteLinkProps extends RouteLinkProps {
    [x: string]: any;
}

export const ComposedRouteLink = forwardRef(
    (
        {
            href,
            as,
            replace,
            scroll,
            shallow,
            passHref = true,
            prefetch,
            locale,
            ...other
        }: ComposedRouteLinkProps,
        ref: any
    ) => (
        <NextLink
            href={href}
            replace={replace}
            scroll={scroll}
            shallow={shallow}
            passHref={passHref}
            prefetch={prefetch}
            locale={locale}
        >
            <a ref={ref} {...other} />
        </NextLink>
    )
);


export interface NavLinkProps {
    href: string;
    icon?: any;
    label?: string;
}

export interface NavRouteLinkProps {
    href: Url;
    icon?: any;
    label?: string;
}
