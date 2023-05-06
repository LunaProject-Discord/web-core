'use client';

import { Link as MuiLink, LinkProps } from '@mui/material';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import React from 'react';

export const Link = ({ href, children, ...props }: LinkProps) => (
    <MuiLink href={href} underline="hover" {...props}>{children}</MuiLink>
);

export const RouteLink = ({ href, children, ...props }: LinkProps & NextLinkProps) => (
    <MuiLink component={NextLink} href={href} underline="hover" {...props}>{children}</MuiLink>
);
