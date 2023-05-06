'use client';

import { Box, Drawer as MuiDrawer, styled, Toolbar } from '@mui/material';
import React from 'react';

export const DRAWER_WIDTH = 280;

export const DrawerContainer = styled('nav')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        width: DRAWER_WIDTH,
        flexShrink: 0
    }
}));

export const Drawer = styled(MuiDrawer)(({ theme }) => ({
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

export * from './items';
