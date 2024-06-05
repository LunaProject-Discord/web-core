'use client';

import { Box, CssBaseline, darken, GlobalStyles, lighten, styled, Typography, TypographyProps } from '@mui/material';
import React, { Fragment, ReactNode } from 'react';
import { NAVIGATION_DRAWER_WIDTH } from '../Navigation';

export const Body = styled('body')({
    minHeight: '100dvh',
    margin: 0,
    padding: 0,
    overflowY: 'scroll'
});

export const ROOT_SCROLLBAR_SIZE = 14;

export const RootStyles = () => (
    <Fragment>
        <CssBaseline />
        <GlobalStyles
            styles={(theme) => {
                const getScrollbarColor = theme.palette.mode === 'light' ? lighten : darken;

                return {
                    '*, ::before, ::after': {
                        boxSizing: 'border-box'
                    },

                    '::selection': {
                        textShadow: 'none',
                        backgroundColor: '#b3d4fc'
                    },

                    '@-moz-document url-prefix()': {
                        '*': {
                            scrollbarWidth: 'thin',
                            scrollbarColor: `${theme.palette.text.secondary} transparent`
                        }
                    },
                    '::-webkit-scrollbar': {
                        width: ROOT_SCROLLBAR_SIZE,
                        height: ROOT_SCROLLBAR_SIZE
                    },
                    '::-webkit-scrollbar-track': {
                        border: 'solid 3px transparent'
                    },
                    '::-webkit-scrollbar-thumb': {
                        backgroundClip: 'padding-box',
                        backgroundColor: theme.palette.text.secondary,
                        border: 'solid 3px transparent',
                        borderRadius: theme.spacing(1),
                        '&:hover, &:active': {
                            backgroundColor: getScrollbarColor(theme.palette.text.secondary, .2)
                        }
                    },

                    '[data-rsbs-backdrop], [data-rsbs-overlay], [data-rsbs-root]:after': {
                        zIndex: theme.zIndex.modal
                    }
                };
            }}
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

export const RootSidebarLayout = styled(Box)(({ theme }) => ({
    // 表示範囲の高さ - ヘッダーの高さ
    minHeight: `calc(100dvh - ${theme.spacing(7)})`,
    padding: theme.spacing(2),
    display: 'flex',
    gap: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        // 表示範囲の高さ - ヘッダーの高さ
        minHeight: `calc(100dvh - ${theme.spacing(8)})`
    }
}));

export const PageSidebarLayout = styled(PageLayout)(({ theme }) => ({
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
