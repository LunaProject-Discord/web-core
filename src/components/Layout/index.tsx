'use client';

import { Box, CssBaseline, GlobalStyles, styled, Typography, TypographyProps } from '@mui/material';
import React, { Fragment, ReactNode } from 'react';
import { NAVIGATION_DRAWER_WIDTH } from '../Navigation';

export const Body = styled('body')(({ theme }) => ({
    minHeight: '100dvh',
    margin: 0,
    padding: 0
}));

export const RootStyles = () => (
    <Fragment>
        <CssBaseline />
        <GlobalStyles
            styles={(theme) => ({
                '[data-rsbs-backdrop], [data-rsbs-overlay], [data-rsbs-root]:after': {
                    zIndex: theme.zIndex.drawer + 1
                }
            })}
        />
    </Fragment>
);

export const RootLayout = styled(Box)(({ theme }) => ({
    width: '100%',
    maxWidth: theme.breakpoints.values.xl,
    margin: '0 auto',
    paddingTop: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
        paddingTop: theme.spacing(8)
    }
}));

export const PageLayout = styled('main')(({ theme }) => ({
    width: '100%',
    padding: theme.spacing(2)
}));

export const PageWithSidebarLayout = styled(PageLayout)(({ theme }) => ({
    padding: 0,
    [theme.breakpoints.up('md')]: {
        // 表示範囲の幅 - (ナビゲーションドロワーの幅 + サイドバーとの余白)
        maxWidth: `calc(100% - calc(${NAVIGATION_DRAWER_WIDTH}px + ${theme.spacing(2)}))`
    }
}));

export const PageCenteredLayout = styled(PageLayout)(({ theme }) => ({
    // 表示範囲の高さ - ヘッダーの高さ
    height: `calc(100dvh - ${theme.spacing(7)})`,
    display: 'flex',
    placeItems: 'center',
    placeContent: 'center',
    [theme.breakpoints.up('sm')]: {
        // 表示範囲の高さ - ヘッダーの高さ
        height: `calc(100dvh - ${theme.spacing(8)})`
    }
}));

export const PageHeaderRoot = styled('header')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'stretch'
    }
}));

export interface PageHeaderProps {
    primary?: ReactNode;
    secondary?: ReactNode;
    primaryTypographyProps?: TypographyProps;
    secondaryTypographyProps?: TypographyProps;
    children?: ReactNode;
}

export const PageHeader = (
    {
        primary,
        secondary,
        primaryTypographyProps,
        secondaryTypographyProps,
        children
    }: PageHeaderProps
) => (
    <PageHeaderRoot>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: .5 }}>
            {primary && <Typography variant="h4" {...primaryTypographyProps}>{primary}</Typography>}
            {secondary && <Typography {...secondaryTypographyProps}>{secondary}</Typography>}
        </Box>
        {children && <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0, gap: 2 }}>{children}</Box>}
    </PageHeaderRoot>
);
